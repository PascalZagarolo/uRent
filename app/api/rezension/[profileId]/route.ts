import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { profileId : string }}
) {
    try {

        const { rating, content } = await req.json();

        const currentUser = await getCurrentUser();

        const postedReview = await db.rezension.create({
            data : {
                senderId : currentUser.id,
                receiverId : params.profileId,
                rating,
                content
            }
        })

        return NextResponse.json(postedReview);

    } catch (error) {
        console.log(error);
        return new NextResponse("error" , { status : 500 })
    }
}