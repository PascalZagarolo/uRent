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
            <div className="md:px-8 px-4">
                
                <div className="flex justify-evenly md:space-x-4 py-4 rounded-md ">
                    {existingTabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 rounded-t-md transition-all duration-300 md:text-base text-xs ${
                                activeTab === tab.key
                                    ? "text-white border-b-2 border-indigo-800 "
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
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
    );
};

export default ContentSwitch;
