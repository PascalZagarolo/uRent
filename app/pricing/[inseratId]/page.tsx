import db from "@/db/drizzle";
import { inserat, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import RevenuePreview from "./_components/revenue";
import BuyOptions from "../_components/buy-options";
import ComparisonPlans from "../_components/comparison-plans";
import Faq from "./_components/faq";

const InseratPricingPage = async ({
    params
}: { params: { inseratId: string } }) => {

   const thisInserat = await db.query.inserat.findFirst({
    where : (
        eq(inserat.id, params.inseratId)
    
    )
   })

    return (
        <div>
            <div className="w-full">
                <BuyOptions 
                inseratId={params.inseratId}
                />
                <div>
                    <RevenuePreview 
                    thisInserat={thisInserat}
                    />
                </div>
                <div>
                    <ComparisonPlans />
                </div>
                <div className="mt-8 pb-16">
                    <Faq/>
                </div>
            </div>
        </div>
    );
}

export default InseratPricingPage;