
import db from "@/db/drizzle";
import { favourite } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request, 
    { params } : { params : { profileId : string }}
) {
    try {

        const inseratId = await req.json();

        const alreadyExisting = await db.query.favourite.findFirst({
            where : (
                and(
                    eq(favourite.userId, params.profileId),
                    eq(favourite.inseratId, inseratId.inseratId)
                )
            )
        })

        if(alreadyExisting) {

            const [deletedFavourite] = await db.delete(favourite).where(eq(favourite.id, alreadyExisting.id)).returning();

            return NextResponse.json(deletedFavourite);
            
        } else if(!alreadyExisting) {

            const newFavourite = await db.insert(favourite).values({
                userId : params.profileId,
                inseratId : inseratId.inseratId
            })
            return NextResponse.json(newFavourite);
        }
        
        
        
       

        

       

        

        
    } catch(error : any) {
        console.log("Fehler in favourites..", error);
        return new NextResponse(error, { status : 500 })
    }
}