
import db from "@/db/drizzle";
import { contactOptions, userAddress, users } from "@/db/schema";
import { eq } from "drizzle-orm";

import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {

        const values = await req.json();

        console.log(values)

        const findOptions = await db.query.contactOptions.findFirst({
            where: eq(contactOptions.userId, params.userId)

        })

        const findUserAddress = await db.query.userAddress.findFirst({
            where: eq(userAddress.userId, params.userId)
        })

        if (!findOptions) {
            const patchedOptions = await db.insert(contactOptions).values({
                userId: params.userId,
                emailAddress: values?.email || "",
                websiteAddress: values?.website || "",
            }).returning()
            console.log("test")

            const patchedUserAddress = await db.insert(userAddress).values({
                userId: params.userId,
                contactOptionsId: patchedOptions[0].id,
                city: values?.city,
                houseNumber: Number(values?.houseNumber),
                street: values?.street,
                postalCode: Number(values?.postalCode),

            }).returning();
            console.log("test")
            const updatedUser = await db.update(users).set({
                contactId: patchedOptions[0].id,
                userAddressId: patchedUserAddress[0].id
            }).where(eq(users.id, params.userId))
            console.log("test")
            return NextResponse.json({ patchedOptions, patchedUserAddress, updatedUser });
        } else {

            if (!findUserAddress) {
                const patchedUserAddress = await db.insert(userAddress).values({
                    userId: params.userId,
                    city: values?.city,
                    houseNumber: Number(values?.houseNumber),
                    street: values?.street,
                    postalCode: Number(values?.postalCode),
                }).returning();

                const patchedOptions = await db.update(contactOptions).set({
                    emailAddress: values?.email,
                    websiteAddress: values?.website,
                    userAddressId: patchedUserAddress[0].id
                }).where(eq(contactOptions.userId, params.userId)).returning()

                return NextResponse.json({ patchedOptions, patchedUserAddress });
            }

            const patchedOptions = await db.update(contactOptions).set({
                emailAddress: values?.email,
                websiteAddress: values?.website,
            }).where(eq(contactOptions.userId, params.userId)).returning()


            const patchedAddress = await db.update(userAddress).set({
                city: values?.city,
                    houseNumber: Number(values?.houseNumber),
                    street: values?.street,
                postalCode: Number(values?.postalCode)
            }).where(eq(userAddress.userId, params.userId)).returning();
            return NextResponse.json(patchedOptions[0]);
        }





    } catch (error) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
    }
}