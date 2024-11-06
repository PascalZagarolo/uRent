


import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { validateRequest } from "@/lib/lucia";

import { eq, sql } from "drizzle-orm";
import { cache } from "react";





const getCurrentUserDashboard = async () => {
  try {

    const { user } = await validateRequest();

    const findUser = db.query.userTable.findFirst({
      where: (eq(userTable.id, sql.placeholder("userId"))),
      with: {
        inserat: {
          with: {
            images: true,
            vehicles: {
              with: {
                inserat: {
                  with: {
                    address: true,
                  }
                },
                bookings : true,
              }
            },
            user : {
              with : {
                subscription : true,
              }
            },
            address: true,
            bookings: {
              with: {
                user: true,
                vehicle: true,
                inserat: true
              }
            },
            bookingRequests: {
              with: {
                inserat: {
                  with: {
                    images: true
                  }
                },
                user : true
              }
            }
          }
        },
        favourites : {
          with : {
            inserat : {
              with : {
                images : true,
                user : true
              }
            }
          }
        },
        subscription : true
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

export default getCurrentUserDashboard;


