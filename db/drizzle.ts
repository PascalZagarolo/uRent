import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from "./schema"

const connnectionString = process.env.DATABASE_URL;

const client = postgres(connnectionString);
const db = drizzle(client, { schema });


export default db;