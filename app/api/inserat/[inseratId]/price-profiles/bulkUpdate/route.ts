import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat, priceprofile } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { inseratId : string}}
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Nicht autorisiert", { status : 401 })
        }

        const findInserat = await db.query.inserat.findFirst({
            where : eq(inserat.id, params.inseratId)
        })

        if(!findInserat) {
            return new NextResponse("Inserat nicht gefunden", { status : 404 })
        }

        if(!findInserat.userId !== currentUser.id) {
            return new NextResponse("Nicht autorisiert", { status : 401 })
        }

        const data = await req.json();

        let insertedData = [];
        let deletedData = [];
        let editedData = [];

        data.forEach((profile : any) => {
            if(profile.getsAdded) {
                insertedData.push(profile);
            }

            if(profile.getsDeleted) {
                deletedData.push(profile);
            }

            if(profile.getsEdited) {
                editedData.push(profile);
            }
        })

        for(const addedProfile of insertedData) {

        }

        for(const deletedProfile of deletedData) {
            await db.delete(priceprofile).where(eq(priceprofile.id, deletedProfile.id));
        }

        for (const editedProfile of editedData) {

        }


        return new NextResponse("OK", { status : 200});
    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}