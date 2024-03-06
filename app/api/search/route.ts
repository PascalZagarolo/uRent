import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request
) {
    try {
        console.log("1");
        const values = await req.json();
        console.log("2");
        console.log(values);

        const results = await db.inserat.count({
            where : {
                ...values,
                isPublished : true
            }
        })
        console.log(results)
        return NextResponse.json(results);

    } catch {
        console.log("Etwas ist beim erhalten der Suchergebnisse fehlgelaufen");
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}