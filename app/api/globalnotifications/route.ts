import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { notificationUnauthorized } from "@/db/schema";
import { NextResponse } from "next/server";
import { notificationType } from '../../../drizzle/schema';

export async function POST(
    req : Request,
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser || !currentUser.isAdmin) {
            return new Response("Unauthorized", { status : 401 });
        }

        const values = await req.json();

        //@ts-ignore
        const createdGlobalNotification = await db.insert(notificationUnauthorized).values({
            title : values.title,
            notificationType : values.category,
            content : values.content,
            link : values.link,
            showLoggedInUsers : values.showLoggedInUsers as boolean,
            imageUrl : values.imageUrl,
        })

        return NextResponse.json(createdGlobalNotification)
    } catch(error : any) {
        console.log(error)
        return new NextResponse("Error", { status : 500 });
    }
}