import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const findInserat = await db.query.inserat.findFirst({
            where : eq(inserat.id, params.inseratId)
        })

        if(!findInserat) {
            return new NextResponse("Inserat nicht gefunden", { status: 404 });
        }

        const currentUser = await getCurrentUser();

        if(!currentUser || currentUser.id !== findInserat.userId) {
            return new NextResponse("Nicht eingeloggt", { status: 401 });
        }

        const values = await req.json();

        const patchedInserat = await db.update(inserat).set({
            color : values.color
        }).where(eq(inserat.id, params.inseratId))

        return NextResponse.json(patchedInserat, { status: 200 });

    } catch(error : any) {
        console.log("Fehler beim ändern der Farbe", error);
        return new NextResponse("Fehler beim ändern der Farbe", { status: 500 });
    }
}