import { NextResponse } from "next/server";

export async function POST(
    req : Request
) {
    try {

    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}