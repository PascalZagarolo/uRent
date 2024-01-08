import { db } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request, 
    { params } : { params : { profileId : string }}
) {
    try {

        
        
        const newFavourite = await db.favourite.create({
            data : {
                userId : "dfijspdfk",
                inseratId : "dfsfdsfs",

            }
        })
        
       

        

        return NextResponse.json(newFavourite);

        

        
    } catch(error) {
        console.log("Fehler in favourites..", error);
        return new NextResponse("Interner Server Error", { status : 500 })
    }
}