import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { report } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
    req  : Request,
    { params } :{ params : { reportId : string }}
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser || !currentUser.isAdmin) {
            return new NextResponse("Nicht authorisiert", { status : 401 })
        }

        const findReport = await db.query.report.findFirst({
            where : eq(report.id, params.reportId)
        })

        if(!findReport) {
            return new NextResponse("Report nicht gefunden", { status : 404 })
        }

        const [deleteReport] : any = await db.delete(report).where(eq(report.id , params.reportId)).returning();

        return new NextResponse(deleteReport);

    } catch(error : any){
        console.log("Fehler beim löschen des Reports", error);
        return new NextResponse("Fehler beim löschen des Reports", { status : 500 })
    }
}