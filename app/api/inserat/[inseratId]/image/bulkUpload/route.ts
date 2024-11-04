import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { images, inserat } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const currentUser = await getCurrentUser();
    
        if(!currentUser) {
            return new NextResponse("Unauthorized" , { status : 401 } )
        }

        const thisInserat = await db.query.inserat.findFirst({
            where : eq(inserat.id, params.inseratId)    
        })

        if(!thisInserat) {
            return new NextResponse("Not Found" , { status : 404 } )
        }

        if(thisInserat.userId !== currentUser?.id) {
            return new NextResponse("Unauthorized" , { status : 401 } )
        }

        await db.delete(images).where(eq(images.inseratId, params.inseratId));

        //insert new images

        const { updatedImages } = await req.json();

        for (const pImage of updatedImages) {
            let url;

            if(!isValidUrl(pImage.url)) {
                await handleUpload2(pImage.wholeFile);
            }

            await db.insert(images).values({
                inseratId : params.inseratId,
                url : pImage.url,
                position : pImage.position
            })
        }

        return new NextResponse("OK" , { status : 200 } )

    } catch(e : any) {
        console.log(e);
        return new NextResponse("Interner Server Error" , { status : 500 } )
    }
}


const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};


const handleUpload2 = async (file: File): Promise<string> => {
    try {
        console.log("Uploading image...");
        const url = "https://api.cloudinary.com/v1_1/df1vnhnzp/image/upload";
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "oblbw2xl");

        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            console.log("Network response was not ok", response);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        return data.secure_url;
    } catch (e: any) {
        console.log("Upload error:", e);
        return "";
    }
};
