import { db } from "@/utils/db";
import { NextResponse } from "next/server"

export async function POST(
    req : Request,
    
) {
    try {

        const {title, userId } = await req.json();

        const inserat = await db.inserat.create({
            data : {
                title : title,
                userId : userId
            }
        })

        return NextResponse.json(inserat)



    } catch (error) {
        console.log(error)
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}