'use server';

import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import NodeCache from "node-cache";

// Initialize cache with default options
const cache = new NodeCache({ stdTTL: 60 * 5, checkperiod: 60 * 2 }); // 5-minute TTL, check every 2 minutes

export async function checkIsAvailable(username: string) {
    // Try to retrieve the cached result
    const cachedResult = cache.get(username);

    // If we have a cached result, return it
    if (cachedResult !== undefined) {
        return cachedResult;
    }

    // Otherwise, perform the database check
    const findUser = await db.query.userTable.findFirst({
        where: eq(userTable?.name, username)
    });

    const isAvailable = !findUser;

    // Cache the result
    cache.set(username, isAvailable);

    return isAvailable;
}
