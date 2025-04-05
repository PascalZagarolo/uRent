import getCurrentUser from "@/actions/getCurrentUser";
import { values } from "lodash";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser || !currentUser.isAdmin) {
            return new NextResponse("Not authenticated", { status : 401 });
        }

        
        const { newAddress } = await req.json();

        //generate onetimepassword
        //send mail with onetimepassword and link..


    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status : 500})
    }
}