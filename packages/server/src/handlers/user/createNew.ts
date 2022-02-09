import { User, Handler } from '../../types/global';
import { v4 as uuid } from 'uuid';

export const createNew: Handler<string, User | Error> = (ctx, userName) =>
  new Promise((resolve, reject) => {
    console.log('This is create new user, username:', userName);
    const userId = uuid();
    return ctx.globals.db.run(
      `INSERT INTO user (userId, userName) VALUES (?, ?)`,
      [userId, userName],
      (err: Error) => {
        if (err) {
          reject(err);
        }
        resolve({
          userId,
          userName,
        });
      },
    );
  });
