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
import { setLoggedInUser, setLoginTrue } from '../../state/reducer';
import { userFromLocalStorage } from '../../helpers/common';
import { GameScreen } from '../../components/GameScreen';

const query = gql`
  query GetCharacters {
    characters {
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
  const [{ userSpecificCharacters, isLoggedIn }, dispatch] = useStateValue();
  const [result] = useQuery<{ characters: ICharacterInfo[] }>({
    query,
  });

  if (result.fetching) {
    return (
      <StyledHome>
        <h1>Loading data...</h1>
      </StyledHome>
    );
  }

  if (!result.data) {
    return (
      <StyledHome>
        <h1>Oops, didn't find any data</h1>
      </StyledHome>
    );
  }

  return (
    <div>
      <Login />
      <Register />
      <GameScreen
        characters={
          !isLoggedIn ? result.data.characters : userSpecificCharacters
        }
      />
    </div>
  );
};
