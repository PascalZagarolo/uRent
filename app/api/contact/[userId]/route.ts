
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
            console.log(1)
            const patchedOptions : typeof contactOptions = await db.insert(contactOptions).values({
                userId: params.userId,
                emailAddress: values?.email || "",
                websiteAddress: values?.website || "",
            }).returning()
            console.log(2)

            const patchedUserAddress : typeof userAddress = await db.insert(userAddress).values({
                userId: params.userId,
                contactOptionsId: patchedOptions[0].id,
                city: values?.city,
                houseNumber: values?.houseNumber ? Number(values?.houseNumber) : null,
                street: values?.street,
                postalCode: values?.postalCode ? Number(values?.postalCode) : null,

            }).returning();
            console.log(3)
            const updatedUser = await db.update(users).set({
                contactId: patchedOptions[0].id,
                userAddressId: patchedUserAddress[0].id
            }).where(eq(users.id, params.userId)).returning();

            const updatedContactOptions = await db.update(contactOptions).set({
                userAddressId: patchedUserAddress[0].id
            }).where(eq(contactOptions.userId, params.userId)).returning();
            console.log("test")
            return NextResponse.json({ patchedOptions, patchedUserAddress, updatedUser });
        } else {

            if (!findUserAddress) {
                const patchedUserAddress : typeof userAddress.$inferSelect = await db.insert(userAddress).values({
                    userId: params.userId,
                    city: values?.city,
                    houseNumber: values?.houseNumber ? Number(values?.houseNumber) : null,
                    street: values?.street,
                    postalCode: values?.postalCode ? Number(values?.postalCode) : null,
                }).returning();

                const patchedOptions = await db.update(contactOptions).set({
                    emailAddress: values?.email,
                    websiteAddress: values?.website,
                    userAddressId: patchedUserAddress[0].id
                }).where(eq(contactOptions.userId, params.userId)).returning()

                const patchedUser = await db.update(users).set({
                    userAddressId : patchedUserAddress[0].id,
                }).where(eq(users.id, params.userId)).returning();

                return NextResponse.json({ patchedOptions, patchedUserAddress, patchedUser });
            }

            const patchedOptions : typeof contactOptions = await db.update(contactOptions).set({
                emailAddress: values?.email,
                websiteAddress: values?.website,
            }).where(eq(contactOptions.userId, params.userId)).returning()


            const patchedAddress = await db.update(userAddress).set({
                city: values?.city,
                houseNumber: values?.houseNumber ? Number(values?.houseNumber) : null,
                street: values?.street,
                postalCode: values?.postalCode ? Number(values?.postalCode) : null
            }).where(eq(userAddress.userId, params.userId)).returning();
            return NextResponse.json(patchedOptions[0]);
        }





    } catch (error : any) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
    }
}

