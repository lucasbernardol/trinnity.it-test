import { Database } from './app/database/connection.database';
import { app } from './express.config';

async function main(): Promise<void> {
  await Database.connect();

  const server = app.listen(3333, () => console.log(`\nOK`));
}

void main();
