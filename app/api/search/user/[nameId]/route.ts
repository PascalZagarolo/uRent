
import db from '@/db/drizzle';
import { userTable } from '@/db/schema';
import { ilike } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PATCH(
    req : Request,
    { params } : { params : { nameId : string }}
) {
    try {

       
        const findUsers = db.query.userTable.findMany({
            where : (
                ilike(userTable.name, `%${params.nameId}%`)
            )
        }).prepare("findUsers")

        const foundUsers = await findUsers.execute();
       

        return NextResponse.json(foundUsers)

    } catch (error) {
        console.log(error);
       return NextResponse.json([], { status : 500 });
    }
}