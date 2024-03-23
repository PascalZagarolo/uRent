
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params} : { params : { inseratId : string }}
) {
    try {

        const deletedInserat = await db.delete(inserat).where(eq(inserat.id, params.inseratId)).returning()

        return NextResponse.json(deletedInserat[0])

    } catch(error) {
        console.log(error);
        return new NextResponse("Interner Server Error", { status : 500 })
    }
}