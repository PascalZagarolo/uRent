import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { blog } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { blogId : string}}
) {
    try {
        
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthorized", { status : 401 });
        }

        if(!currentUser.isAdmin) {
            return new NextResponse("Forbidden", { status : 403 });
        }

        const findBlog = await db.query.blog.findFirst({
            where : eq(blog.id, params.blogId)
        })

        if(!findBlog) {
            return new NextResponse("Not Found", { status : 404 });
        }

        await db.delete(blog).where(eq(blog.id, params.blogId));

        return new NextResponse("OK", { status : 200 });
    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}