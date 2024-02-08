import { db } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function PATCH(
    req : Request,
    { params } : { params : { nameId : string }}
) {
    try {

       

       const users = await db.user.findMany({
        where : {
            name : {
                contains : params.nameId,
                mode : "insensitive"
            }
        }
       })

        return NextResponse.json(users)

    } catch (error) {
        console.log(error);
       return NextResponse.json([], { status : 500 });
    }
}