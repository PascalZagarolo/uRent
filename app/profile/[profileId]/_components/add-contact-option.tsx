'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ContactIcon, Globe2, MailCheck, MapPin, Settings2 } from "lucide-react";
import { useState } from "react";


const AddContactOption = () => {

    const [emailEnabled, setEmailEnabled] = useState(false);
    const [websiteEnabled , setWebsiteEnabled] = useState(false);
    const [addressEnabled , setAddressEnabled] = useState(false);

    return ( 
        <Dialog>
            <DialogTrigger asChild className="mt-2">
            
                <Button className="bg-gray-200 w-full" variant="ghost">
                    <Settings2 className="mr-2" /> Kontaktmöglichkeiten hinzufügen
                </Button>
            
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                  <div className="flex">
                  <ContactIcon className="mr-2"/> <p className="text-lg font-semibold"> Kontaktmöglichkeiten verwalten </p>
                  </div>
                </DialogHeader>
                <div className="">
                    <div className="mt-4">
                        <div className="flex items-center font-semibold"><MailCheck className="mr-2"/> E-Mail 
                        <Switch className="ml-auto" onClick={() => setEmailEnabled(!emailEnabled)} /> </div>
                        {emailEnabled && (
                            <Input className="mt-2 "/>
                        )}
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center font-semibold"> <Globe2 className="mr-2"/>  Website 
                        <Switch className="ml-auto" onClick={() => setWebsiteEnabled(!websiteEnabled)} /> </div>
                        {websiteEnabled && (
                            <Input className="mt-2 "/>
                        )}
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center font-semibold"> <MapPin className="mr-2"/>  Addresse 
                        <Switch className="ml-auto" onClick={() => setAddressEnabled(!addressEnabled)} /> </div>
                        {addressEnabled && (
                            <Input className="mt-2 "/>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default AddContactOption;