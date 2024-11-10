import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { blog } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { blogId : string}}
) {
    try {
      
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthorized", { status : 401 });
        }

        if(!currentUser.isAdmin) {
            return new NextResponse("Unauthorized", { status : 401 });
        }

        

        const { imageUrl, title, category ,  tags, content, isPublic  } = await req.json();

        if(isPublic && (!imageUrl || !title || !category || !tags || !content || !isPublic)) {

            return new NextResponse("Bad Request", { status : 400 });
        }

        const [createdBlog] = await db.update(blog).set({
            imageUrl,
            title,
            category,
            tags,
            content,
            isPublic,
        }).where(eq(blog.id, params?.blogId))
        .returning()

        return NextResponse.json(createdBlog, { status : 201 });

    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}