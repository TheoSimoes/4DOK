import {HockeyApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {HockeyApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new HockeyApplication(options);
  await app.boot();
  await app.migrateSchema();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
