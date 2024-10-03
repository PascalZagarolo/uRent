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

        const deleteOld = await db.delete(images).where(eq(images.inseratId, params.inseratId));

        //insert new images

        const { updatedImages } = await req.json();

        for (const pImage of updatedImages) {
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