import { getInserate } from "@/actions/getInserate";
import db from "@/db/drizzle";
import { savedSearch } from "@/db/schema";
import { sendFoundResults } from "@/lib/mail";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request
) {
    try {



        const findSearches = db.query.savedSearch.findMany({
            where: (
                and(
                    eq(savedSearch.receiveAvailability, true),
                    eq(savedSearch.receivedAvailability, false)
                )
            ), with : {
                user : true
            }
        }).prepare("findSearches")

        const foundSearches = await findSearches.execute()

        console.log(foundSearches.length)

        for (const foundSearch of foundSearches) {
            const queryString = foundSearch.link.split('?')[1];
            const params: any = {};
            const queryStringPairs = queryString.split('&');
            queryStringPairs.forEach(pair => {
                const keyValue = pair.split('=');
                params[keyValue[0]] = decodeURIComponent(keyValue[1] || '');
            });

            

            const foundInserate = await getInserate({
                title: params?.title,
                thisCategory: params?.category,
                filter: params?.filter,
                start: Number(params?.start),
                end: Number(params?.end),
                
                periodBegin: params?.periodBegin,
                periodEnd: params?.periodEnd,
                location: params?.location,
                amount: Number(params?.amount),

                reqAge: Number(params?.reqAge),
                reqLicense: params?.reqLicense,

                thisBrand: params?.thisBrand,
                doors: Number(params?.doors),
                initial: new Date(params?.initial),
                power: Number(params?.power),
                seats: Number(params?.seats) || null,
                fuel: params?.fuel,
                transmission: params?.transmission,
                thisType: params?.thisType,
                freeMiles: Number(params?.freeMiles),
                extraCost: Number(params?.extraCost),

                weightClass: Number(params?.weightClass),
                drive: params?.drive,
                loading: params?.loading,
                application: params?.application,
                lkwBrand: params?.lkwBrand,

                trailerType: params?.trailerType,
                coupling: params?.coupling,
                extraType: params?.extraType,
                axis: Number(params?.axis),
                brake: params?.brake ? (params?.brake.toLowerCase() == 'true') : null,

                volume: params?.volume,
                loading_l: params?.loading_l,
                loading_b: params?.loading_b,
                loading_h: params?.loading_h,

                radius: params?.radius,
                userId: params?.userId,
                caution: params?.caution
            })

            if(foundInserate.length > 0) {
                //@ts-ignore
                sendFoundResults(foundSearch.user.email, foundSearch.link);

                const patchSearch = await db.update(savedSearch).set({
                    receivedAvailability : true
                }).where(eq(savedSearch.id, foundSearch.id))
            }
        }

        return new NextResponse("CRON JOB : check/saved-searches/newly-available executed...", { status : 200})

    } catch (error: any) {
        console.log(error);
        return new NextResponse("Fehler beim Löschen der Suche...")
    }
}