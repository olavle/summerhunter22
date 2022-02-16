import { Handler, Character } from '../../types/global';

export const getByUserName: Handler<string, Character[] | Error> = (
  ctx,
  username,
) =>
  new Promise((resolve, reject) => {
    console.log('getByUserName, username:', username);
    if (!username) {
      console.log('No username');
      reject(new Error('No username'));
    }
    return ctx.globals.db.all(
      'SELECT * FROM character AS a INNER JOIN user as b ON a.ownerId = b.userId WHERE b.userName=?',
      [username],
      (err, result) => {
        if (err) {
          reject(err);
        }
        console.log('Resolved with result:', result);
        resolve(result);
      },
    );
  });
