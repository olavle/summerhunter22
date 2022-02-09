import { Application } from 'express';
import { Database } from 'sqlite3';
import { handlerTree } from '../handlers';

export type AppConfig = {
  port: number;
  databasePath: string;
};

export type Character = {
  id: string;
  name: string;
  description: string;
  age: number;
  happiness: number;
  hunger: number;
  energy: number;
  health: number;
  ownerId: string;
};

export type Handler<Args extends unknown, ReturnValue extends unknown> = (
  ctx: Context,
  args: Args,
) => Promise<ReturnValue>;

export type Context = {
  globals: {
    server: Application;
    db: Database;
    config: AppConfig;
  };
  handlers: typeof handlerTree;
};

export type User = {
  userId: string;
  userName: string;
};
