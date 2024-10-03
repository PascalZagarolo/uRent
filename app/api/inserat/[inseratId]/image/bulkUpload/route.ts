import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

    } catch(e : any) {
        console.log(e);
        return new NextResponse("Interner Server Error" , { status : 500 } )
    }
}