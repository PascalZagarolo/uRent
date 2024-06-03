import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { businessFaqs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
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
        
        //@ts-ignore
        if(!currentUser || currentUser.id !== findBusinessFaq.business?.userId) {
            return new NextResponse("Nicht authorisiert", { status: 401 });
        }

        const values = await req.json();

        const updatedFaq = await db.update(businessFaqs).set({
            ...values,
        }).where(
            eq(businessFaqs.id, params.businessfaqId)
        ).returning()

        return NextResponse.json(updatedFaq);


    } catch(error : any) {
        console.log(error);
        return new NextResponse("Fehler beim bearbeiten des FAQS", { status: 500 })
    }
}