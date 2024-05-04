import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat, notification, report } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const {actionType, ...values} = await req.json();

        const currentUser = await getCurrentUser();

        if(!currentUser || !currentUser.isAdmin) {
            return new NextResponse("Nicht autorisiert", { status : 401 });
        }

        const findInserat = await db.query.inserat.findFirst({
            where : eq(inserat.id, params.inseratId),
            with : {
                user : true
            }
           
        })

        if(!findInserat) {
            return new NextResponse("Inserat nicht gefunden", { status : 404 });
        }

        if(actionType === "private") {
            const privateInserat = await db.update(inserat).set({
                isPublished : false
            }).where(eq(inserat.id, params.inseratId))
        } else if(actionType === "delete"){
            const deleteInserat = await db.delete(inserat).where(eq(inserat.id, params.inseratId))
        }

        const deleteReport = await db.delete(report).where(eq(report.id, values.reportId))

        const notificationHeader = `Dein Inserat ${findInserat.title} wurde von uRent ${actionType === "private" ? "privatisiert" : "gelöscht"}`

        const [createNotification] = await db.insert(notification).values({
            notificationType : "REPORT_ACTION",
            content : notificationHeader,
            userId : findInserat.userId,
            inseratId : findInserat.id,
        }).returning()
        
        return NextResponse.json({createNotification})

    } catch(error : any) {
        console.log("Fehler beim Report bearbeiten", error);
        return new NextResponse("Fehler beim Report bearbeiten", { status : 500 });
    }
}