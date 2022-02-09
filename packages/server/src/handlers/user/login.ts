import { User, Handler } from '../../types/global';

export const login: Handler<string, User | Error> = (ctx, userName) =>
  new Promise((resolve, reject) => {
    console.log('This is login, userName:', userName);
    ctx.globals.db.all(
      `
      SELECT * FROM user WHERE userName=?
    `,
      [userName],
      (err, result) => {
        if (err) {
          reject(err);
        }
        if (!result[0]) {
          reject(new Error('No such user'));
        }
        resolve(result[0]);
      },
    );
  });
