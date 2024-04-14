import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";


const PricingMainPage = async () => {
        /*
        const currentUser = await getCurrentUser();
    
       
        const existingSubscription = await db.query.userSubscription.findFirst({
            where : (
                eq(users.id, currentUser.id)
            )
        })
        */
    
       
    
        return (
            <div>
                {/* 
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
                */}
            </div>
        );
    
}
 
export default PricingMainPage;