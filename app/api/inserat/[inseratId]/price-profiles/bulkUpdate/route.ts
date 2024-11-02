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
            where : eq(inserat.id, params.inseratId),
            with : {
                priceprofiles : true
            }
        })

        if(!findInserat) {
            return new NextResponse("Inserat nicht gefunden", { status : 404 })
        }

        if(findInserat.userId !== currentUser.id) {
            return new NextResponse("Nicht autorisiert", { status : 401 })
        }

        console.log(findInserat?.priceprofiles?.length)

        const data = await req.json();

        let insertedData = [];
        let deletedData = [];
        let editedData = [];

        data.forEach((profile : any) => {
            if(profile?.getsAdded && !profile?.getsDeleted) {
                insertedData.push(profile);
            }

            if(profile?.getsDeleted) {
                deletedData.push(profile);
            }

            if(profile?.getsEdited && !profile?.getsAdded && !profile?.getsDeleted) {
                editedData.push(profile);
            }
        })

        if((findInserat?.priceproiles?.length + (insertedData?.length - deletedData?.length)) > 10) {
            return new NextResponse("Maximale Anzahl an Preisprofilen erreicht", { status : 400 });
        }

        for(const addedProfile of insertedData) {
            await db.insert(priceprofile).values({
                inseratId : findInserat.id,
                title : addedProfile.title,
                description : addedProfile.description,
                price : addedProfile.price,
                freeMiles : addedProfile.freeMiles,
                extraCost : addedProfile.extraCost,
                position : addedProfile?.position
            })
        }

        for(const deletedProfile of deletedData) {
            await db.delete(priceprofile).where(eq(priceprofile.id, deletedProfile.id));
        }

        for (const editedProfile of editedData) {
            await db.update(priceprofile).set({
                title : editedProfile.title,
                description : editedProfile.description,
                price : editedProfile.price,
                freeMiles : editedProfile.freeMiles,
                extraCost : editedProfile.extraCost,
                position : editedProfile?.position
            }).where(eq(priceprofile.id, editedProfile.id));
        }


        return new NextResponse("OK", { status : 200});
    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}