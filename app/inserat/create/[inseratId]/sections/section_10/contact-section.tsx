'use client'

import { inserat } from "@/db/schema";

import { useEffect, useState } from "react";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightCircleIcon } from "lucide-react";
import toast from "react-hot-toast";


import axios from "axios";
import { RenderErrorMessage } from "../_components/render-messages";
import SelectLocationCreation from "./location";
import SelectEmailCreation from "./email";
import PhoneNumberCreation from "./phone-number";



interface ContactSectionProps {
    thisInserat: typeof inserat.$inferSelect | any;
    currentSection: number;
    changeSection: (value: number) => void;
}

const ContactSection = ({ thisInserat, currentSection, changeSection }: ContactSectionProps) => {

    const [currentLocation, setCurrentLocation] = useState<string | null>(thisInserat?.address?.locationString ? thisInserat?.address?.locationString : null);
    const [currentZipCode, setCurrentZipCode] = useState<string | null>(thisInserat?.address?.postalCode ? thisInserat?.address?.postalCode : null);
    const [currentEmail, setCurrentEmail] = useState<string | null>(thisInserat?.emailAddress ? thisInserat?.emailAddress : null);
    const [currentNumber, setCurrentNumber] = useState<string | null>(thisInserat?.phoneNumber ? thisInserat?.phoneNumber : null);

    const onSave = async () => {
        try {

            const values1 = {
                emailAddress : currentEmail,
                phoneNumber : currentNumber,
            }

            await axios.patch(`/api/inserat/${thisInserat.id}`, values1);

            const values2 = {
                locationString : currentLocation,
                postalCode : currentZipCode,
            }
            await axios.patch(`/api/inserat/${thisInserat.id}/address`, values2);
            changeSection(currentSection + 1);
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Speichern der Änderungen");
        }
    }

    const onPrevious = () => {
        changeSection(currentSection - 1);
    }

    const [error, setError] = useState<{ errorField: string; errorText: string } | null>(null);








    return (
        <>
            <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold">
                    Kontaktdaten
                    <p className="text-xs text-gray-200/60 font-medium text-left">
                        Gebe an wie potentielle Mieter dich außerhalb des uRent Chatsystems kontaktieren können. <br />
                        Kontaktdaten werden öffentlich in deinem Inserat angezeigt.
                    </p>
                </h3>
                <div className="mt-4">
                    <SelectLocationCreation
                        usedContactOptions={thisInserat.contactOptions}
                        thisInserat={thisInserat}
                        thisAddressComponent={thisInserat.address}
                        currentAddress={currentLocation}
                        setCurrentAddress={setCurrentLocation}
                        currentZipCode={currentZipCode}
                        setCurrentZipCode={setCurrentZipCode}
                    />

                </div>
                <div className="mt-4">
                    <SelectEmailCreation
                        thisInserat={thisInserat}
                        currentValue={currentEmail}
                        setCurrentValue={setCurrentEmail}
                    />
                </div>
                <div className="">
                    <PhoneNumberCreation thisInserat={thisInserat} currentValue={currentNumber} setCurrentValue={(value) => setCurrentNumber(value)} />
                </div>

            </div>
            <div className="mt-auto flex flex-col">
                <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline cursor-pointer">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zu deiner Inseratsübersicht
                </span>
                <div className="grid grid-cols-2 mt-2">
                    <Button className="" variant="ghost" onClick={onPrevious}>
                        Zurück
                    </Button>
                    <Button className="bg-indigo-800 text-gray-200 w-full  hover:bg-indigo-900 hover:text-gray-300"
                        onClick={onSave}
                        disabled={error != undefined}
                    >
                        Fortfahren <ArrowRightCircleIcon className="text-gray-200 w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ContactSection;