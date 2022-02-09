import React, { useEffect, useState } from 'react';
import { gql, useQuery } from 'urql';
import { ICharacterInfo, User } from '../../types/global';
import { postQuery } from '../../helpers/fetchHelper';
import { userFromLocalStorage } from '../../helpers/common';
import styled from 'styled-components';
import { useStateValue } from '../../state/state';
import {
  setLoggedInUser,
  setLoginFalse,
  setLoginTrue,
} from '../../state/reducer';

const registerMutation = `
  mutation ($userName: String!) {
    createNewUser(userName: $userName) {
      userId
      userName
    }
  }
`;

const ErrorMessage = styled.span`
  padding-left: 10px;
`;

export const Register: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [{ isLoggedIn }, dispatch] = useStateValue();

  const saveCredentials = (user: User) => {
    window.localStorage.setItem('userId', JSON.stringify(user.userId));
    window.localStorage.setItem('userName', JSON.stringify(user.userName));
  };

  const showError = (message: string) => {
    setRegisterError(message);
    setTimeout(() => {
      setRegisterError('');
    }, 5000);
  };

  const handleCreateUser = async () => {
    const registerResult = await postQuery({
      query: registerMutation,
      variables: { userName },
    });
    console.log('This is returned user:', registerResult);
    if (!registerResult.errors) {
      saveCredentials({
        userId: registerResult.data.createNewUser.userId,
        userName: registerResult.data.createNewUser.userName,
      });
      dispatch(setLoginTrue());
      dispatch(setLoggedInUser(registerResult.data.createNewUser));
      setUserName('');
      return;
    }
    showError('Username is in use!');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  return (
    <div>
      {isLoggedIn ? null : (
        <div>
          <label>Create user</label>
          <input type='text' value={userName} onChange={handleInputChange} />
          <button onClick={handleCreateUser}>Create!</button>
          <ErrorMessage>{registerError}</ErrorMessage>
        </div>
      )}
    </div>
  );
};
