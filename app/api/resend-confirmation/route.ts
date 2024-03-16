'use server'

import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    
) {
    try {
        const { email } = await req.json();
        

        const verificationToken = await generateVerificationToken(email);

        
        
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )
        
            return new NextResponse("Email sent", { status: 200 });

    } catch(error) {
         console.log(error);
         return new NextResponse(error, { status: 500 })
    }
}