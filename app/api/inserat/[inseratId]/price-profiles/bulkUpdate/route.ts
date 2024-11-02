import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat, priceprofile } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { inseratId : string}}
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthorized", { status : 401 });
        }

        const findInserat = await db.query.inserat.findFirst({
            where : (
                and(
                    eq(inserat.id, params.inseratId),
                    eq(inserat.userId, currentUser.id)
                )
            )
        })

        if(!findInserat) {
            return new NextResponse("Not Found", { status : 404 });
        }


        const { newPriceProfiles } = await req.json();


        await db.delete(priceprofile).where(
            eq(priceprofile.inseratId, findInserat.id)
        )

        for(const profile of newPriceProfiles) {
            await db.insert(priceprofile).values({
                ...profile,
                inseratId : findInserat.id
            })
        }


        return new NextResponse("OK", { status : 200});
    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}