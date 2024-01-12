import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request, 
    { params } : { params : { profileId : string }}
) {
    try {

        const inseratId = await req.json();

        const alreadyExisting = await db.favourite.findFirst({
            where : {
                userId : params.profileId,
                inseratId : inseratId.inseratId,
            }
        })

        if(alreadyExisting) {

            const deletedFavourite = await db.favourite.delete({
                where : {
                    id : alreadyExisting.id
                }
            })

            return NextResponse.json(deletedFavourite);
            
        } else if(!alreadyExisting) {

            const newFavourite = await db.favourite.create({
                data : {
                    userId : params.profileId,
                    inseratId : inseratId.inseratId,
                }
            })
            return NextResponse.json(newFavourite);
        }
        
        
        
       

        

       

        

        
    } catch(error) {
        console.log("Fehler in favourites..", error);
        return new NextResponse(error, { status : 500 })
    }
}