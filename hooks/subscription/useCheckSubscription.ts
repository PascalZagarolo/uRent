import { userSubscription } from "@/db/schema";
import { isAfter, isBefore } from "date-fns";

export const checkIfValid = (publicInserate : number, existingSubscription? : typeof userSubscription.$inferSelect) => {
    if(isBefore(new Date(existingSubscription?.stripe_current_period_end), new Date()) || !existingSubscription || existingSubscription?.amount <= publicInserate ) {
        console.log(isBefore(new Date(existingSubscription?.stripe_current_period_end), new Date()))
        console.log(!existingSubscription)
        console.log(existingSubscription?.amount <= publicInserate)
        return false;
    } else {
        return true;
    }
}