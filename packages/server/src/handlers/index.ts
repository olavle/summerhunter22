import { Context } from '../types/global';

import { getAll } from './character/getAll';
import { saveCharacter } from './character/saveCharacter';
import { getById } from './character/getById';
import { getByUserName } from './character/getByUserName';
import { createNew as createNewUser } from './user/createNew';
import { login } from './user/login';

// Add functions here to extend Context.handlers. These functions will be available in call stack where Context is available.
// ctx.handlers.character.getAll is just an example. Feel free to refactor and adjust as seen fitting.
// It is also adviseable to think is the database abstraction currently serving our needs.
export const handlerTree = {
  character: {
    getAll,
    saveCharacter,
    getById,
    getByUserName,
  },
  user: {
    createNewUser,
    login,
  },
};

export const withHandlerTree = (ctx: Omit<Context, 'handlers'>): Context => ({
  ...ctx,
  handlers: handlerTree,
});
