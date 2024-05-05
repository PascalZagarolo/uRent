


import db from "@/db/drizzle";
import {  userTable } from "@/db/schema";
import { validateRequest } from "@/lib/lucia";

import { eq, sql } from "drizzle-orm";
import { cache } from "react";





const getCurrentUser = cache(async () => {
  try {
    
    const { user } = await validateRequest();

    const findUser  = db.query.userTable.findFirst({
      where: (eq(userTable.id, sql.placeholder("userId"))),
      
    }).prepare("findUser");

    

    const currentUser = await findUser.execute({userId : user.id })
    console.log(currentUser)

    if (!currentUser) {
      
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
});

export default getCurrentUser;