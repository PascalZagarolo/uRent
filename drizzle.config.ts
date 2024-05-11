import { defineConfig } from "drizzle-kit";


export default defineConfig({
    dialect: "postgresql", 
    
    dbCredentials: {
        url: process.env.DATABASE_URL
    },
    migrations: {
        table: "./drizzle",
        schema: './db/schema.ts',
        
    }
})
