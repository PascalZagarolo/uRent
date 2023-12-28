
import { useSession } from "next-auth/react";
import { db } from "../utils/db";
import getSession from "./getSession";
import { getServerSession } from "next-auth";

const getCurrentUser = async () => {
  try {
    
    const session = await getServerSession();

    const currentUser = await db.user.findUnique({
      where: {
        email: session?.user?.email as string
      }
    });

    

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;