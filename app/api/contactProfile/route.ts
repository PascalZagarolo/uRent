import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { userContactprofiles } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
) {
    try{

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthorized", { status : 401 });
        }

        const { profileType, title, content } = await req.json();

        const [createContactProfile] = await db.insert(userContactprofiles).values({
            userId : currentUser.id,
            profileType,
            title,
            content
        }).returning();

        return NextResponse.json(createContactProfile);
        

    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}