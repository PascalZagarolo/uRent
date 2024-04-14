import { inserat } from './../../../../../db/schema';

import db from "@/db/drizzle";

import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server"

export async function PATCH(
    req : Request,
    { params } : { params : { inseratId : string }}
) {
    try {

        const increment = (column: typeof inserat, value = 1) => {
            return sql`${column} + ${value}`;
          };
       
        const updateInserat = db.update(inserat).set({
            
            views: increment(inserat.views, 1)
        }).where(eq(inserat.id, sql.placeholder('id'))).prepare("updateInserat")
        
       await updateInserat.execute({ id: params.inseratId })
        return NextResponse.json(updateInserat)
    } catch(error : any) {
        console.log(error )
        return new NextResponse(error, { status: 500 });
    }
}