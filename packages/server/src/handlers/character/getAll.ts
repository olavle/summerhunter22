import { Character, Handler } from '../../types/global';

export const getAll: Handler<unknown, Character[] | Error> = (ctx, _input) =>
  new Promise((resolve, reject) => {
    return ctx.globals.db.all(
      `SELECT * FROM character AS a INNER JOIN user as b ON a.ownerId = b.userId`,
      [],
      (err, result) => {
        console.log('The result from getAll characters is:', result);
        if (err) {
          reject(err);
        }
        resolve(result);
      },
    );
  });
