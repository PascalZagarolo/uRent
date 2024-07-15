'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateNotificationUnauthorized from "./create-notification-unauthorized";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { notificationUnauthorized } from "@/db/schema";
import ExistingNotifications from "./existing-notifications";


interface TabSwitchNotificationsProps {
    foundNotifications : typeof notificationUnauthorized.$inferSelect[];
}

const TabSwitchNotifications : React.FC<TabSwitchNotificationsProps> = ({
    foundNotifications
}) => {

    const [currentTab, setCurrentTab] = useState('create')

    return (
        <div>
            <Tabs defaultValue="create">
                <TabsList className="grid w-full grid-cols-2 bg-[#0F0F0F]" >
                    <TabsTrigger value="create"
                    onClick={() => setCurrentTab('create')}
                    className={cn(currentTab === 'create' ? "bg-[#0F0F0F]" : "bg-[#1c1c1c]")}
                    >Benachrichtigung erstellen</TabsTrigger>
                    <TabsTrigger value="existing"
                    onClick={() => setCurrentTab('existing')}
                    className={cn(currentTab === 'existing' ? "bg-[#0F0F0F]" : "bg-[#1c1c1c]")}
                    >Bereits erstellte Benachrichtigungen ({foundNotifications.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="create">
                    <CreateNotificationUnauthorized />
                </TabsContent>
                <TabsContent value="existing">
                <ExistingNotifications 
                foundNotifications={foundNotifications}
                />
                </TabsContent>
            </Tabs>
        </div>
    );
}
export default TabSwitchNotifications;