import { db } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request, 
    { params } : { params : { profileId : string }}
) {
    try {

        const { inseratId } = await req.json();

        const favourite = await db.favourites.findFirst({
            where : {
                userId : params.profileId,
                inseratId : inseratId
            }
        })

        const isFaved = favourite ? true : false;
        
        let patchedFavourites;

        if(isFaved) {
            patchedFavourites = await db.favourites.delete({
                where : {
                    userId : params.profileId,
                    inseratId : inseratId
                }
            })
        } else if(!isFaved) {
            patchedFavourites = await db.favourites.update({
                where : {
                    userId : params.profileId
                }, data :{
                    inseratId : inseratId
                }
            })
        }

        

        return NextResponse.json(patchedFavourites);
    } catch(error) {
        console.log("Fehler in favourites..", error);
        return new NextResponse("Interner Server Error", { status : 500 })
    }
}