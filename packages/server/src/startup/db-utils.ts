import { Database } from 'sqlite3';

export const createTables = (db: Database) => {
  // const sql = `
  //   CREATE TABLE IF NOT EXISTS character (
  //     id INTEGER PRIMARY KEY,
  //     name TEXT,
  //     description TEXT,
  //     age INTEGER,
  //     happiness INTEGER DEFAULT 10,
  //     hunger INTEGER DEFAULT 0
  //   )
  // `;

  const sql = `
    CREATE TABLE IF NOT EXISTS character (
      id TEXT NOT NULL PRIMARY KEY,
      name TEXT,
      description TEXT,
      age INTEGER DEFAULT 0,
      happiness INTEGER DEFAULT 10,
      hunger INTEGER DEFAULT 0,
      energy INTEGER DEFAULT 10,
      health INTEGER DEFAULT 10,
      ownerId TEXT NOT NULL,
      FOREIGN KEY(ownerId) REFERENCES user(userId)
    );
  `;
  const userSql = `
  CREATE TABLE IF NOT EXISTS user (
    userId TEXT NOT NULL PRIMARY KEY,
    userName TEXT NOT NULL UNIQUE
  );`;
  return new Promise((resolve, reject) => {
    return db
      .run('DROP TABLE IF EXISTS character')
      .run('DROP TABLE IF EXISTS user')
      .run(sql, (result: unknown, err: any) => {
        if (err) {
          reject(err);
        }
        // resolve(result);
      })
      .run(userSql, (result: unknown, err: any) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
  });
};

export const seedDatabase = (db: Database) => {
  const porcu = {
    id: '1',
    name: 'Porcu',
    age: 2,
    description: 'Wild beast',
    owner: '1',
  };

  const procusOwner = {
    id: '1',
    name: 'owner',
  };

  return new Promise((resolve, reject) =>
    db
      .run(
        `INSERT INTO user (userId, userName) VALUES (?, ?)`,
        Object.values(procusOwner),
        (result: unknown, err: any) => {
          if (err) {
            reject(err);
          }
          console.log('Seeded user');
          // resolve(result);
        },
      )
      .run(
        `INSERT INTO character (id, name, age, description, ownerId) VALUES (?, ?, ?, ?, ?)`,
        Object.values(porcu),
        (result: unknown, err: any) => {
          if (err) {
            reject(err);
          }
          console.log('Seeded character');
          resolve(result);
        },
      ),
  );
};
