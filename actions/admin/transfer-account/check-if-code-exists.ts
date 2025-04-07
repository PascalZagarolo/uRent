'use server';

import db from "@/db/drizzle";
import { transferAccountToken } from "@/db/schema";
import { eq } from "drizzle-orm";

export const checkIfCodeExists = async (token : string) : Promise<boolean> => {
    try {

        const findCode = await db.query.transferAccountToken.findFirst({
            where : eq(transferAccountToken.id, token)
        })

        if(!findCode) return false;

        return true;
    } catch(e : any) {
        console.log(e);
        return false
    }
}