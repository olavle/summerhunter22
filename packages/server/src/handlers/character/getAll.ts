import { Character, Handler } from '../../types/global';

export const getAll: Handler<unknown, Character[] | Error> = (ctx, _input) =>
  new Promise((resolve, reject) => {
    return ctx.globals.db.all('SELECT * FROM character', [], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
