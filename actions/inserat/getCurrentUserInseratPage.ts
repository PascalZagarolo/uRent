'use server'

import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { validateRequest } from "@/lib/lucia";
import { eq } from "drizzle-orm";

const getCurrentUserInseratPage = async () => {
    try {
  
      const { user } = await validateRequest();
  
      const findUser = db.query.userTable.findFirst({
        where : eq(userTable.id, user.id),
        with : {
            contactOptions: {
                with : {
                    userAddress : true
                }
            },
            subscription : true,
            notifications : true
        }
    }).prepare("findUser");
  
  
  
      const currentUser = await findUser.execute({ userId: user.id })
  
  
      if (!currentUser) {
  
        return null;
      }
  
      return currentUser;
    } catch (error) {
      return null;
    }
  };
  
  export default getCurrentUserInseratPage;