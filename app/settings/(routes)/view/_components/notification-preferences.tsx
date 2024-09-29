'use client'

import { setLocalStorage } from "@/actions/setLocalStorage";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { IoPush } from "react-icons/io5";

const Notificationpreferences = () => {

    const disableAllNotifications = () => {
        localStorage.setItem("disableAllNotifications", "true");
    }


    const [currentValues, setCurrentValues] = useState({
        disableAllNoti: localStorage.getItem("disableAllNotifications") === "true" ? false : true,
        disableConversationNoti: localStorage.getItem("disableConversationNoti") === "true" ? false : true,
        disableBookingNoti: localStorage.getItem("disableBookingNoti") === "true" ? false : true,
    })


    return (
        <div>
            <div>
                <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                    <IoMdNotifications className="mr-4" /> Benachrichtigungen & Popups  <p className="ml-4 text-lg"> </p>

                </h3>
            </div>
            <div className="flex md:flex-row flex-col w-full md:space-x-8 mt-4">
                <div className="md:w-1/3 w-full">
                    <div className="flex flex-col">
                        <h3 className="flex items-center flex-row gap-x-2">
                            <IoPush className="w-4 h-4" />
                            <span className="text-gray-200 font-semibold">Push-Benachrichtigungen</span>
                        </h3>
                        <p className="text-gray-200/60 text-xs">
                            Passe deine Benachrichtigungseinstellungen an. <br />
                            Aktiviere Push-Benachrichtigungen, um über neue Ereignisse wie Nachrichten, Buchungsanfragen und mehr informiert zu werden.
                        </p>
                    </div>

                </div>
                <div className="md:w-2/3 w-full flex flex-col space-y-4 mt-4 md:mt-0">
                    <div className="flex-row flex space-x-4">
                        <div>
                            <Switch
                                checked={
                                    currentValues.disableAllNoti
                                }
                                onCheckedChange={(checked) => { setCurrentValues({ ...currentValues, disableAllNoti: checked }) }}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-4">

                                <Label className="text-base">
                                    Push Benachrichtigung aktivieren
                                </Label>
                            </div>
                            <div>
                                <p className="text-gray-200/60 text-xs">
                                    Du erhältst Benachrichtigungen über neue Nachrichten, <br /> Buchungsanfragen und mehr. <br />
                                    Falls aktiviert, kannst du deine Präferenzen genauer bestimmen.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-row flex space-x-4">
                        <div>
                            <Switch />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-4">

                                <Label className="text-base">
                                    Konversationen
                                </Label>
                            </div>
                            <div>
                                <p className="text-gray-200/60 text-xs">
                                    Du erhältst Benachrichtigungen über neue Konversationen. <br /> und Nachrichten.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-row flex space-x-4">
                        <div>
                            <Switch />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-4">

                                <Label className="text-base">
                                    Buchungsanfragen
                                </Label>
                            </div>
                            <div>
                                <p className="text-gray-200/60 text-xs">
                                    Du erhältst Benachrichtigungen über neue Buchungsanfragen.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Notificationpreferences;