import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { NextResponse } from "next/server";
import { giftCode } from '../../../db/schema';

export async function POST(
    req : Request,
    
) {
    try {

        const currentUser = await getCurrentUser();

        function generateRandomString(length: number): string {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
          
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              result += characters[randomIndex];
            }
          
            return result;
          }

        if(!currentUser) {
            return new NextResponse("Nicht autorisiert", { status : 401 })
        }

        if(!currentUser.isAdmin){
            return new NextResponse("Nicht autorisiert, keine Berechtigung", { status : 401 })
        }

        const {expirationDate,...values} = await req.json();

        const usedToken = generateRandomString(16);

        const usedExpirationDate = new Date(expirationDate);
        console.log(usedExpirationDate);

        const [createdGiftcode] = await db.insert(giftCode).values({
            code : usedToken,
            expirationDate : usedExpirationDate,
            ...values
        }).returning();

        return NextResponse.json(createdGiftcode);


    } catch(error : any) {
        console.log(error);
        return new NextResponse("Error beim Code erstellen", { status : 500 })
    }
}