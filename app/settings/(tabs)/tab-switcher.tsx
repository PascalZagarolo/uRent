'use client';


import { userTable } from "@/db/schema";
import { useState } from "react";
import MenuBar from "../_components/settings-tabs";
import BreadCrumpSettings from "../_components/bread-crump-settings";
import AccountTab from "./account-tab";
import ViewTab from "./view-tab";
import PrivacyTab from "./privacy-tab";
import SafetyTab from "./safety-tab";

interface TabSwitcherProps {
    currentUser: typeof userTable.$inferSelect | any;
}

const TabSwitcher = ({ currentUser }: TabSwitcherProps) => {

    const [tab, setTab] = useState("account");

    const renderTab = () => {
        switch (tab) {
            case "account":
                return <AccountTab currentUser={currentUser} />;
            case "view":
                return <ViewTab />;
            case "privacy":
                return <PrivacyTab currentUser={currentUser} />;
            case "safety":
                return <SafetyTab currentUser={currentUser} />;
        }
    }

    return (
        <div>
            <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                <div>
                    <MenuBar 
                    currentValue = {tab}
                    setCurrentValue = {setTab}
                    />
                </div>
                <div className="min-h-screen">
                    <div>
                        <BreadCrumpSettings />
                    </div>
                    <div>
                        {renderTab()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabSwitcher;