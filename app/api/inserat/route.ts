
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { NextResponse } from "next/server"
import { title } from "process";

export async function POST(
    req : Request,
    
) {
    try {

        const values = await req.json();

        console.log(values)

        const data : any = await db.insert(inserat)
                                .values({
                                    category : values.category,
                                    annual : true,
                                    isDaily : true,
                                    title : values.title,
                                    userId : values.userId
                                }).returning();

        return NextResponse.json(data[0])



    } catch (error) {
        console.log(error)
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}