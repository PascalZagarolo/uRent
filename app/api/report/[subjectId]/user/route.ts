import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { report } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { subjectId : string }}
) {
    try {

        const currentUser = await getCurrentUser();

        const { reportedUser, reportType, content } = await req.json();


        console.log(currentUser)
        const createdReport = await db.insert(report).values({
            userId : currentUser?.id,
            reportType : reportType,
            content : content,
            reportedUser : reportedUser
        })

        return new NextResponse("Success", { status : 200 });

    } catch(e : any) {
        console.log(e);
        return new NextResponse("Error", { status : 500 });
    }
}