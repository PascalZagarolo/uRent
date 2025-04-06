import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { transferAccountToken, userTable } from "@/db/schema";
import { sendAccountTranferBegin } from "@/lib/mails/admin-stuff";
import { addHours } from "date-fns";
import { eq } from "drizzle-orm";
import { values } from "lodash";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {

        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.isAdmin) {
            return new NextResponse("Not authenticated", { status: 401 });
        }


        const { newAddress, userId } = await req.json();

        if(!newAddress || !userId) {
            return new NextResponse("Fehlende Details", { status : 400})
        }

        const findExistingMail = await db.query.userTable.findFirst({
            where : eq(userTable.email, newAddress)
        })

        if(findExistingMail) {
            return new NextResponse("Email bereits verknüpft", { status : 401 })
        }

        const nativePassword = generateCode();
        const emailConfirmToken = generateCode();

        //generate onetimepassword
        const now = new Date();
        const expirationDate = addHours(now, 1);

        //add transferAccountToken to DB (__id__, userId, nativePasscode, expirationDate, createdAt)
        const createTransferToken = await db.insert(transferAccountToken).values({
            userId: userId,
            nativePasscode: nativePassword,
            confirmMailToken : emailConfirmToken,
            expirationDate : expirationDate,
            lastSentDate : now
        }).returning()


        const createdLink = process.env.NEXT_PUBLIC_BASE_URL + "/auth/transfer-account" + `?token=${createTransferToken[0].id}`

        //send mail
        await sendAccountTranferBegin(newAddress, createdLink, nativePassword)
    
        return new NextResponse("Success", { status : 200})
    } catch (e: any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};