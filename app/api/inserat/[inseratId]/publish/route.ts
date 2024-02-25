import { db } from "@/utils/db";
import axios from "axios";
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

        const addressObject = await axios.get(`https://geocode.maps.co/search?q=${addressInserat.locationString}&api_key=${process.env.GEOCODING_API}`);

        console.log("test")
       
        
        console.log(addressObject.data[0].lat)
        console.log(addressObject.data[0].lon) 

        if(publish) {
            const patchedAddress = await db.address.update({
                where : {
                    inseratId : params.inseratId
                }, data : {
                    longitude: String(addressObject.data[0].lon),
                    latitude: String(addressObject.data[0].lat),
                }
            })
        }

        return NextResponse.json(patchedInserat)

    } catch (error) {

        console.log("Fehler in /api/inserat/[inseratId]/publish/route.ts:");
        return new NextResponse("Interner Server Error" , { status : 500 })

    }
}