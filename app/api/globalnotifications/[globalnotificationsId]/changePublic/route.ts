import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { notificationUnauthorized } from "@/db/schema";
import { eq } from "drizzle-orm";

import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { globalnotificationsId : string }}
) {
    try {
        
        const currentUser = await getCurrentUser();
        
        if(!currentUser || !currentUser.isAdmin) {
            
            return new NextResponse("Nicht autorisiert", { status : 401 })
        }

        

        const {isPublic} = await req.json();
        
        const updatedNotification = await db.update(notificationUnauthorized).set({
            isPublic
        }).where(eq(notificationUnauthorized.id, params.globalnotificationsId)).returning()

        return NextResponse.json(updatedNotification);

    } catch(error : any) {
        console.log(error);
        return new NextResponse("Error", { status : 500 });
    }
}