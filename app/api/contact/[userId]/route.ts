import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { userId : string}}
) {
    try {

        const  values  = await req.json();

        console.log(values)

        const findOptions = await db.contactOptions.findFirst({
            where : {
                userId : params.userId
            }
        })

        if(!findOptions) { 
            const patchedOptions = await db.contactOptions.create({
                 data : {
                    userId : params.userId,
                    emailAddress : values?.email || "",
                    addressString : values?.address || "",
                    websiteAddress : values?.website || "",
                    
                }
            })
            return NextResponse.json(patchedOptions);
        } else {
            const patchedOptions = await db.contactOptions.update({
                where : {
                    userId : params.userId
                }, data : {
                    emailAddress :  values?.email || "",
                    addressString : values?.address || "",
                    websiteAddress : values?.website || "",
                }
                
            })
           return NextResponse.json(patchedOptions);
        }

        
        


    } catch (error) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
    }
}