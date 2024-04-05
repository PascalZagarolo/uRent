
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { NextResponse } from "next/server"

export async function POST(
    req : Request,
    
) {
    try {

        const values = await req.json();

        console.log(values)

        const data = await db.insert(inserat)
                                .values({
                                    category : "PKW",
                                    annual : true,
                                    isDaily : true,
                                    ...values
                                }).returning();

        return NextResponse.json(data[0])



    } catch (error) {
        console.log(error)
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}