import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string}}
) {
    try {

    

        const { publish } = await req.json();

        const patchedInserat = await db.inserat.update({
            where : {
                id : params.inseratId
            }, data : {
                isPublished : publish,
                
            }
        })

        const addressInserat = await db.address.findUnique({
            where : {
                inseratId : params.inseratId
            }
        })

        const addressObject = await fetch(`https://geocode.maps.co/search?q=${addressInserat.locationString}&api_key=65db7269a0101559750093uena07e08`)

        if(publish) {
            const patchedAddress = await db.address.update({
                where : {
                    inseratId : params.inseratId
                }, data : {
                    longitude: String(0),
                    latitude: String(0),
                }
            })
        }

        return NextResponse.json(patchedInserat)

    } catch (error) {

        console.log("Fehler in /api/inserat/[inseratId]/publish/route.ts:");
        return new NextResponse("Interner Server Error" , { status : 500 })

    }
}