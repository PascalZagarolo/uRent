import db from "@/db/drizzle";
import { userTable } from "@/db/schema";

import { ilike } from "drizzle-orm";


type getUser = {
    username? : string;
}

export const getUserByName = async ({
    username
}: getUser) : Promise<typeof userTable.$inferSelect[]> => {

    try {
        const user = await db.query.userTable.findMany({
            where : (
                ilike(userTable.username, `%${username}%`)
            )
        })

        return user;
    } catch(error) {
        console.log("Etwas ist beim erhalten der Nutzer schief gelaufen" , error );
        return [];
    }


}