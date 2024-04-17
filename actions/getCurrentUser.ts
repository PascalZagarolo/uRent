


import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { validateRequest } from "@/lib/lucia";

import { eq, sql } from "drizzle-orm";





const getCurrentUser = async () => {
  try {
    
    const { user } = await validateRequest();

    console.log(user)
   

    const findUser : typeof userTable.$inferSelect = db.query.userTable.findFirst({
      where: eq(userTable.id, sql.placeholder("userId"))
    }).prepare("findUser");

    const currentUser = await findUser.execute({userId : user.id })

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