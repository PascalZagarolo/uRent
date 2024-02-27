import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { inseratId : string}}
) {
    try {
        
        const currentUser = await getCurrentUser();

        const values = await req.json();


        const bookingRequest = await db.bookingRequest.create({
            data : {
                userId : currentUser.id,
                inseratId : params.inseratId,
                ...values,
                
            }
        })

        return NextResponse.json(bookingRequest);

    } catch(error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}