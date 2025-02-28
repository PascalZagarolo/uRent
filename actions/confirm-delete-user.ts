'use server'
import db from "@/db/drizzle";
import getCurrentUser from "./getCurrentUser";
import { deleteUserToken, userTable } from '../db/schema';
import { eq } from "drizzle-orm";
import { sendConfirmAccountDeleted } from "@/lib/mail";
import { stripe } from "@/lib/stripe";

export const confirmDeleteUser = async (token: string) => {
    try {
        const currentUser = await getCurrentUser();
        
        if (!currentUser) {
            return { error: "Nutzer existiert nicht." };
        }

        // Retrieve user data with subscription information
        const findUserWithSubscriptions = await db.query.userTable.findFirst({
            where: eq(userTable.id, currentUser.id),
            with: { subscription: true }
        });

        // Check if the token is valid
        const findToken = await db.query.deleteUserToken.findFirst({
            where: eq(deleteUserToken.token, token)
        });

        if (!findToken) {
            return { error: "Token nicht gefunden." };
        }

       

        // Retrieve Stripe customer(s) with the email of the current user
        const customers = await stripe.customers.list({
            email: currentUser.email
        });

        console.log(customers?.data);

        for await (const pCustomer of customers.data) {
            

            // Retrieve subscriptions for the customer
            const retrievedSubscriptions = await stripe.subscriptions.list({
                customer: pCustomer.id,
                limit: 1000
            });

            

            // Cancel all retrieved subscriptions
            for (const subscription of retrievedSubscriptions.data) {
                if (subscription.status !== 'canceled') {
                    //await stripe.subscriptions.cancel(subscription.id);
                    await stripe.subscriptions.update(subscription.id, {
                        cancel_at_period_end: true
                    })
                }
            }
        }

        // Cancel the user's associated subscription if it exists
        if (findUserWithSubscriptions?.subscription?.stripe_subscription_id) {
            try {
                // Only cancel if the subscription is not already canceled
                const userSubscription = await stripe.subscriptions.retrieve(
                    findUserWithSubscriptions.subscription.stripe_subscription_id
                );
                if (userSubscription.status !== 'canceled') {
                    // await stripe.subscriptions.cancel(
                    //     findUserWithSubscriptions.subscription.stripe_subscription_id
                    // );
                    await stripe.subscriptions.update(
                        findUserWithSubscriptions.subscription.stripe_subscription_id,
                        {
                            cancel_at_period_end: true
                        }
                    )
                }
            } catch (error) {
                console.log(
                    `Error canceling subscription ${findUserWithSubscriptions.subscription.stripe_subscription_id}: `,
                    error
                );
            }
        }

        // Delete user from the database and send a confirmation email
        const userEmail = currentUser.email;
        await db.delete(userTable).where(eq(userTable.id, currentUser.id));
        await sendConfirmAccountDeleted(userEmail);
        console.log("Account deleted successfully.");
        return { success: "Account gelöscht." };
    } catch (error: any) {
        console.error(error);
    }
};
