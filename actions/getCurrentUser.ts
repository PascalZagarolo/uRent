

import { db } from "../app/utils/db";
import getSession from "./getSession";


const getCurrentUser = async () => {
  try {
    
    const session = await getSession();

    const currentUser = await db.user.findUnique({
      where: {
        email: session?.user?.email
      }
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;