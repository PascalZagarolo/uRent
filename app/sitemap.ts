import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { eq } from "drizzle-orm";
import { MetadataRoute } from "next";


export default async function sitemap() : Promise<MetadataRoute.Sitemap> {

    const foundInserate : any = await db.query.inserat.findMany({
        where : eq(inserat.isPublished, true)
    })

    console.log(foundInserate)

    //@ts-ignore
    const inseratSites = foundInserate.map((pInserat) => ({
        
        url : `${process.env.NEXT_PUBLIC_BASE_URL}/inserat/${pInserat.id}`,
        lastModified : new Date(pInserat.updatedAt)
    }))

    return [
        {
            url : `${process.env.NEXT_PUBLIC_BASE_URL}`,
        },
        ...inseratSites
    ]

}