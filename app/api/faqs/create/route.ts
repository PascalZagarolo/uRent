import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { faqs } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(
    req : Request
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!currentUser?.isAdmin) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const { category, question, answer, isPublic } = await req.json();

        if(isPublic && (!category || !question || !answer)) {
            return new NextResponse("Bad Request", { status: 400 });
        }

        const [createdFaq] : any = await db.insert(faqs).values({
            category,
            question,
            answer,
            isPublic
        }).returning()

        return new NextResponse(createdFaq, { status: 201 });

    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}