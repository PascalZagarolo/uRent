import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { business, businessFaqs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
    req : Request, 
    { params } : { params : { businessId : string } }
) {
    try {

        

        const findBusiness = await db.query.business.findFirst({
            where : (
                eq(business.id, params.businessId)
            )
        })

        if(!findBusiness) {
            return new NextResponse("Business nicht gefunden", { status: 404 });
        }

        const currentUser = await getCurrentUser();

        if(!currentUser || currentUser.id !== findBusiness.userId) {
            return new NextResponse("Nicht authorisiert", { status: 401 });
        }

        const values = await req.json();

        const existingFaq = await db.query.businessFaqs.findMany({
            where : (
                eq(businessFaqs.businessId, params.businessId)
            )
        })
        
        const usedIndex = existingFaq !== null ? existingFaq.length : 0;

        const [createdFaq] = await db.insert(businessFaqs).values({
            businessId : params.businessId,
            position : usedIndex,
            ...values,
        }).returning()

        return NextResponse.json(createdFaq, { status: 200 });
    } catch(error : any) {
        console.log(error);
        return new NextResponse("Fehler beim erstellen des FAQS", { status: 500 })
    }
}