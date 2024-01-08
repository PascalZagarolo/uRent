import { db } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request, 
    { params } : { params : { profileId : string }}
) {
    try {

        const inseratId  = await req.json();

        
        if(!inseratId) {
            return new NextResponse("Keine InseratId angegeben", { status : 400 })
        }
        

        const patchedFavourites = await db.favourites.create({
            data : {
                userId : params.profileId,
                inseratId : inseratId
            }
        })

        

        return NextResponse.json(patchedFavourites);

        

        
    } catch(error) {
        console.log("Fehler in favourites..", error);
        return new NextResponse("Interner Server Error", { status : 500 })
    }
}