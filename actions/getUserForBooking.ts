import { db } from "@/utils/db";
import { User } from "@prisma/client";

type getUser = {
    username? : string;
}

export const getUserByName = async ({
    username
}: getUser) : Promise<User[]> => {

    try {
        const user = await db.user.findMany({
            where : {
                name : {
                    contains : username,
                    mode : "insensitive"
                }
            }
        })

        return user;
    } catch(error) {
        console.log("Etwas ist beim erhalten der Nutzer schief gelaufen" , error );
        return [];
    }


}