import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { ilike } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { searchedTerm : string }}
) {
    try {
        

        const currentUser = await getCurrentUser();

        if(!currentUser || !currentUser.isAdmin) {
            return new NextResponse("No internal rights", { status : 401 })
        }



        const searchedTerm = params.searchedTerm;

        const findUsers = await db.query.userTable.findMany({
            where : (
                ilike(userTable.name, `%${searchedTerm}%`)
            ), with : {
                inserat : true
            }
        });
        console.log(findUsers)
        return NextResponse.json(findUsers);

    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}