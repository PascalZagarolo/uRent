import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { faqs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { faqsId : string}}
) {
    try {
        
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthorized", { status : 401 });
        }

        if(!currentUser.isAdmin) {
            return new NextResponse("Forbidden", { status : 403 });
        }

        const findBlog = await db.query.faqs.findFirst({
            where : eq(faqs.id, params.faqsId)
        })

        if(!findBlog) {
            return new NextResponse("Not Found", { status : 404 });
        }

        await db.delete(faqs).where(eq(faqs.id, params.faqsId));

        return new NextResponse("OK", { status : 200 });
    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}