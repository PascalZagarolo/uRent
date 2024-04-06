import db from "@/db/drizzle";
import { inserat, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import RevenuePreview from "./_components/revenue";

const InseratPricingPage = async ({
    params
}: { params: { inseratId: string } }) => {

   

    return (
        <div>
            <div className="w-full">
            
            </div>
        </div>
    );
}

export default InseratPricingPage;