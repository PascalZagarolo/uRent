'use server'
import db from "@/db/drizzle";
import getCurrentUser from "./getCurrentUser"
import { deleteUserToken, userTable } from '../db/schema';
import { eq } from "drizzle-orm";
import { sendConfirmAccountDeleted } from "@/lib/mail";
import { stripe } from "@/lib/stripe";

export const confirmDeleteUser = async (token: string) => {

    try {

        const currentUser = await getCurrentUser();

        const findUserWithSubscriptions = await db.query.userTable.findFirst({
            where: eq(userTable.id, currentUser.id),
            with : {
                subscription : true
            }
        })

        if (!currentUser) {
            return { error: "Nutzer existiert nicht." }
        }

        const findToken = await db.query.deleteUserToken.findFirst({
            where: eq(deleteUserToken.token, token)
        })

        if (!findToken) {
            return { error: "Token nicht gefunden." }
        }

        if (findToken.userId !== currentUser.id) {
            return { error: "Nicht eingeloggt." }
            
        }

        //get all customers with the email of the current user
        const customer = await stripe.customers.list({
            email : currentUser.email
        })

        console.log(customer)

        for(const pCustomer of customer.data) {
            const retrievedSubscriptions = await stripe.subscriptions.list({
                customer: pCustomer.id
            })
            console.log(retrievedSubscriptions?.data)
            for(const subscription of retrievedSubscriptions.data) {
                await stripe.subscriptions.cancel(subscription.id)
            }
            console.log(retrievedSubscriptions?.data)
            for (const subscription of findUserWithSubscriptions?.subscription ?? []) {
                await stripe.subscriptions.cancel(subscription?.stripeSubscriptionId)
            }
            console.log(retrievedSubscriptions?.data)
        }

        //get all subscriptions of every user
        //for each subscription => cancel it

        const userEmail = currentUser.email;

        
        await db.delete(userTable).where(eq(userTable.id, currentUser.id))
        
        await sendConfirmAccountDeleted(userEmail);
        console.log("...")
        return { success: "Account gelöscht." }
        

    } catch (error: any) {
        console.log(error);
    }



}