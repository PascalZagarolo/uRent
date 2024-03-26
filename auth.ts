import { DrizzleAdapter } from '@auth/drizzle-adapter';

import NextAuth from "next-auth";
import authConfig from "./auth.config";
import db from './db/drizzle';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages : {
        signIn : "/login",
        error : `auth/error`
    },
    events : {
        async linkAccount({ user }) {
            await db.update(users).set({
                confirmedMail: true
            }).where(eq(users.id, user.id))
        }
    },
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,    
})