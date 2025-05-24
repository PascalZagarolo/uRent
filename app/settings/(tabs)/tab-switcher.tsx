'use client';

import { userTable } from "@/db/schema";
import { useState } from "react";
import MenuBar from "../_components/settings-tabs";
import BreadCrumpSettings from "../_components/bread-crump-settings";
import AccountTab from "./account-tab";
import ViewTab from "./view-tab";
import PrivacyTab from "./privacy-tab";
import SafetyTab from "./safety-tab";
import { Settings, User, Eye, Lock, Shield } from "lucide-react";

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
        <div className="w-full">
            <div className="w-full rounded-lg overflow-hidden bg-white dark:bg-[#1c1c1c] shadow-sm">
                <div className="border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center px-4">
                        <button
                            onClick={() => setTab("account")}
                            className={`py-4 px-4 font-medium text-sm relative ${
                                tab === "account"
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                        >
                            <span className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                Account
                            </span>
                            {tab === "account" && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                            )}
                        </button>
                        
                        <button
                            onClick={() => setTab("view")}
                            className={`py-4 px-4 font-medium text-sm relative ${
                                tab === "view"
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                        >
                            <span className="flex items-center">
                                <Eye className="w-4 h-4 mr-2" />
                                Ansicht
                            </span>
                            {tab === "view" && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                            )}
                        </button>
                        
                        <button
                            onClick={() => setTab("privacy")}
                            className={`py-4 px-4 font-medium text-sm relative ${
                                tab === "privacy"
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                        >
                            <span className="flex items-center">
                                <Lock className="w-4 h-4 mr-2" />
                                Privatsphäre
                            </span>
                            {tab === "privacy" && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                            )}
                        </button>
                        
                        <button
                            onClick={() => setTab("safety")}
                            className={`py-4 px-4 font-medium text-sm relative ${
                                tab === "safety"
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                        >
                            <span className="flex items-center">
                                <Shield className="w-4 h-4 mr-2" />
                                Sicherheit
                            </span>
                            {tab === "safety" && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                            )}
                        </button>
                    </div>
                </div>
                
                <div className="px-6 py-6">
                    <BreadCrumpSettings />
                    <div className="mt-4">
                        {renderTab()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabSwitcher;