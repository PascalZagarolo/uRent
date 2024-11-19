'use server'

import { stripe } from "@/lib/stripe";

export const connectExistingSubscription = async (findEmail : string) => {
    try {

        const findCorrespondingUser = await stripe.customers.list({
            email : findEmail
        })
        console.log(findCorrespondingUser?.data)
        const allSubscriptions = [];
       
        for (let i = 0; i < findCorrespondingUser?.data?.length; i++) {

            const findSubscriptions = await stripe.subscriptions.list({
                customer : findCorrespondingUser.data[0].id as string,
            })

            console.log(findSubscriptions?.data)
            allSubscriptions.push(findSubscriptions?.data);
        }
        
        let foundProduct;
        let latestSubscription;

        if(allSubscriptions.length === 0) {
            return {
                success : true,
                message : "Keine erstellen Abonnements gefunden",
                latestSubscription : null
            }
        }
       
        

        for (let i = 0; i < allSubscriptions?.length; i++) {
            
            if(allSubscriptions[i]?.current_period_end > latestSubscription?.current_period_end) {
                latestSubscription = allSubscriptions[i];
            } else if(latestSubscription === undefined) {
                latestSubscription = allSubscriptions[i];
            }
        }


        if (latestSubscription) {
            foundProduct = await stripe.products.retrieve(latestSubscription[0].plan.product as string);
        }

        return {
            success : true,
            message : "Abonnement gefunden",
            latestSubscription : latestSubscription,
            product : foundProduct
        }

        
    
    } catch(e : any) {
        console.log(e);
        return null;
    }
}