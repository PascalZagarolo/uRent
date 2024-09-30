
import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { NextResponse } from "next/server"
import { title } from "process";

export async function POST(
    req : Request,
    
) {
    try {

        const values = await req.json();

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthorized" , { status : 401 })
        }

        const createdInserat = await db.insert(inserat)
                                .values({
                                    category : values.category,
                                    annual : true,
                                    isDaily : true,
                                    title : values.title,
                                    userId : values.userId
                                }).returning();
        
        
                            
        return NextResponse.json(createdInserat[0])



    } catch (error) {
        console.log(error)
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}