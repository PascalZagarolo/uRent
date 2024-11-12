import db from "@/db/drizzle";
import { blog, inserat } from "@/db/schema";
import { eq } from "drizzle-orm";
import { MetadataRoute } from "next";


export default async function sitemap() : Promise<MetadataRoute.Sitemap> {

    const foundInserate : any = await db.query.inserat.findMany({
        where : eq(inserat.isPublished, true)
    })

    const foundBlogs : typeof blog.$inferSelect[] = await db.query.blog.findMany({
        where : eq(blog.isPublic, true)
    })

    console.log(foundInserate)

    //@ts-ignore
    const inseratSites = foundInserate.map((pInserat) => ({
        
        url : `${process.env.NEXT_PUBLIC_BASE_URL}/inserat/${pInserat.id}`,
        lastModified : new Date(pInserat.updatedAt)
    }))

    const blogSites = foundBlogs.map((pBlog) => ({
            
            url : `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${pBlog.id}`,
            lastModified : new Date(pBlog.createdAt)
    }))

    

    return [
        {
            url : `${process.env.NEXT_PUBLIC_BASE_URL}`,
        },
        {
            url : `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        },
        {
            url : `${process.env.NEXT_PUBLIC_BASE_URL}/search`,
        },
        {
            url : `${process.env.NEXT_PUBLIC_BASE_URL}/imprint`,
        },
        {
            url : `${process.env.NEXT_PUBLIC_BASE_URL}/agbs`,
        },
        {
            url : `${process.env.NEXT_PUBLIC_BASE_URL}/data-privacy`,
        },
        {
            url : `${process.env.NEXT_PUBLIC_BASE_URL}/faqs`,
        },
        {
            url : `${process.env.NEXT_PUBLIC_BASE_URL}/faqs/bedienung`,
        },
        {
            url : `${process.env.NEXT_PUBLIC_BASE_URL}/faqs/mieter`,
        },
        {
            url : `${process.env.NEXT_PUBLIC_BASE_URL}/faqs/mieter`,
        },
        {
            url : `${process.env.NEXT_PUBLIC_BASE_URL}/faqs/vermieter`,
        },
        ...inseratSites,
        ...blogSites
    ]

}