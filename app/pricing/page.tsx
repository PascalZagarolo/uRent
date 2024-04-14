import getCurrentUser from "@/actions/getCurrentUser";
import BuyOptions from "./_components/buy-options";
import RedeemCode from "./_components/redeem-code";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import ComparisonPlans from "./_components/comparison-plans";
import Faq from "./[inseratId]/_components/faq";


const PricingPage = async () => {

   
    
       const currentUser = await getCurrentUser();
    
       
        const existingSubscription = await db.query.userSubscription.findFirst({
            where : (
                eq(users.id, currentUser.id)
            )
        })
        
    
       
    
        return (
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
                        <Faq/>
                    </div>
                </div>
            </div>
        );
    }


export default PricingPage;