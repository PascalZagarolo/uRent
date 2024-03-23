
import db from "@/db/drizzle";
import { favourite } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { favouriteId : string}}
) {
    try {
        const [deletedFavourite] = await db.delete(favourite).where(eq(favourite.id, params.favouriteId)).returning()

        return NextResponse.json(deletedFavourite);
        
    } catch(error) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
    }
}