
import db from "@/db/drizzle";
import { contactOptions, users } from "@/db/schema";
import { eq } from "drizzle-orm";

import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { userId : string}}
) {
    try {

        const values = await req.json();

        console.log(values)

        const findOptions = await db.query.contactOptions.findFirst({
            where : eq(contactOptions.userId, params.userId)
            
        })

        if(!findOptions) { 
            
            const patchedOptions = await db.insert(contactOptions).values({
                userId : params.userId,
                emailAddress : values?.email || "",
                websiteAddress : values?.website || "",
            }).returning()

            const updatedUser = await db.update(users).set({
                contactId : patchedOptions[0].id
            }).where(eq(users.id, params.userId))

            return NextResponse.json(patchedOptions);
        } else {
            const patchedOptions = await db.update(contactOptions).set({
                emailAddress : values?.email || "",
                websiteAddress : values?.website || "",
            }).where(eq(contactOptions.userId, params.userId)).returning()
           return NextResponse.json(patchedOptions[0]);
        }

        
        


    } catch (error) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
    }
}