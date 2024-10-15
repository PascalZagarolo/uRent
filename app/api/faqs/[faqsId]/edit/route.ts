import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { faqs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { faqsId : string}}
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

        
        const patchedFaq = await db.update(faqs).set({
            category : category,
            question : question,
            answer : answer,
            isPublic : isPublic
        }).where(eq(faqs.id, params.faqsId)).returning();
        
        return NextResponse.json(patchedFaq);
    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}