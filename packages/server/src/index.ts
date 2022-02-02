import config from './config';
import { createResolvers, graphQLSchema } from './graphql';
import { start } from './startup';

const startProject = async () => {
  // Note: expect error due method chaining with function's "this" does not go hand in hand with TS
  //@ts-expect-error
  await start()
    .configure(config)
    .configureHttpServer()
    .startDatabase()
    .then(app => app.configureGraphql(graphQLSchema, createResolvers))
    .then(app => app.startHttpServer());
};

startProject();
