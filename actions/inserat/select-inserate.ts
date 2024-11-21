'use server'

import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function selectInserate()  {
    const result = 
    await db
    .select()
    .from(inserat)
    .where(
        and(
            eq(inserat.isPublished, true),
        )
    )
}