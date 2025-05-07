import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";
import BuyOptions from "./_components/buy-options";
import RedeemCode from "./_components/redeem-code";
import ComparisonPlans from "./_components/comparison-plans";
import Faq from "./_components/faq";
import PricingHeader from "./_components/pricing-header";
import Link from "next/link";

const PricingMainPage = async () => {


    const currentUser = await getCurrentUser();



    let existingSubscription = await db.query.userSubscription.findFirst({
        where: (
            eq(userSubscription.userId, currentUser?.id)
        )
    })

    if (existingSubscription) {
        existingSubscription.stripe_current_period_end > new Date() ? existingSubscription = existingSubscription : existingSubscription = null;
    }



    return (

        <div className="relative min-h-screen overflow-x-hidden">
            {/* Animated Background */}
            <div className="pricing-bg-animated">
                <div className="pricing-bg-shape" style={{ top: '10%', left: '5%', width: '300px', height: '300px', background: '#6366f1' }} />
                <div className="pricing-bg-shape" style={{ top: '60%', left: '70%', width: '400px', height: '400px', background: '#a5b4fc' }} />
                <div className="pricing-bg-shape" style={{ top: '40%', left: '40%', width: '200px', height: '200px', background: '#818cf8' }} />
            </div>
            <div className="sm:p-8 p-2 max-w-5xl mx-auto items-center">
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
            {/* Sticky/Floating CTA for mobile */}
            <div className="fixed bottom-4 left-0 w-full flex justify-center z-50 md:hidden pointer-events-none">
                <Link href="#" className="pointer-events-auto bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-bold px-8 py-4 rounded-full shadow-xl border-2 border-indigo-400 animate-fade-in hover:scale-105 transition-transform">
                    Jetzt starten
                </Link>
            </div>
        </div>





    );

}

export default PricingMainPage;