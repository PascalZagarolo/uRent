import getCurrentUser from "@/actions/getCurrentUser";
import { rezension } from "@/db/schema";

import { NextResponse } from "next/server";
import { values } from 'lodash';
import db from "@/db/drizzle";

export async function POST(
    req : Request,
    { params } : { params : { profileId : string }}
) {
    try {

        const { rating, content } = await req.json();

        const currentUser = await getCurrentUser();

        const postedReview = await db.insert(rezension).values({
            senderId : currentUser.id,
            receiverId : params.profileId,
            rating : rating,
            content : content
        }).returning();

        return NextResponse.json(postedReview[0]);

    } catch (error) {
        console.log(error);
        return new NextResponse("error" , { status : 500 })
    }
}