import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { businessFaqs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function DELETE(
    req : Request,
    { params } : { params : { businessfaqId : string } }
) {
    try {

        const findBusinessFaq = await db.query.businessFaqs.findFirst({
            where : (
                eq(businessFaqs.id, params.businessfaqId)
            ), with : {
                business : true
            }
        })

        if(!findBusinessFaq) {
            return new NextResponse("Business FAQ nicht gefunden", { status: 404 });
        }

        const currentUser = await getCurrentUser();
        
        if(!currentUser || currentUser.id !== findBusinessFaq.business.userId) {
            return new NextResponse("Nicht authorisiert", { status: 401 });
        }

        const deletedFaq = await db.delete(businessFaqs).where(
            eq(businessFaqs.id, params.businessfaqId)
        ).returning()

        return NextResponse.json(deletedFaq, { status: 200 });

    } catch(error : any) {
        console.log(error);
        return new NextResponse("Fehler beim löschen des FAQS", { status: 500 })
    }
}