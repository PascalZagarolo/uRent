

import { CalendarCheck2, EyeIcon, TrendingUp, Truck, UserPlus2 } from "lucide-react";
import EventCalendar from "./(routes)/_components/calendar";
import getCurrentUser from "@/actions/getCurrentUser";
import BookingRequestRender from "./(routes)/_components/booking-request";
import { forEach } from "lodash";
import SidebarDashboard from "./_components/sidebar-dashboard";
import db from "@/db/drizzle";
import { and, eq, sql } from "drizzle-orm";
import { booking, bookingRequest, inserat } from "@/db/schema";
import MenuBar from "./_components/menu-bar";
import BreadCrumpPage from "./_components/bread-crump-page";
import TabSwitcher from "./_tabs/tab-switcher";
import getCurrentUserDashboard from "@/actions/dashboard/getCurrentUserDashboard";
import { stripe } from "@/lib/stripe";

interface MainPageProps {
    searchParams: {
        inseratId: string
    }
}

const DashboardPage = async ({
    searchParams
}: MainPageProps) => {

    const currentUser = await getCurrentUserDashboard();


    let views = 0;
    
    for(const inserat of currentUser.inserat) {
        views += inserat?.views
    }

    const existingInvoices = await stripe.invoices.list({
        customer: currentUser?.subscription?.stripe_customer_id
    })
    
    let retrievedSubscription;

    if (currentUser.subscription?.stripe_subscription_id) {
        retrievedSubscription = await stripe.subscriptions.retrieve(
            currentUser?.subscription?.stripe_subscription_id
        )
    }


    return (


        <div className="flex justify-center sm:py-8 sm:px-4">
            <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="min-h-screen">
                    <div>
                        <TabSwitcher
                            currentUser={currentUser as any}
                            existingInvoices = {JSON.parse(JSON.stringify(existingInvoices))}
                            retrievedSubscription = {JSON.parse(JSON.stringify(retrievedSubscription))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;