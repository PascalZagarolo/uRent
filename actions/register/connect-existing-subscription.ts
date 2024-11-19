import { stripe } from "@/lib/stripe";

export const connectExistingSubscription = async (findEmail : string) => {
    try {

        const findCorrespondingUser = await stripe.customers.list({
            email : findEmail
        })

        const findSubscriptions = await stripe.subscriptions.list({
            customer : findCorrespondingUser.data[0].id
        })

        if(findSubscriptions?.data?.length === 0) {
            return null;
        }
        
        console.log(findSubscriptions?.data[0]?.metadata)
        
        let latestSubscription;

        for(let i = 0; i < findSubscriptions?.data?.length; i++) {
            if(findSubscriptions?.data[i]?.current_period_end > latestSubscription?.current_period_end) {
                latestSubscription = findSubscriptions?.data[i];
            }
        }

        console.log(latestSubscription)

        return latestSubscription;
    
    } catch(e : any) {
        console.log(e);
        return null;
    }
}