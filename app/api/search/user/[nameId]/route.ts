import { db } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function PATCH(
    req : Request,
    { params } : { params : { nameId : string }}
) {
    try {

       console.log(params.nameId)

       const users = await db.user.findMany({
        where : {
            name : {
                contains : params.nameId,
                mode : "insensitive"
            }
        }
       })

        return NextResponse.json(users, { status : 200})

    } catch (error) {
        console.log(error);
        return [];
    }
}