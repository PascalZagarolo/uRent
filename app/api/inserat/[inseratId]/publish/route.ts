
import db from "@/db/drizzle";
import { address, inserat } from "@/db/schema";

import axios from "axios";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string}}
) {
    try {

    

        const { publish } = await req.json();

        const findInserat = await db.query.inserat.findFirst({
            where : (
                eq(inserat.id, params.inseratId)
            )
        })

        const createDate = findInserat?.firstRelease ? findInserat.firstRelease : new Date();

        const patchedInserat : any = await db.update(inserat).set({
            isPublished : publish,
            firstRelease : createDate,
        }).where(eq(inserat.id, params.inseratId)).returning();

        const addressInserat = await db.query.address.findFirst({
            where : (eq(address.inseratId, params.inseratId))
        })

        const addressObject = await axios.get(`https://geocode.maps.co/search?q=${addressInserat.locationString}&api_key=65db7269a0101559750093uena07e08`);

        console.log("test")
       
        console.log(addressObject.data[0]);

        const pAddress: string[] = addressObject.data[0].display_name.split(",");
        console.log(pAddress[address.length -3])
        console.log(addressObject.data[0].lat)
        console.log(addressObject.data[0].lon) 

        if(publish) {
                const patchedAddress : any = await db.update(address).set({
                    longitude: String(addressObject.data[0].lon),
                    latitude: String(addressObject.data[0].lat),
                    state : address[address.length -3],
            }).where(eq(address.inseratId, params.inseratId)).returning();

            if(patchedAddress) {
                return NextResponse.json(patchedInserat[0]);
            } else {
                const createdAddress : any = await db.insert(address).values({
                    inseratId : params.inseratId,
                    longitude: String(addressObject.data[0].lon),
                    latitude: String(addressObject.data[0].lat),
                    state : address[address.length -3],
                }).returning();

                return NextResponse.json(createdAddress[0])
            }
        }

        return NextResponse.json(patchedInserat[0]);
    } catch (error) {

        console.log("Fehler in /api/inserat/[inseratId]/publish/route.ts:" + error);
        return new NextResponse("Interner Server Error" , { status : 500 })

    }
}