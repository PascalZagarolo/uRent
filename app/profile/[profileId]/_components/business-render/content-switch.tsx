'use client';

import { userTable } from '@/db/schema';
import { useState } from 'react';
import Imprint from './sections/imprint';
import OpeningHours from './sections/opening-hours';
import Content from './sections/content';
import StandortRender from './sections/standort';




interface ContentSwitchProps {
    thisUser : typeof userTable.$inferSelect | any;
    ownProfile : boolean;
    currentUser : typeof userTable.$inferSelect;
}

const ContentSwitch = ({ ownProfile, thisUser, currentUser } : ContentSwitchProps) => {
    // List of existing tabs
    const existingTabs = [
        { label: "Inhalte", key: "content" },
        { label: "Standort", key: "location" },
        { label: "Öffnungszeiten", key: "opening_hours" },
        { label: "Impressum", key: "imprint" },
    ];

    // State to track the active tab
    const [activeTab, setActiveTab] = useState("content");

    return (
        <div className="w-full">
            <div className="">
                <div className="flex justify-evenly md:space-x-4 py-4 rounded-md bg-[#16161f] border border-indigo-900/30">
                    {existingTabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 rounded-md transition-all duration-300 md:text-base text-xs relative
                                ${activeTab === tab.key
                                    ? "text-white bg-gradient-to-r from-indigo-600/20 to-indigo-700/20"
                                    : "text-gray-400 hover:text-white hover:bg-indigo-900/20"
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.key && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
                <div className="mt-4">
                    {
                        {   
                            "content" : <Content releasedContent={thisUser?.inserat} username={thisUser?.name} currentUser={currentUser} />,
                            "location" : <StandortRender ownProfile={ownProfile} businessId={thisUser?.businessId} foundAddress={thisUser?.business?.businessAddresses}  />,
                            "imprint" : <Imprint ownProfile={ownProfile} user={thisUser} />,
                            "opening_hours" : <OpeningHours ownProfile={ownProfile} thisBusiness={thisUser?.business} />
                        }[activeTab]
                    }
                </div>
            </div>
        </div>
    );
};

export default ContentSwitch;
