import getCurrentUser from "@/actions/getCurrentUser"
import { notificationUnauthorized } from '../../../../../db/schema';
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { globalnotificationsId : string }}
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser || !currentUser.isAdmin) {
            return new Response("Nicht authentifiziert", { status: 401 });
        }

        const findNotification = await db.query.notificationUnauthorized.findFirst({
            where : eq(notificationUnauthorized.id, params.globalnotificationsId)
        })
        

        const values = await req.json();

        const patchedNotification = await db.update(notificationUnauthorized).set({
            title : values.title,
            content : values.content,
            notificationType : values.notificationType,
            isPublic : values.isPublic,
            showAuthorizedUsers : values.showAuthorizedUsers,
            link : values.link,
            imageUrl : values.imageUrl,
        }).where(eq(notificationUnauthorized.id, params.globalnotificationsId))

        return NextResponse.json(patchedNotification)

    } catch(error : any) {
        console.log(error)
    }
}