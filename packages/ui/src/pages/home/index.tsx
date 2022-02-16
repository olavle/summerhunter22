import React, { useEffect, useState } from 'react';
import { gql, useQuery } from 'urql';
import styled from 'styled-components';

import { BabyPorcu, Frame } from '../../assets';
import { Character } from '../../components/Character';
import { Screen } from '../../components/Screen';
import { CharacterActions } from '../../components/CharacterActions';
import useAttributes from '../../hooks/useAttributes';
import { ICharacterInfo } from '../../types/global';
import { Login } from '../../components/Login';
import { Register } from '../../components/Register';
import { useStateValue } from '../../state/state';
import { postQuery } from '../../helpers/fetchHelper';
import {
  setLoggedInUser,
  setLoginTrue,
  setUserSpecificCharacters,
} from '../../state/reducer';
import { userFromLocalStorage } from '../../helpers/common';
import { GameScreen } from '../../components/GameScreen';
import useCharacters from '../../hooks/useCharacters';
import CreateCharacterOrLogin from '../../components/CreateCharacterOrLogin';

// const query = gql`
//   query GetCharacters {
//     characters {
//       id
//       name
//       description
//       age
//       happiness
//       hunger
//       energy
//       health
//       ownerId
//     }
//   }
// `;

const query = gql`
  query GetCharactersByUserName($userName: String!) {
    charactersByUserName(userName: $userName) {
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

const StyledHome = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5fbff;
`;

export const Home: React.FC = () => {
  // TODO: proper types, maybe shared with backend
  const [{ userSpecificCharacters }, dispatch] = useStateValue();
  const [characters, setCharacters] = useState<ICharacterInfo[]>([]);
  const [characterName, setCharacterName] = useState('');
  const [characterDesc, setCharacterDesc] = useState('');
  const [chosenCharacter, setChosenCharacter] = useState<ICharacterInfo>();
  // const [result] = useQuery<{ characters: ICharacterInfo[] }>({
  //   query,
  //   variables: { userName: 'owner' },
  //   pause: isLoggedIn,
  // });
  // const [result] = useQuery<{ charactersByUserName: ICharacterInfo[] }>({
  //   query,
  //   variables: { userName: 'owner' },
  //   pause: !isLoggedIn || characters.length === 0,
  // });

  // if (result.fetching) {
  //   return (
  //     <StyledHome>
  //       <h1>Loading data...</h1>
  //     </StyledHome>
  //   );
  // }
  const handleCharacterNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCharacterName(event.target.value);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterDesc(event.target.value);
  };

  const handleSave = () => {
    console.log('hello from save');
    setCharacters([
      {
        age: 0,
        description: characterDesc,
        energy: 10,
        happiness: 10,
        health: 10,
        hunger: 10,
        name: characterName,
      },
    ]);
  };

  if (characters.length === 0 && !userSpecificCharacters) {
    return (
      <CreateCharacterOrLogin
        characterName={characterName}
        handleNameChange={handleCharacterNameChange}
        handleDescChange={handleDescChange}
        characterDesc={characterDesc}
        handleSave={handleSave}
      />
    );
  }

  return (
    <div>
      <Login />
      <Register />
      {!userSpecificCharacters
        ? characters.map((character, i) => (
            <div key={i} onClick={() => setChosenCharacter(character)}>
              {character.name}
            </div>
          ))
        : userSpecificCharacters.map((character, i) => (
            <div key={i} onClick={() => setChosenCharacter(character)}>
              {character.name}
            </div>
          ))}
      <StyledHome>
        <Screen>
          {!chosenCharacter ? null : (
            <Character
              name={chosenCharacter.name}
              age={chosenCharacter.age}
              hunger={chosenCharacter.hunger}
              description={chosenCharacter.description}
              happiness={chosenCharacter.happiness}
              id={chosenCharacter.id}
              characterImage={<BabyPorcu />}
            />
          )}
        </Screen>
        <Frame />
      </StyledHome>
    </div>
  );
};
