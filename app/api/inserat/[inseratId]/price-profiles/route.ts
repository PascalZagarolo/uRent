import getCurrentUser from "@/actions/getCurrentUser"
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server"
import { create } from 'zustand';
import { priceprofile } from '../../../../../db/schema';

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string } }
) {
    try {

        const findInserat = await db.query.inserat.findFirst({
            where : eq(inserat.id, params.inseratId)
        })

        if(!findInserat) {
            return new NextResponse("Inserat nicht gefunden", { status: 404 })
        }

        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.id !== findInserat.userId) {
            return new NextResponse("Nicht autorisiert", { status: 403 })
        }

        const values = await req.json();

        const createdPriceProfile = await db.insert(priceprofile).values({
            title : values.title,
            price : values.price,
            ...values.kilometer && {
                freeMiles : values.kilometer
            },
            ...values.extraCost && {
                extraCost : values.extraCost
            },
            ...values.description && {
                description : values.description
            },
            inseratId : findInserat.id
        }).returning();

        return NextResponse.json(createdPriceProfile)



    } catch (error) {
        console.log("Fehler beim erstellen eines neues Preisprofils", error)
        return new NextResponse("Fehler beim erstellen eines neues Preisprofils", { status: 500 })
    }
}