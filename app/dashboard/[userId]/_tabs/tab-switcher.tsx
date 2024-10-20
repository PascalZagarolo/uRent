'use client'

import getCurrentUser from "@/actions/getCurrentUser";
import BreadCrumpPage from "../_components/bread-crump-page";
import MenuBar from "../_components/menu-bar";
import { userTable } from "@/db/schema";
import { useState } from "react";
import DashboardTab from "./dashboard-tab";
import ManageTab from "./booking-tab";
import InserateTab from "./inserate-tab";
import PaymentsTab from "./payments-tab";
import FavouritesTab from "./favourites-tab";
import { useSearchParams } from "next/navigation";

interface TabSwitcherProps {
    currentUser : typeof userTable.$inferSelect | any;
    existingInvoices : any;
    retrievedSubscription : any;
}

const TabSwitcher = ({ currentUser, existingInvoices, retrievedSubscription } : TabSwitcherProps) => {

   

    const currentTab = useSearchParams().get("tab");

    const renderTab = () => {
        switch(currentTab) {
            case "dashboard":
                return <DashboardTab views = {currentUser.views} foundInserate = {currentUser.inserat} />
            case "manage":
                return <ManageTab currentUser = {currentUser} searchParams={null} />
            case "inserate":
                return <InserateTab currentUser = {currentUser} />
            case "payments":
                return <PaymentsTab currentUser = {currentUser} 
                existingInvoices = {JSON.parse(JSON.stringify(existingInvoices))} retrievedSubscription={JSON.parse(JSON.stringify(retrievedSubscription))} />
            case "favourites":
                return <FavouritesTab currentUser = {currentUser} />
            default : 
                return <DashboardTab views = {currentUser.views} foundInserate = {currentUser.inserat} />
        }
    }

    

    const switchTab = (newTab : string) => {
        const params = new URLSearchParams("");
        params.set('tab', newTab);
        window.history.pushState(null, '', `?${params?.toString()}`)
    }

    return (
        <div>
            <div>
                <MenuBar
                    isBusiness={currentUser.isBusiness as any}
                    setCurrentTab={(tab) => switchTab(tab)}
                    currentTab={currentTab}
                />
                <div>
                    <BreadCrumpPage 
                    setCurrentTab={(tab) => switchTab(tab)}
                    currentTab={currentTab}
                    />
                </div>
                <div>
                    {renderTab()}
                </div>
            </div>
        </div>
    );
}

export default TabSwitcher;