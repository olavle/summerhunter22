import { ICharacterInfo, User } from '../types/global';

export interface State {
  loggedInUser: User | undefined;
  isLoggedIn: boolean;
  userSpecificCharacters: ICharacterInfo[];
}

export enum ActionTypes {
  SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER',
  SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN',
  SET_USER_SPECIFIC_CHARACTERS = 'SET_USER_SPECIFIC_CHARACTERS',
}

export type Action =
  | {
      type: ActionTypes.SET_LOGGED_IN_USER;
      payload: User | undefined;
    }
  | {
      type: ActionTypes.SET_IS_LOGGED_IN;
      payload: boolean;
    }
  | {
      type: ActionTypes.SET_USER_SPECIFIC_CHARACTERS;
      payload: ICharacterInfo[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      };
    case ActionTypes.SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case ActionTypes.SET_USER_SPECIFIC_CHARACTERS:
      return {
        ...state,
        userSpecificCharacters: action.payload,
      };
    default:
      return state;
  }
};

export const setLoggedInUser = (user: User | undefined): Action => {
  return {
    type: ActionTypes.SET_LOGGED_IN_USER,
    payload: user,
  };
};

export const setLoginTrue = (): Action => {
  return {
    type: ActionTypes.SET_IS_LOGGED_IN,
    payload: true,
  };
};

export const setLoginFalse = (): Action => {
  setLoggedInUser(undefined);
  return {
    type: ActionTypes.SET_IS_LOGGED_IN,
    payload: false,
  };
};

export const setUserSpecificCharacters = (
  characters: ICharacterInfo[],
): Action => {
  return {
    type: ActionTypes.SET_USER_SPECIFIC_CHARACTERS,
    payload: characters,
  };
};
