import { useEffect, useState } from 'react';
import { gql, useQuery } from 'urql';
import { useStateValue } from '../state/state';
import { ICharacterInfo } from '../types/global';

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

const useCharacters = () => {
  const [characters, setCharacters] = useState<ICharacterInfo[]>([]);
  const [{ isLoggedIn, loggedInUser }, dispatch] = useStateValue();

  const loggedInUserName = loggedInUser?.userName;
  const [result] = useQuery<{ characters: ICharacterInfo[] }>({
    query,
    variables: { userName: loggedInUserName },
    pause: isLoggedIn,
  });

  useEffect(() => {
    console.log('Hello from useCharacter!', result);
  }, [result]);

  if (!result.data) {
    return;
  }

  const queryResult: ICharacterInfo[] = result.data?.characters;
  setCharacters(queryResult);

  return {
    characters,
  };
};

export default useCharacters;
