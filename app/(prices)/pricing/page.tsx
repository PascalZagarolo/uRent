import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { userTable, userSubscription, notification } from "@/db/schema";
import { eq } from "drizzle-orm";
import BuyOptions from "./_components/buy-options";
import RedeemCode from "./_components/redeem-code";
import ComparisonPlans from "./_components/comparison-plans";
import Faq from "./_components/faq";
import Footer from "@/app/(dashboard)/_components/footer";



const PricingMainPage = async () => {

    
    const currentUser = await getCurrentUser();

    const existingSubscription = await db.query.userSubscription.findFirst({
        where: (
            eq(userSubscription.userId, currentUser?.id)
        )
    })

    console.log(existingSubscription)

    const foundNotifications = await db.query.notification.findMany({
        where: (
            eq(notification.userId, currentUser?.id)
        )
    })


    return (

        <div>
            <div className="p-4 items-center">
            <div>
                {existingSubscription && (
                    <div className="text-md font-semibold flex items-center gap-x-2">
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
                    <div className="mt-2">
                    <RedeemCode />
                    </div>
                    <div>
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