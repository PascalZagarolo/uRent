import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { db } from "@/utils/db";
import bcrypt from "bcrypt";



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

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await db.user.create({
    data: {
      password: hashedPassword,
      email: email as string,
      name: name,

    }
  });

  const verificationToken = await generateVerificationToken(email as string);

  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  )

  return NextResponse.json(user);
}