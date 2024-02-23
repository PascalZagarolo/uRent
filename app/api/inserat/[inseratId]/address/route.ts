import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const values = await req.json();

        const existingAddressObject = await db.address.findFirst({
            where : {
                inseratId : params.inseratId
            }
        })

        if(existingAddressObject) {
           const updatedAddress =  await db.address.update({
            where :{
                id : existingAddressObject.id
            }, data : {
                ...values
            }
           })

           return NextResponse.json(updatedAddress);
        } else if(!existingAddressObject) {
            const createdAddress = await db.address.create({
                data : {
                    inseratId : params.inseratId,
                    ...values
                
                }
            })

            return NextResponse.json(createdAddress);

        }

    } catch(error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}