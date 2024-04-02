


import db from "@/db/drizzle";

import { eq, sql } from "drizzle-orm";
import { users } from "@/db/schema";

import { auth } from "@/auth";


const getCurrentUser = async () => {
  try {
    
    const current = await auth();
    console.log(current)

    const findUser = db.query.users.findFirst({
      where: eq(users.email, sql.placeholder("email"))
    }).prepare("findUser");

    const currentUser = await findUser.execute({email : current.user?.email})

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