import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { conversationFolder } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
) {
    try {
        
        const currentUser  = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const {title, color, icon} = await req.json();

        const findExistingFolder = await db.query.conversationFolder.findMany({
            where : eq(
                conversationFolder.userId, currentUser.id
            )
        })

        if(findExistingFolder.length >= 10) {
            return new NextResponse("Ordnerlimit erreicht.", { status: 400 });
        }

        const [newFolder] : any = await db.insert(conversationFolder).values({
            title,
            color,
            icon,
            userId : currentUser.id
        }).returning();

        return NextResponse.json(newFolder);


    } catch (e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}