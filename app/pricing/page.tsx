import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import BuyOptions from "./_components/buy-options";
import RedeemCode from "./_components/redeem-code";
import ComparisonPlans from "./_components/comparison-plans";
import Faq from "./_components/faq";
import HeaderLogo from "../(dashboard)/_components/header-logo";


const PricingMainPage = async () => {
  
    const currentUser = await getCurrentUser();
 
   
    const existingSubscription = await db.query.userSubscription.findFirst({
        where : (
            eq(users.id, currentUser.id)
        )
    })
   
    const foundNotifications = await db.query.notification.findMany({
        where : (
            eq(users.id, currentUser.id)
        )
    })


    return (

        <div>
            <div>
                <div className="relative top-0 w-full z-50">
                    <HeaderLogo
                        currentUser={currentUser}
                        foundNotifications={foundNotifications}
                    />
                </div>
                <div className="flex justify-center p-8 bg-[#404040]/10">
                    <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                        <div className="  min-h-screen">


                            <div className="p-4 mt-4  rounded-lg ">
                                <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center justify-center">
                                    uRent Business
                                </h3>
                                <p className="text-sm dark:text-gray-200/70  flex justify-center">
                                    Fange noch heute an. Vermiete, erreiche und verwalte deine Fahrzeuge so einfach wie noch nie.
                                </p>
                            </div>
                            <div className="p-4 items-center">
                                <div>

                                    <div className="w-full">
                                        <BuyOptions
                                            currentUserId={currentUser.id}
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
                    </div>
                </div>
            </div>

        </div>




    );

}

export default PricingMainPage;