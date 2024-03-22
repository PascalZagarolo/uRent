import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { ilike } from "drizzle-orm";


type getUser = {
    username? : string;
}

export const getUserByName = async ({
    username
}: getUser) : Promise<typeof users.$inferSelect[]> => {

    try {
        const user = await db.query.users.findMany({
            where : (
                ilike(users.username, `%${username}%`)
            )
        })

        return user;
    } catch(error) {
        console.log("Etwas ist beim erhalten der Nutzer schief gelaufen" , error );
        return [];
    }


}