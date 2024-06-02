import db from "@/db/drizzle";
import { favourite, notification, userTable } from "@/db/schema";
import { validateRequest } from "@/lib/lucia";
import { eq, sql } from "drizzle-orm";

const getCurrentUserWithFavourites = async () => {
    try {
      
      const { user } = await validateRequest();
  
      const findUser  = db.query.userTable.findFirst({
        where: (eq(userTable.id, sql.placeholder("userId"))),
        with : {
            favourites : true
        }
        
      }).prepare("findUser");
  
      
  
      const currentUser = await findUser.execute({userId : user.id })
      
  
      if (!currentUser) {
        
        return null;
      }
  
      return currentUser;
    } catch (error) {
      return null;
    }
  };
  
  export default getCurrentUserWithFavourites;