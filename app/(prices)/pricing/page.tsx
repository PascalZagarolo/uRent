import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";
import BuyOptions from "./_components/buy-options";
import RedeemCode from "./_components/redeem-code";
import ComparisonPlans from "./_components/comparison-plans";
import Faq from "./_components/faq";
import PricingHeader from "./_components/pricing-header";




const PricingMainPage = async () => {

    
    const currentUser = await getCurrentUser();

    

    let existingSubscription = await db.query.userSubscription.findFirst({
        where: (
            eq(userSubscription.userId, currentUser?.id)
        )
    })

    if(existingSubscription) {
        existingSubscription.stripe_current_period_end > new Date() ? existingSubscription = existingSubscription : existingSubscription = null;
    }



    return (

        <div>
            <div className="sm:p-4  items-center">
                {!existingSubscription && (
                    <div className="px-4">
                        <PricingHeader />
                    </div>
                )}
            <div className="mt-8">
                {existingSubscription && (
                    <div className="text-md font-semibold sm:flex items-center gap-x-2 sm:p-0 p-4">
                        Dein aktuelles Abonnement:
                        <div className="text-indigo-600 font-bold">
                            {existingSubscription?.subscriptionType}
                        </div>
                        <div className="flex items-center gap-x-1">
                            (bis zu <div className="text-indigo-600 font-bold">{existingSubscription?.amount}</div> Inserate)
                        </div>
                    </div>
                )}
            <div className="w-full">
                <BuyOptions
                        currentUserId={currentUser?.id}
                        existingSubscription={existingSubscription}
                    />
                    <div className="mt-2 ">
                    <RedeemCode />
                    </div>
                    <div className="w-full">
                    <ComparisonPlans 
                        
                        />
                    </div>
                    <div className="mt-16 pb-16">
                        <Faq />
                    </div>
                </div>

            </div>
        </div>
        
        </div>





    );

}

export default PricingMainPage;