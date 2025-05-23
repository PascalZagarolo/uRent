'use client'

import { cn } from "@/lib/utils";
import { BarChart3, CreditCard, Heart, ListChecks, TruckIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MenuBarProps {
    isBusiness: boolean
    currentTab?: string;
    setCurrentTab: (tab: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({
    isBusiness,
    currentTab,
    setCurrentTab
}) => {
    const menuItems = [
        {
            id: "dashboard",
            label: "Übersicht",
            icon: <BarChart3 className="h-4 w-4" />,
            showForBusiness: true
        },
        {
            id: "manage",
            label: "Buchungen",
            icon: <ListChecks className="h-4 w-4" />,
            showForBusiness: true
        },
        {
            id: "inserate",
            label: "Inserate",
            icon: <TruckIcon className="h-4 w-4" />,
            showForBusiness: true
        },
        {
            id: "payments",
            label: "Zahlungen",
            icon: <CreditCard className="h-4 w-4" />,
            showForBusiness: true
        },
        {
            id: "favourites",
            label: "Favoriten",
            icon: <Heart className="h-4 w-4" />,
            showForBusiness: false
        }
    ];

    const filteredMenuItems = menuItems.filter(item => 
        !item.showForBusiness || (item.showForBusiness && isBusiness)
    );

    return (
        <div className="w-full dark:bg-[#121212] bg-white  shadow-sm sticky top-0 z-10">
            {/* Desktop Menu */}
            <div className="max-w-screen-xl mx-auto">
                <div className="hidden sm:flex items-center h-12">
                    {filteredMenuItems.map((item) => {
                        const isActive = currentTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setCurrentTab(item.id)}
                                className={cn(
                                    "relative h-full flex items-center px-5 transition-all",
                                    isActive 
                                        ? "text-gray-900 dark:text-white" 
                                        : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={cn(
                                        "transition-colors",
                                        isActive ? "text-indigo-600 dark:text-indigo-400" : ""
                                    )}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </div>
                                
                                {isActive && (
                                    <motion.div 
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                                        layoutId="activeIndicator"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Mobile Menu */}
                <div className="flex sm:hidden justify-between px-4 h-12 items-center">
                    {filteredMenuItems.map((item) => {
                        const isActive = currentTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setCurrentTab(item.id)}
                                className={cn(
                                    "relative flex items-center justify-center transition-all",
                                    isActive 
                                        ? "text-indigo-600 dark:text-indigo-400" 
                                        : "text-gray-600 dark:text-gray-400"
                                )}
                            >
                                <span className="text-current">{item.icon}</span>
                                
                                {isActive && (
                                    <motion.div 
                                        className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400"
                                        layoutId="mobileActiveIndicator"
                                        initial={{ opacity: 0, x: "-50%" }}
                                        animate={{ opacity: 1, x: "-50%" }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MenuBar;