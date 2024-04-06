import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { notification } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH() {
    try {

        const currentUser = await getCurrentUser();

        const [updatedNotifications] = await db.update(notification).set({
            seen: true,
        }).where(
            and(
                eq(notification.userId, currentUser.id),
                eq(notification.seen, false)
            )
        ).returning();


        return NextResponse.json(updatedNotifications);

    } catch(error) {
        console.log("Fehler in Notifications Patch" , error);
        return new NextResponse("Fehler in Notifications Patch", { status: 500 });
    }
}