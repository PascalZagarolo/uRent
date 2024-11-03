
import db from "@/db/drizzle";
import { address, inserat, vehicle } from "@/db/schema";

import axios from "axios";
import { eq, is } from "drizzle-orm";

import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string}}
) {
    try {

        const isValidUrl = (url: string): boolean => {
            try {
                new URL(url);
                return true;
            } catch (_) {
                return false;
            }
        };

        const { publish } = await req.json();

        const findInserat = await db.query.inserat.findFirst({
            where : (
                eq(inserat.id, params.inseratId)
            ), with : {
                vehicles : true,
                images : true,
            }
        })

        const createDate = findInserat?.firstRelease ? findInserat.firstRelease : new Date();

        if(findInserat.multi) {
            const existingVehicleLength = findInserat.vehicles.length;

            if ((findInserat.amount - existingVehicleLength) > 25) {
                return new NextResponse("Zu viele Fahrzeuge auf einmal hinzugefügt", { status : 400 })
            }

            if(existingVehicleLength < findInserat.amount) {
                for (let i = 0; i < findInserat.amount - existingVehicleLength; i++) {

                    const usedIndex = i < 10 ? "0" + (i + 1) : (i + 1);
                    const usedTitle = "Fahrzeug" + " " + usedIndex;

                    await db.insert(vehicle).values({
                        title : usedTitle,
                        inseratId : findInserat.id,
                    })
                }
            }
        }

        const patchedInserat : any = await db.update(inserat).set({
            isPublished : publish,
            firstRelease : createDate,
        }).where(eq(inserat.id, params.inseratId)).returning();


        //if owner privatizes its inserat then remove all highlights and colors..
        if(!publish) {
            const patchedHighlight : any = await db.update(inserat).set({
                isHighlighted : false,
                color : null
            }).where(eq(inserat.id, params.inseratId)).returning();
        }

        const addressInserat = await db.query.address.findFirst({
            where : (eq(address.inseratId, params.inseratId))
        })

        let addressObject = await axios.get(`https://geocode.maps.co/search?q=${addressInserat?.postalCode},Deutschland&api_key=65db7269a0101559750093uena07e08`);

        

       

        
       
        
        if(publish) {
            const patchedAddress : any = await db.update(address).set({
                    longitude: String(addressObject.data[0].lon),
                    latitude: String(addressObject.data[0].lat),
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


