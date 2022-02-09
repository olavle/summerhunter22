import { Character, Handler } from '../../types/global';
import { v4 as uuid } from 'uuid';

export const saveCharacter: Handler<Character, Character | Error> = (
  ctx,
  character,
) =>
  new Promise((resolve, reject) => {
    console.log('Character to be saved:', character);

    // Check if the character has ID, if not -> assume it is created in the client
    // and save it as a new character
    if (!character.id) {
      const id = uuid();
      character.id = id;
      return ctx.globals.db.run(
        `
        INSERT INTO character(
        name,
        description,
        age,
        happiness,
        hunger,
        energy,
        health,
        ownerId,
        id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        Object.values(character),
        (err: Error) => {
          if (err) {
            reject(err);
          }
          resolve(character);
        },
      );
    }

    return ctx.globals.db.run(
      `
    UPDATE character SET name = '${character.name}',
    description = '${character.description}',
    age = ${character.age},
    happiness = ${character.happiness},
    hunger = ${character.hunger},
    energy = ${character.energy},
    health = ${character.health} WHERE id=${character.id}
    `,
      (err: Error) => {
        if (err) {
          reject(err);
        }
        resolve(character);
      },
    );
  });
