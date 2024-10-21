import { userSubscription } from "@/db/schema";
import { isAfter } from "date-fns";

export const checkIfValid = (publicInserate : number, existingSubscription? : typeof userSubscription.$inferSelect) => {
    if(isAfter(new Date(existingSubscription?.stripe_current_period_end), new Date()) || !existingSubscription || existingSubscription?.amount >= publicInserate ) {
        return false;
    } else {
        return true;
    }
}