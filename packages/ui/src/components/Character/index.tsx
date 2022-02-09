import React, { FC, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Cutlery, Heart } from '../../assets';
import useAttributes from '../../hooks/useAttributes';
import { ICharacterInfo } from '../../types/global';
import { CharacterActions } from '../CharacterActions';
import { postQuery } from '../../helpers/fetchHelper';

const StyledCharacter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > :first-child {
    margin-bottom: 0.5rem;
  }
`;

const Name = styled.div`
  padding: 0rem 3rem;
  margin-top: -64px;
`;

const Stats = styled.div`
  justify-content: space-around;
  position: absolute;
  margin-top: 160px;
  display: flex;
  flex-direction: row;
  width: 180px;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  width: 64px;
  justify-content: space-around;
`;

const SaveBtn = styled.div`
  position: absolute;
  margin-right: 520px;
  cursor: pointer;
`;

const sleep = keyframes`
  0% {
    -webkit-transform: translateY(0) rotateX(0deg);
            transform: translateY(0) rotateX(0deg);
  }
  50% {
    -webkit-transform: translateY(50px) rotateX(90deg);
            transform: translateY(50px) rotateX(90deg);
  }
  100% {
    -webkit-transform: translateY(0) rotateX(0deg);
            transform: translateY(0) rotateX(0deg);
  }
`;

const play = keyframes`
{
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
`;

const shake = keyframes`
0%  { transform: translate(2px, 1px)   rotate(0deg);  }
  10% { transform: translate(-1px, -2px) rotate(-2deg); }
  20% { transform: translate(-3px, 0px)  rotate(3deg);  }
  30% { transform: translate(0px, 2px)   rotate(0deg);  }
  40% { transform: translate(1px, -1px)  rotate(1deg);  }
  50% { transform: translate(-1px, 2px)  rotate(-1deg); }
  60% { transform: translate(-3px, 1px)  rotate(0deg);  }
  70% { transform: translate(2px, 1px)   rotate(-2deg); }
  80% { transform: translate(-1px, -1px) rotate(4deg);  }
  90% { transform: translate(2px, 2px)   rotate(0deg);  }
  100%{ transform: translate(1px, -2px)  rotate(-1deg); }
`;

const CharacterContainer = styled.div`
  animation-duration: ${props => (props.name === 'sleep' ? '7s' : '0.2s')};
  animation-name: ${props =>
    props.name === 'shake'
      ? shake
      : props.name === 'play'
      ? play
      : props.name === 'sleep'
      ? sleep
      : ''};
`;

const StatGrid = styled.div`
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr 1fr;
  gap: 0px;
  height: 100%;
`;

const First = styled.div`
  grid-row: 2 / 3;
  grid-column: 2 / 4;
`;

const Second = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  margin-top: 100px;
`;

const Third = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  height: 64px;
  display: flex;
  justify-content: flex-end;
`;

const saveQuery = `
    mutation ($id: ID, $name: String!, $description: String!, $age: Int!, $happiness: Int!, $hunger: Int!, $energy: Int!, $health: Int!, $ownerId: String!) {
      saveCharacter (id: $id, name: $name, description: $description, age: $age, happiness: $happiness, hunger: $hunger, energy: $energy, health: $health, ownerId: $ownerId) {
        id
        name
        description
        age
        happiness
        hunger
        energy
        health
        ownerId
      }
    }
`;

export interface ICharacterProps {
  name: string;
  characterImage: React.ReactNode;
  age: number;
  happiness: number;
  hunger: number;
  description: string;
  id?: string;
  ownerId: string;
}

export const Character: FC<ICharacterProps> = ({
  name,
  characterImage,
  ...restProps
}) => {
  const [animation, setAnimation] = useState('');
  const attributes = useAttributes({
    ageAmount: restProps.age,
    energyAmount: 10,
    healthAmount: 10,
    hungerAmount: 10,
    happinessAmount: 10,
  });

  const getMood = () => {
    const a = attributes.happiness;
    if (a > 6) {
      return 'happy';
    } else if (a > 3) {
      return 'bored';
    } else {
      return 'sad';
    }
  };

  const getEnergy = () => {
    const a = attributes.energy;
    if (a > 6) {
      return 'Feeling energetic';
    } else if (a > 3) {
      return 'A bit weary';
    } else {
      return 'So tired';
    }
  };

  const eat = () => {
    setAnimation('shake');
    attributes.eat();
    setTimeout(() => setAnimation(''), 200);
  };

  const play = () => {
    setAnimation('play');
    attributes.play();
    setTimeout(() => setAnimation(''), 200);
  };

  const sleep = () => {
    setAnimation('sleep');
    attributes.sleep();
    setTimeout(() => setAnimation(''), 7000);
  };

  const saveCharacter = async () => {
    const saveResult = await postQuery({
      query: saveQuery,
      variables: {
        id: restProps.id,
        name: name,
        age: attributes.age,
        description: 'restProps.description',
        energy: attributes.energy,
        happiness: attributes.happiness,
        health: attributes.health,
        hunger: attributes.hunger,
        ownerId: restProps.ownerId,
      },
    });
  };

  return (
    <StyledCharacter {...restProps}>
      <Name>
        {name} is {getMood()}
      </Name>
      <CharacterContainer name={animation}>{characterImage}</CharacterContainer>
      <Stats>
        <StatGrid>
          <First>
            <Third>
              <Stat>{getEnergy()}</Stat>
            </Third>
          </First>
          <Second>
            <Stat>
              <Heart />
              {attributes.health}
            </Stat>
          </Second>
          <Third>
            <Stat>
              <Cutlery /> {attributes.hunger}
            </Stat>
          </Third>
        </StatGrid>
      </Stats>
      <CharacterActions eat={eat} sleep={sleep} play={play} />
      <SaveBtn onClick={saveCharacter}>SAVE CHARACTER</SaveBtn>
    </StyledCharacter>
  );
};
