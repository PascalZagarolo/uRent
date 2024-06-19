import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { notificationUnauthorized } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { globalnotificationsId : string } }
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser || !currentUser.isAdmin) {
            return new NextResponse("Nicht authentifiziert", { status: 401 });
        }

        const findNotification = await db.query.notificationUnauthorized.findFirst({
            where : eq(notificationUnauthorized.id, params.globalnotificationsId)
        })

        if(!findNotification) {
            return new NextResponse("Benachrichtigung nicht gefunden", { status: 404 });
        }

        await db.delete(notificationUnauthorized).where(eq(notificationUnauthorized.id, params.globalnotificationsId));

        return new NextResponse("Benachrichtigung gelöscht", { status: 200 });
    } catch(error : any) {
        return new NextResponse("Fehler beim Löschen der Benachrichtigung", { status: 500 });
        console.log(error);
    }
}