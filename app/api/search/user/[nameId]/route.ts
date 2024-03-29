
import db from '@/db/drizzle';
import { users } from '@/db/schema';
import { ilike } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PATCH(
    req : Request,
    { params } : { params : { nameId : string }}
) {
    try {

       
        const foundUsers = await db.query.users.findMany({
            where : (
                ilike(users.name, `%${params.nameId}%`)
            )
        })
       

        return NextResponse.json(foundUsers)

    } catch (error) {
        console.log(error);
       return NextResponse.json([], { status : 500 });
    }
}