'use server'

import db from "@/db/drizzle";
import { blog } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getPublishedBlogs = async () => {
    try {
        const publishedBlogs = await db.query.blog.findMany({
            where : eq(blog.isPublic, true),
            orderBy : (created_at, { desc }) => [desc(blog.createdAt)],
        })
        
        return publishedBlogs;
    } catch(e : any) {
        console.log(e);
        return [];
    }
}