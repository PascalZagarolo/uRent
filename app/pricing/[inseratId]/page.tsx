import db from "@/db/drizzle";
import { inserat, inseratSubscription, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import RevenuePreview from "./_components/revenue";
import BuyOptions from "../_components/buy-options";
import ComparisonPlans from "../_components/comparison-plans";
import Faq from "./_components/faq";
import RedeemCode from "../_components/redeem-code";
import getCurrentUser from "@/actions/getCurrentUser";

const InseratPricingPage = async ({
    params
}: { params: { inseratId: string } }) => {

   const thisInserat = await db.query.inserat.findFirst({
    where : (
        eq(inserat.id, params.inseratId)
    
    )
   })

   const currentUser = await getCurrentUser();

   

    

    const existingSubscription = await db.query.inseratSubscription.findFirst({
        where : eq(inseratSubscription.inseratId, params.inseratId)
    })

    return (
        <div>
            <div className="w-full">
            <BuyOptions 
                thisInserat = {thisInserat}
                existingSubscription={existingSubscription}
                />
                <div className="mt-2">
                    <RedeemCode />
                </div>
                <div className="mt-4">
                    <RevenuePreview 
                    thisInserat={thisInserat}
                    />
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

export default InseratPricingPage;