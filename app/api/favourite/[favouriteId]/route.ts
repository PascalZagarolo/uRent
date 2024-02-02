import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { favouriteId : string}}
) {
    try {
        const deletedFavourite = await db.favourite.delete({
            where : {
                id : params.favouriteId
            }
        })

        return NextResponse.json(deletedFavourite);
        
    } catch(error) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
    }
}