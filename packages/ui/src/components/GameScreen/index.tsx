import React, { useState } from 'react';
import styled from 'styled-components';
import { BabyPorcu, Frame } from '../../assets';
import { useStateValue } from '../../state/state';
import { ICharacterInfo } from '../../types/global';
import { Character } from '../Character';
import { Screen } from '../Screen';

const StyledHome = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5fbff;
`;

interface IProps {
  characters: ICharacterInfo[];
}

export const GameScreen: React.FC<IProps> = ({ characters }) => {
  const [characterName, setCharacterName] = useState('');
  const [characterDesc, setCharacterDesc] = useState('');
  const [{ loggedInUser }] = useStateValue();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterName(event.target.value);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterDesc(event.target.value);
  };

  const handleCharacterCreate = () => {
    characters = [
      {
        age: 0,
        description: characterDesc,
        energy: 10,
        happiness: 10,
        health: 10,
        hunger: 10,
        name: characterName,
      },
    ];
  };

  if (characters.length === 0) {
    return (
      <div>
        <label>Name: </label>
        <input onChange={handleNameChange} />
        <label>Description: </label>
        <input onChange={handleDescChange} />
        <button onClick={handleCharacterCreate}>Save character!</button>
        <StyledHome>
          <Screen>
            <Character
              name={characterName}
              age={0}
              hunger={10}
              description={characterDesc}
              happiness={10}
              ownerId={!loggedInUser?.userId ? '1' : loggedInUser.userId}
              characterImage={<BabyPorcu />}
            />
          </Screen>
          <Frame />
        </StyledHome>
      </div>
    );
  }

  return (
    <StyledHome>
      <Screen>
        {characters.map((character, i) => (
          <Character
            key={i}
            name={character.name}
            age={character.age}
            hunger={character.hunger}
            description={character.description}
            happiness={character.happiness}
            id={character.id}
            characterImage={<BabyPorcu />}
          />
        ))}
      </Screen>
      <Frame />
    </StyledHome>
  );
};
