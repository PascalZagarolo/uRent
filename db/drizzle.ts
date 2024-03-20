
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from "./schema"
import { neon } from '@neondatabase/serverless';

const connnectionString = process.env.DATABASE_URL;

const client = neon(connnectionString);
const db = drizzle(client, { schema });


export default db;