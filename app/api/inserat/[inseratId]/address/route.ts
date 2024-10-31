
import db from "@/db/drizzle";
import { address, inserat } from "@/db/schema";
import axios from "axios";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const values = await req.json();

        let addressObject
        if(values?.postalCode) {
            addressObject = await axios.get(`https://geocode.maps.co/search?q=${values.postalCode},Deutschland&api_key=65db7269a0101559750093uena07e08`);
        }
        
       


        console.log(addressObject.data[0]?.lon)
        console.log(addressObject.data[0]?.lat)
        
       
        

       
        
        

        const existingAddressObject = await db.query.address.findFirst({
            where : eq(address.inseratId, params.inseratId)
        })

        if(!existingAddressObject) {

            const patchedAddress : any = await db.insert(address).values({
                inseratId : params.inseratId,
                ...values,
            }).returning()

            const patchedOrigin = await db.update(inserat).set({
                addressId : patchedAddress[0].id
            }).where(eq(inserat.id, params.inseratId)).returning();

            return NextResponse.json({patchedAddress, patchedOrigin});
            
        } else {
            const patchedAddress : any = await db.update(address).set({
                longitude : addressObject.data[0].lon,
                latitude : addressObject.data[0].lat,
                ...values
            }).where(eq(address.inseratId, params.inseratId)).returning();
            return NextResponse.json(patchedAddress[0]);
        }

        

    } catch (error : any) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
        
    }
}