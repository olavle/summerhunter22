import React from 'react';
import styled from 'styled-components';
import { setLoggedInUser } from '../../state/reducer';
import { useStateValue } from '../../state/state';
import { Login } from '../Login';

const HomeView = styled.div``;

interface IProps {
  characterName: string;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  characterDesc: string;
  handleSave: () => void;
}

const CreateCharacterOrLogin: React.FC<IProps> = ({
  characterName,
  handleNameChange,
  handleDescChange,
  characterDesc,
  handleSave,
}) => {
  return (
    <HomeView>
      <Login />
      <h1>Create Character</h1>
      <label>Character name:</label>
      <input value={characterName} type='text' onChange={handleNameChange} />
      <label>Character description:</label>
      <input value={characterDesc} type='text' onChange={handleDescChange} />
      <button onClick={handleSave}>Save</button>
    </HomeView>
  );
};

export default CreateCharacterOrLogin;
