import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { userId : string}}
) {
    try {

        const values = await req.json();


        const patchedOptions = await db.contactOptions.update({
            where : {
                id : params.userId
            }, data : {
                ...values
            }
        })

        return NextResponse.json(patchedOptions);
        


    } catch (error) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
    }
}