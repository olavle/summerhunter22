import { buildSchema } from 'graphql';
import { Character, Context, User } from '../types/global';

export interface ICharacter {
  id: string;
  name: string;
  age: number;
  happiness: number;
  hunger: number;
}

export const graphQLSchema = buildSchema(`
  type Character {
    id: ID
    name: String!
    description: String
    age: Int
    happiness: Int
    hunger: Int
    energy: Int
    health: Int
    ownerId: String
  }

  type User {
    userId: ID
    userName: String!
  }

  type Query {
    characters: [Character]
    characterById(id: ID!): Character
    charactersByUserName(userName: String!): [Character]
    loginUser(userName: String!): User
  }

  type Mutation {
    createNewUser(userName: String!): User
    saveCharacter(id: ID, name: String!, description: String!, age: Int!, happiness: Int!, hunger: Int!, energy: Int!, health: Int!, ownerId: String!): Character
  }
`);

// Passing in ctx to all resolvers for dependency injection
// All resolvers have access to all handlers and globals
export const createResolvers = (ctx: Context) => ({
  characters: () => ctx.handlers.character.getAll(ctx, {}),
  characterById: ({ id }: ICharacter) =>
    ctx.handlers.character.getById(ctx, id),
  charactersByUserName: ({ userName }: User) =>
    ctx.handlers.character.getByUserName(ctx, userName),
  saveCharacter: (character: Character) =>
    ctx.handlers.character.saveCharacter(ctx, character),
  createNewUser: ({ userName }: User) =>
    ctx.handlers.user.createNewUser(ctx, userName),
  loginUser: ({ userName }: User) => ctx.handlers.user.login(ctx, userName),
});
