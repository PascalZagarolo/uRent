import { defineConfig } from "drizzle-kit";


export default defineConfig({
    dialect: "postgresql", 
    
    dbCredentials: {
        url: process.env.DATABASE_URL
    },
    migration: {
        table: "./drizzle",
        schema: './db/schema.ts',
        out :  './drizzle'
    }
})
