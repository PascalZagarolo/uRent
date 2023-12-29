import { db } from "@/app/utils/db";
import bcrypt from "bcrypt";
import { StaticImageData } from "next/image";


import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const body = await request.json();
  const {
    email,
    name,
    password
  } = body;

  const hashedPassword: string = await bcrypt.hash(password, 12);

  const user = await db.user.create({
    data: {
      email : email as string,
      name : name as string,
      hashedPassword : hashedPassword as string, 
    }
  });

  return NextResponse.json(user);
}