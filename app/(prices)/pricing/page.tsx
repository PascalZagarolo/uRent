import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import BuyOptions from "./_components/buy-options";
import RedeemCode from "./_components/redeem-code";
import ComparisonPlans from "./_components/comparison-plans";
import Faq from "./_components/faq";



const PricingMainPage = async () => {

    


    const existingSubscription = await db.query.userSubscription.findFirst({
        where: (
            eq(users.id, "0648aba6-e152-464d-8746-77a65958aa12")
        )
    })

    const foundNotifications = await db.query.notification.findMany({
        where: (
            eq(users.id, "0648aba6-e152-464d-8746-77a65958aa12")
        )
    })


    return (


        <div>
            <div className="p-4 items-center">
            <div>
                <div className="w-full">
                    <BuyOptions
                        currentUserId={"0648aba6-e152-464d-8746-77a65958aa12"}
                        existingSubscription={existingSubscription}
                    />
                    <div className="mt-2">
                        <RedeemCode />
                    </div>
                    <div>
                        <ComparisonPlans />
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