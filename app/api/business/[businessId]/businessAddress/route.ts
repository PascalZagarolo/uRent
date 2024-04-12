import { eq } from 'drizzle-orm';
import { business, businessAddress } from '../../../../../db/schema';
import { NextResponse } from 'next/server';
import db from '@/db/drizzle';
export async function POST(
    req : Request,
    { params } : { params : { businessId : string } }

) {
    try {
        const findBusiness = await db.query.business.findFirst({
            where : eq(business.id, params.businessId)
        })

        if(!findBusiness) {
            return new NextResponse("Business nicht gefunden" , { status : 404})
        }

        const values = await req.json();

        const existingBusinessAddress = await db.query.businessAddress.findFirst({
            where : (
                eq(businessAddress.businessId, params.businessId)
            )
        })

        //if first location, set as primary location
        const primary = existingBusinessAddress ? false : true;

        const [createdBusinessAddress] = await db.insert(businessAddress).values({
            businessId : params.businessId,
            isPrimary : primary,
            ...values
        }).returning();

        return NextResponse.json(createdBusinessAddress)
        
    } catch(error) {
        console.log("Fehler beim Erstellen der Adresse", error)
        return new NextResponse("Fehler beim Erstellen der Adresse", { status : 500})
    }
}