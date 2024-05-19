import db from "@/db/drizzle";
import { NextResponse } from "next/server";
import { priceprofile } from '../../../../../db/schema';
import { eq } from "drizzle-orm";
import getCurrentUser from "@/actions/getCurrentUser";

export async function DELETE(
    req : Request,
    { params } : { params :  { priceprofileId : string } }
) {
    try {
        
        const findPriceProfile : any = await db.query.priceprofile.findFirst({
            where : (
                eq(priceprofile.id, params.priceprofileId)
            ),
            with : {
                inserat : {
                    with : {
                        user : true
                    }
                }
            }
        })

        if(!findPriceProfile) {
            return new NextResponse("Preisprofil nicht gefunden", { status: 404 });
        }

        const currentUser = await getCurrentUser();

        if(!currentUser || currentUser.id !== findPriceProfile?.inserat.userId) {
            return new NextResponse("Nicht autorisiert", { status: 401 });
        }

        const deletedPriceProfile = await db.delete(priceprofile).where(eq(priceprofile.id, params.priceprofileId));

        return NextResponse.json(deletedPriceProfile)


    } catch(error : any) {
        console.log(error);
        return new NextResponse("Fehler beim Löschen des Preisprofils", { status: 500 });
    }
}