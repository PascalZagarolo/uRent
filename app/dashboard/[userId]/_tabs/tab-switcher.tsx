'use client'

import BreadCrumpPage from "../_components/bread-crump-page";
import MenuBar from "../_components/menu-bar";
import { userTable } from "@/db/schema";

import DashboardTab from "./dashboard-tab";
import ManageTab from "./booking-tab";
import InserateTab from "./inserate-tab";
import PaymentsTab from "./payments-tab";
import FavouritesTab from "./favourites-tab";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TabSwitcherProps {
    currentUser: typeof userTable.$inferSelect | any;
    existingInvoices: any;
    retrievedSubscription: any;
    existingPayments: any
}

const TabSwitcher = ({ currentUser, existingInvoices, retrievedSubscription, existingPayments }: TabSwitcherProps) => {
    const [usedInvoices, setUsedInvoices] = useState(existingInvoices ? existingInvoices : null);
    const [usedSubscription, setUsedSubscription] = useState(existingInvoices ? existingInvoices : null);
    const [usedPayments, setUsedPayments] = useState(existingPayments ? existingPayments : null);

    useEffect(() => {
        setUsedInvoices(existingInvoices);
        setUsedSubscription(retrievedSubscription);
        setUsedPayments(existingPayments);
    },[existingInvoices, retrievedSubscription, existingPayments]);

    const currentTab = useSearchParams().get("tab");

    const renderTab = () => {
        switch(currentTab) {
            case "dashboard":
                return <DashboardTab views={currentUser.views} foundInserate={currentUser.inserat} />
            case "manage":
                return <ManageTab currentUser={currentUser} searchParams={null} />
            case "inserate":
                return <InserateTab currentUser={currentUser} />
            case "payments":
                return <PaymentsTab 
                    currentUser={currentUser} 
                    existingInvoices={JSON.parse(JSON.stringify(usedInvoices))} 
                    retrievedSubscription={JSON.parse(JSON.stringify(usedSubscription))} 
                    existingPayments={JSON.parse(JSON.stringify(usedPayments))} 
                />
            case "favourites":
                return <FavouritesTab currentUser={currentUser} />
            default: 
                return <DashboardTab views={currentUser.views} foundInserate={currentUser.inserat} />
        }
    }

    const switchTab = (newTab: string) => {
        const params = new URLSearchParams("");
        params.set('tab', newTab);
        window.history.pushState(null, '', `?${params?.toString()}`);
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 z-10">
            <MenuBar
                    isBusiness={currentUser.isBusiness as any}
                    setCurrentTab={(tab) => switchTab(tab)}
                    currentTab={currentTab}
                />
            </div>
            
            {currentUser?.isBusiness && (
                <div className="px-6 pt-4">
                    <BreadCrumpPage 
                        setCurrentTab={(tab) => switchTab(tab)}
                        currentTab={currentTab}
                    />
                </div>
            )}
            
            <div className="flex-1">
                {renderTab()}
            </div>
        </div>
    );
}

export default TabSwitcher;