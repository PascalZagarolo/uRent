import { db } from '@/utils/db';
import { NextResponse } from 'next/server';
export async function POST(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const values = await req.json()

        console.log(values)

        const booking = await db.booking.create({
            data : {
                inseratId : params.inseratId,
                userId : values.userId,
                startDate : values.start,
                endDate : values.end
            }
        })

        return NextResponse.json(booking)

    } catch(error) {
        console.log(error);
        return new NextResponse("Interner Server Error", { status : 500 })
    }
}