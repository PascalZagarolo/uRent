
import db from "@/db/drizzle";
import { oauthAccountTable, userTable } from "@/db/schema";
import { lucia } from "@/lib/lucia";
import { google } from "@/lib/lucia/oauth";

import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


interface GoogleUser {
    id: string
    email: string
    verified_email: boolean
    name: string
    given_name: string
    picture: string
    locale: string
  }

export const GET = async (req: NextRequest) => {
    try {

    let usedUser;

    const url = req.nextUrl;

    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if(!code || !state) {
        return Response.json(
            { error : "Ungültige Anfrage, kein Code oder State"},
            { status : 400}
        )
    }


    const codeVerifier = cookies().get("codeVerifier")?.value;
    const savedState = cookies().get("state")?.value;

    console.log(codeVerifier, savedState)

    if(!codeVerifier || !savedState) {
        return Response.json(
            { error : "Ungültige Anfrage, kein Codeverifier oder savedState"},
            {status : 400}
        )
    }

    if(savedState !== state) {
        return Response.json(
            { error : "Ungültige Anfrage, savedState ist nicht gleich state" },
            { status : 400 }
        )
    }

    console.log("1")

    const { accessToken, idToken, accessTokenExpiresAt, refreshToken } =
      await google.validateAuthorizationCode(code, codeVerifier)

      const googleRes = await fetch(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          method: "GET",
        }
      )

    console.log(googleRes)

    const googleData = (await googleRes.json()) as GoogleUser


    console.log(googleData)

    const oAuthLink = async () => {
        console.log("3")

        const user = await db.query.userTable.findFirst({
            where : eq(userTable.email, googleData.email)
        })

        usedUser = user;

        console.log("3")

        

        let session = null;

        if(!user){

            const userId = generateId(15)

            const createdUser  = await db.insert(userTable).values({
                id : userId,
                email : googleData.email,
                name : googleData.name,
                image : googleData.picture,
                confirmedMail : true,
            }).returning();
            //@ts-ignore
            usedUser = createdUser[0];

            //@ts-ignore
            if(createdUser.length === 0) {
                return Response.json(
                    { error : "Fehler beim Registrieren"},
                    { status : 500 }
                )
            }

            console.log("4")

            const createdOAuthAccount = await db.insert(oauthAccountTable).values({
                accessToken,
                expiresAt : accessTokenExpiresAt,
                id : googleData.id,
                provider : "google",
                providerUserId : googleData.id,
                //@ts-ignore
                userId : createdUser[0].id,
                refreshToken
            })

            console.log("5")

            if(createdOAuthAccount.rowCount === 0) {
                return Response.json(
                    { error : "Fehler beim Registrieren"},
                    { status : 500 }
                )
            } else {
                console.log("6")
                const updatedOAuthAccountRes = await db.update(oauthAccountTable).set({
                    accessToken,
                    expiresAt : accessTokenExpiresAt,
                    refreshToken
                }).where(eq(oauthAccountTable.id, googleData.id)).returning()

                console.log("7")

                if(updatedOAuthAccountRes.length === 0) {
                    return Response.json(
                        { error : "Fehler beim Updaten vom oAuth Account"},
                        { status : 500 }
                    )
                }

               

            }

            
        }
        
        console.log("8")
        

        

    }

    await oAuthLink();
    
    

    //@ts-ignore
    const session = await lucia.createSession(usedUser.id, {
        expiresIn : 60 * 60 * 24 * 30
    })

    const sessionCookie = lucia.createSessionCookie(session.id);

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        )

        return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL),
        { status : 302 }
        )

    } catch(error : any) {
        console.log("Fehler bei der oAuth Verknüpfung" , error);
        return new NextResponse("Fehler bei der oAuth Verknüpfung", { status : 500 })
    }
    

}