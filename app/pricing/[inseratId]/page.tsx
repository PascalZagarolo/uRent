import db from "@/db/drizzle";
import { inserat, } from "@/db/schema";
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

   

    

   

    return (
        <div>
            Hier ist nichts..
        </div>
    );
}

export default InseratPricingPage;