import { Character, Handler } from '../../types/global';

export const getById: Handler<string, Character | Error> = (ctx, id) =>
  new Promise((resolve, reject) => {
    return ctx.globals.db.all(
      'SELECT * FROM character AS a INNER JOIN user as b ON a.ownerId = b.userId WHERE id=?',
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        }
        console.log('Result of getCharacterByid:', result);
        resolve(result[0]);
      },
    );
  });
