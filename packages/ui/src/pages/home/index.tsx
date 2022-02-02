import React from 'react';
import { gql, useQuery } from 'urql';
import styled from 'styled-components';

import { BabyPorcu, Frame } from '../../assets';
import { Character } from '../../components/Character';
import { Screen } from '../../components/Screen';

const query = gql`
  query GetCharacters {
    characters {
      name
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
  const [result] = useQuery<{ characters: { name: string }[] }>({ query });

  if (result.fetching) {
    return <>TODO: handle loading</>;
  }

  if (!result.data) {
    return <>TODO: handle no data</>;
  }

  return (
    <StyledHome>
      <Screen>
        {result.data.characters.map((character, i) => (
          <Character
            key={i}
            name={character.name}
            characterImage={<BabyPorcu />}
          />
        ))}
      </Screen>
      <Frame />
    </StyledHome>
  );
};
