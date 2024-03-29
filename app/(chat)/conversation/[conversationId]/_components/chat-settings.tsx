'use client'

import { Switch } from "@/components/ui/switch";
import { SettingsIcon } from "lucide-react";


const ChatSettings = () => {
    return ( 
        <div className="">
            <h1 className="flex text-base font-semibold p-4 bg-white  dark:bg-[#080808]">
                <SettingsIcon className="mr-2"/> Chat-Einstellungen
            </h1>
            <div className="mt-2">
                <div className="p-4 rounded-lg flex bg-white font-bold dark:bg-[#080808] ">
                    <Switch className="mr-2"/>
                    <div className="ml-2">
                        Person blockieren
                    </div>
                </div>
            </div>
            <div className="mt-2 items-center">
                <div className="p-4 rounded-lg  flex bg-white font-medium dark:bg-[#080808] ">
                    <Switch className="mr-2"/>
                    <div className="text-sm ml-2">
                        Konversation stummschalten
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ChatSettings;