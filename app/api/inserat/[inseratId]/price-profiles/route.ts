import getCurrentUser from "@/actions/getCurrentUser"
import db from "@/db/drizzle";
import { inserat } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server"

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string } }
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Nicht authorisiert", { status: 401 })
        }

        const getInserat = await db.query.inserat.findFirst({
            where : eq(inserat.id, params.inseratId)
        })

        if(!getInserat) {
            return new NextResponse("Inserat nicht gefunden", { status: 404 })
        }

        if(getInserat.userId !== currentUser.id) {
            return new NextResponse("Nicht authorisiert", { status: 401 })
        }

        const values = await req.json();

        let returnedInserat;

        switch(values.type) {
            case "hours":
                returnedInserat = await db.update(inserat).set({
                    priceHour : values.price
                }).where(eq(inserat.id, params.inseratId))
                break;
             case "weekend":
                    returnedInserat = await db.update(inserat).set({
                        priceWeekend : values.price
                    }).where(eq(inserat.id, params.inseratId))
                    break;
            case "kilometer":
                        returnedInserat = await db.update(inserat).set({
                            priceKilometer : values.price
                        }).where(eq(inserat.id, params.inseratId))
                        break;
            
            default:
                return new NextResponse("Falscher Preisprofil Typ", { status: 400 })
        }


        return NextResponse.json(returnedInserat)

    } catch (error) {
        console.log("Fehler beim erstellen eines neues Preisprofils", error)
        return new NextResponse("Fehler beim erstellen eines neues Preisprofils", { status: 500 })
    }
}