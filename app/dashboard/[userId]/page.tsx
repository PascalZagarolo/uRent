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

    let existingInvoices = {};
    let retrievedSubscription = {};
    let existingPayments = {};

    try {
        existingInvoices = currentUser?.subscription?.stripe_customer_id ?  await stripe.invoices.list({
            customer: currentUser?.subscription?.stripe_customer_id
        }) : null
        
        existingPayments = currentUser?.subscription?.stripe_customer_id ? await stripe.paymentIntents.list({
            customer: currentUser?.subscription?.stripe_customer_id ?? ""
        }) : null
    
        retrievedSubscription;
    
        if (currentUser.subscription?.stripe_subscription_id) {
            retrievedSubscription = await stripe.subscriptions.retrieve(
                currentUser?.subscription?.stripe_subscription_id ?? ""
            )
        }
    } catch(e : any) {
        
    }

    return (
        <div className="w-full min-h-screen">
            <div className="w-full bg-white/50 dark:bg-[#1c1c1c]/50 backdrop-blur-sm">
                <TabSwitcher
                    currentUser={currentUser as any}
                    existingInvoices={JSON?.parse(JSON?.stringify(existingInvoices))}
                    retrievedSubscription={JSON?.parse(JSON?.stringify(retrievedSubscription ? retrievedSubscription : null))}
                    existingPayments={JSON?.parse(JSON?.stringify(existingPayments))}
                />
            </div>
        </div>
    );
}

export default DashboardPage;