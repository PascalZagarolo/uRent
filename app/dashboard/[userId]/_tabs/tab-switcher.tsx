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

interface TabSwitcherProps {
    currentUser : typeof userTable.$inferSelect | any;
    existingInvoices : any;
    retrievedSubscription : any;
}

const TabSwitcher = ({ currentUser, existingInvoices, retrievedSubscription } : TabSwitcherProps) => {

    const [tab, setTab] = useState("dashboard");

    const renderTab = () => {
        switch(tab) {
            case "dashboard":
                return <DashboardTab views = {currentUser.views} inseratLength = {currentUser.inserat.length} />
            case "manage":
                return <ManageTab currentUser = {currentUser} searchParams={null} />
            case "inserate":
                return <InserateTab currentUser = {currentUser} />
            case "payments":
                return <PaymentsTab currentUser = {currentUser} existingInvoices = {existingInvoices} retrievedSubscription={retrievedSubscription} />
            case "favourites":
                return <FavouritesTab currentUser = {currentUser} />
        }
    }

    

    return (
        <div>
            <div>
                <MenuBar
                    isBusiness={currentUser.isBusiness as any}
                    setCurrentTab={(tab) => setTab(tab)}
                    currentTab={tab}
                />
                <div>
                    <BreadCrumpPage />
                </div>
                <div>
                    {renderTab()}
                </div>
            </div>
        </div>
    );
}

export default TabSwitcher;