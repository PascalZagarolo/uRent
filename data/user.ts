import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";



export const getUserByEmail = async (email: string) => {
  try {
    console.log(email)
    const user = await db.query.users.findFirst({ 
      where: eq(users.email, email)
    });
    console.log(user)
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
       where: eq(users.id, id) 
      });

    return user;
  } catch {
    return null;
  }
};