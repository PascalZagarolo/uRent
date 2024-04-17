import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";



export const getUserByEmail = async (email: string) => {
  try {
    console.log(email)
    const user = await db.query.userTable.findFirst({ 
      where: eq(userTable.email, email)
    });
    console.log(user)
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.userTable.findFirst({
       where: eq(userTable.id, id) 
      });

    return user;
  } catch {
    return null;
  }
};