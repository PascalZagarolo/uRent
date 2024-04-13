import { MdManageSearch } from "react-icons/md";
import BreadCrumpPage from "../../_components/bread-crump-page";
import MenuBar from "../../_components/menu-bar";
import { CardStackPlusIcon } from "@radix-ui/react-icons";
import { BiCreditCardAlt } from "react-icons/bi";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { inserat, inseratSubscription } from "@/db/schema";
import getCurrentUser from "@/actions/getCurrentUser";
import { render } from '@react-email/components';
import SubscriptionsRenderList from "./_components/subscriptions-render-list";

const PaymentsPage = async () => {

    const currentUser = await getCurrentUser();

    const signedSubscriptions = await db.query.inserat.findMany({
        where : (
            eq(inserat.userId, currentUser.id)
        ), with : {
            inseratSubscription : true
        }
    })

    const renderedSubscriptions = signedSubscriptions.filter((subscription) => subscription?.inseratSubscription !== null)

    

    return ( 
        <div className="flex justify-center py-8 px-4  ">
            
            <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="min-h-screen w-full">
                    <div>
                        <MenuBar />
                        <div>
                            <BreadCrumpPage />
                        </div>
                    </div>
                    <div className="p-4 mt-4 w-full rounded-lg ">
                        <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center w-full">
                            <div className="w-2/3 flex">
                                <BiCreditCardAlt className="mr-4" /> Zahlungsverkehr
                            </div>
                        </h3>
                        <p className="text-xs dark:text-gray-200/60 ">
                            Behalte den Überblick über deine Zahlungen und Abonnements.
                            <br/> Hier kannst du deine Abonnements verwalten, einsehen und upgraden.
                            </p>
                            <div className="mt-8">
                                <SubscriptionsRenderList 
                                subscriptions={renderedSubscriptions}
                                />
                            </div>
                    </div>
                    </div>
            </div>
        </div>
     );
}
 
export default PaymentsPage;