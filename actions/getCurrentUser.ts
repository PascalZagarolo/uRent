


import db from "@/db/drizzle";

import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

import { auth } from "@/auth";


const getCurrentUser = async () => {
  try {
    
    const current = await auth();
    
    const currentUser = await db.query.users.findFirst({
      where: eq(users.email, current.user?.email)
    });

    const allUser = await db.query.users.findMany();
    

    if (!currentUser) {
      console.log("leer")
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;