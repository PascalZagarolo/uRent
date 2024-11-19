'use server'

import { stripe } from "@/lib/stripe";

export const connectExistingSubscription = async (findEmail : string) => {
    try {

        const findCorrespondingUser = await stripe.customers.list({
            email : findEmail
        })

        const allSubscriptions = [];

        for (let i = 0; i < findCorrespondingUser?.data?.length; i++) {
            const findSubscriptions = await stripe.subscriptions.list({
                customer : findCorrespondingUser.data[0].id,
            })
            allSubscriptions.push(findSubscriptions?.data);
        }
        

        if(allSubscriptions.length === 0) {
            return {
                success : true,
                message : "Keine erstellen Abonnements gefunden",
                latestSubscription : null
            }
        }

        let latestSubscription;

        for (let i = 0; allSubscriptions?.length; i++) {
            if(allSubscriptions[i]?.current_period_end > latestSubscription?.current_period_end) {
                latestSubscription = allSubscriptions[i];
            }
        }

        console.log(latestSubscription);

        return {
            success : true,
            message : "Abonnement gefunden",
            latestSubscription : latestSubscription
        }

        // console.log("test")
        // console.log(findSubscriptions?.data[0]?.metadata)
        
        // let latestSubscription;

        // for(let i = 0; i < findSubscriptions?.data?.length; i++) {
        //     if(findSubscriptions?.data[i]?.current_period_end > latestSubscription?.current_period_end) {
        //         latestSubscription = findSubscriptions?.data[i];
        //     }
        // }

        // console.log(latestSubscription)

    
    } catch(e : any) {
        console.log(e);
        return null;
    }
}