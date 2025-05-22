import db from "@/db/drizzle";
import { blog, inserat, BrandEnumRender } from "@/db/schema";
import { eq } from "drizzle-orm";
import { MetadataRoute } from "next";
import { cities } from "@/data/cities/getCitites";
import { extraTypes } from "@/data/cities/getExtraTypes";
import { weightClassesLkw } from "@/data/lkw/getlkwAttributes";


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

    const categorySlugs = ["pkw", "lkw", "transporter", "anhaenger"];

    function slugifyCity(str: string) {
        return str
            .toLowerCase()
            .replace(/ä/g, "ae")
            .replace(/ö/g, "oe")
            .replace(/ü/g, "ue")
            .replace(/ß/g, "ss")
            .replace(/ /g, "-");
    }

    const mietenRoutes = [
        { url: `${process.env.NEXT_PUBLIC_BASE_URL}/mieten` }
    ];

    const mietenCityCategoryRoutes = [];
    const mietenCityCategoryExtraTypeRoutes = [];
    const mietenCityPkwBrandRoutes = [];
    const mietenCityPkwBrandExtraTypeRoutes = [];
    const mietenCityPkwExtraTypeRoutes = [];
    const mietenCityLkwWeightClassRoutes = [];

    // Get all PKW brands, excluding 'Sonstige'
    const pkwBrands = Object.values(BrandEnumRender).filter(b => b !== "Sonstige");
    // Get all PKW extra types
    const pkwExtraTypes = extraTypes.filter(e => e.category === "pkw").map(e => e.name);

    for (const city of cities) {
        for (const category of categorySlugs) {
            mietenCityCategoryRoutes.push({
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/mieten/${slugifyCity(city.name)}/${category}`
            });

            // Only for PKW, add extraType routes
            if (category === "pkw") {
                for (const extra of extraTypes) {
                    mietenCityCategoryExtraTypeRoutes.push({
                        url: `${process.env.NEXT_PUBLIC_BASE_URL}/mieten/${slugifyCity(city.name)}/pkw/${extra.name}`
                    });
                }
            }
            // For LKW, add weight class routes
            if (category === "lkw") {
                for (const weight of weightClassesLkw) {
                    mietenCityLkwWeightClassRoutes.push({
                        url: `${process.env.NEXT_PUBLIC_BASE_URL}/mieten/${slugifyCity(city.name)}/lkw/${weight.value}`
                    });
                }
            }
        }
       /*
        for (const brand of pkwBrands) {
            mietenCityPkwBrandRoutes.push({
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/mieten/${slugifyCity(city.name)}/pkw/${brand}`
            });
            for (const extra of pkwExtraTypes) {
                mietenCityPkwBrandExtraTypeRoutes.push({
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/mieten/${slugifyCity(city.name)}/pkw/${brand}-${extra}`
                });
            }
        }
       */
        for (const extra of pkwExtraTypes) {
            mietenCityPkwExtraTypeRoutes.push({
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/mieten/${slugifyCity(city.name)}/pkw/${extra}`
            });
        }
    }

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
        ...mietenRoutes,
        ...mietenCityCategoryRoutes,
        ...mietenCityCategoryExtraTypeRoutes,
        ...mietenCityLkwWeightClassRoutes,
        ...mietenCityPkwBrandRoutes,
        ...mietenCityPkwBrandExtraTypeRoutes,
        ...mietenCityPkwExtraTypeRoutes,
        ...inseratSites,
        ...blogSites
    ]

}