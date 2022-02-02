import { buildSchema } from 'graphql';
import { Context } from '../types/global';

export const graphQLSchema = buildSchema(`
  type Character {
    name: String!
  }

  type Query {
    characters: [Character]
  }
`);

// Passing in ctx to all resolvers for dependency injection
// All resolvers have access to all handlers and globals
export const createResolvers = (ctx: Context) => ({
  characters: ctx.handlers.character.getAll(ctx, {}),
});
