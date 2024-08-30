import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(
    req : Request
) {
    try {

        const values = await req.json();

        if(values.secret !== process.env.URENT_API_KEY) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!values?.token) {
            return new NextResponse("Bad Request", { status: 400 });
        }

        const sendMail = await sendTwoFactorTokenEmail(values?.email, values?.token);

        return new NextResponse("OK", { status: 200 });

    } catch (e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}