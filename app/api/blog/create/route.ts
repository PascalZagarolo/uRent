import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { blog } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(
    req : Request
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthorized", { status : 401 });
        }

        if(!currentUser.isAdmin) {
            return new NextResponse("Unauthorized", { status : 401 });
        }

        const { imageUrl, title, category ,  tags, content, isPublic,  } = await req.json();

        if(!imageUrl || !title || !category || !tags || !content || !isPublic) {
            return new NextResponse("Bad Request", { status : 400 });
        }

        const [createdBlog] = await db.insert(blog).values({
            imageUrl,
            title,
            category,
            tags,
            content,
            isPublic,
        }).returning()

        return NextResponse.json(createdBlog, { status : 201 });

    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}