import bcrypt from "bcrypt";

import prisma from '@/app/utils/db'
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  
    const user = await prisma.user.create({
        data : {
            name : "Name",
            email: "test@test.com",
            hashedPassword : await bcrypt.hash("password", 10)
        }
    })

  return NextResponse.json(user);
}