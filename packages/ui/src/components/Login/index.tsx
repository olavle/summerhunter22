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
  setUserSpecificCharacters,
} from '../../state/reducer';

const loginQuery = `
  query ($userName: String!) {
    loginUser(userName: $userName) {
      userId
      userName
    }
  }
`;

const characterQuery = `
  query ($userName: String!) {
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

const ErrorMessage = styled.span`
  padding-left: 10px;
`;

const LoggedInBar = styled.div`
  display: flex;
  justify-content: center;
`;

export const Login: React.FC = () => {
  const [inputUserName, setUserName] = useState('');
  const [loginError, setLoginError] = useState('');
  const [{ isLoggedIn, loggedInUser, userSpecificCharacters }, dispatch] =
    useStateValue();

  useEffect(() => {
    const userFromStorage = userFromLocalStorage();
    if (userFromStorage !== null) {
      dispatch(setLoggedInUser(userFromStorage));
      dispatch(setLoginTrue());
      const currentUser = userFromStorage as User;
      handleUsersCharacters(currentUser.userName);
    }
  }, []);

  const saveCredentials = (user: User) => {
    window.localStorage.setItem('userId', JSON.stringify(user.userId));
    window.localStorage.setItem('userName', JSON.stringify(user.userName));
  };

  const showError = (message: string) => {
    setLoginError(message);
    setTimeout(() => {
      setLoginError('');
    }, 5000);
  };

  const handleUsersCharacters = async (userName: string) => {
    const userCharactersResult = await postQuery({
      query: characterQuery,
      variables: { userName },
    });
    if (!userCharactersResult.errors) {
      dispatch(
        setUserSpecificCharacters(
          userCharactersResult.data.charactersByUserName,
        ),
      );
    }
  };

  const handleLogin = async () => {
    const userName = inputUserName;
    const loginResult = await postQuery({
      query: loginQuery,
      variables: { userName },
    });
    if (!loginResult.errors) {
      saveCredentials({
        userId: loginResult.data.loginUser.userId,
        userName: loginResult.data.loginUser.userName,
      });
      dispatch(setLoginTrue());
      dispatch(setLoggedInUser(loginResult.data.loginUser));
      await handleUsersCharacters(inputUserName);
      setUserName('');
      return;
    }
    showError('Wrong username!');
  };

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(setLoginFalse());
    dispatch(setLoggedInUser(undefined));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  return (
    <div>
      {isLoggedIn ? (
        <LoggedInBar>
          <button onClick={handleLogout}>Logout</button>
          Hello {loggedInUser?.userName}
        </LoggedInBar>
      ) : (
        <div>
          <label>Login</label>
          <input
            type='text'
            value={inputUserName}
            onChange={handleInputChange}
          />
          <button onClick={handleLogin}>Login</button>
          <ErrorMessage>{loginError}</ErrorMessage>
        </div>
      )}
    </div>
  );
};
