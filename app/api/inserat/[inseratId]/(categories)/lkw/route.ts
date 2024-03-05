import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const values = await req.json();

        const findAttributes = await db.lkwAttribute.findFirst({
            where : {
                inseratId : params.inseratId
            }
        })

        if(!findAttributes) {
            const patchedInserat = await db.lkwAttribute.create({
                data: {
                    inseratId : params.inseratId,
                    ...values
                }
            })
            return NextResponse.json(patchedInserat);
            
        } else {
            const patchedInserat = await db.lkwAttribute.update({
                where : {
                    inseratId : params.inseratId
                }, data : {
                    ...values
                }
            })
            return NextResponse.json(patchedInserat);
        }

        

    } catch (error) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
        
    }
}