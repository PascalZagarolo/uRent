'use client'


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import { Inserat, User } from "@prisma/client";
import axios from "axios";
import { MailCheckIcon, MailOpen, PinIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

interface SelectEmailProps {
    inserat : Inserat & { user : User}
}

const SelectEmail: React.FC<SelectEmailProps> = ({
    inserat
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(inserat.emailAddress || "");
    const [value, setValue] = useState("");

    const [isPrefill, setIsPrefill] = useState(false);

    const onSubmit = () => {
        try {
          setIsLoading(true)
          const values = {
            emailAddress : currentAddress
          }

          axios.patch(`/api/inserat/${inserat.id}`, values);


        } catch {
          toast.error("Fehler beim Versenden der E-Mail")
        } finally {
          setIsLoading(false);
        }
    } 

    const inputRef = React.useRef<HTMLInputElement>(null);

    const onPrefill = () => {
        if(!isPrefill) {
            setCurrentAddress(inserat.user.email);
            setIsPrefill(true);
        } else if(isPrefill) {
            setCurrentAddress("");
            setIsPrefill(false);
        }
    }

    return ( 
        <div className="items-center w-full">
       <h3 className="text-md font-semibold items-center flex">
          <MailCheckIcon className="h-4 w-4 mr-2"/> Mail
        </h3>
      <div className="flex mt-4 ">
       
        <div className="  items-center  w-full">
          <Label className="flex justify-start items-center">
            <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Email-Addresse </p>
          </Label>
          <p className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1"> über welche Addresse möchtest du kontaktiert werden? </p>
          <Input placeholder="name@addresse.de"
          ref={inputRef}
            className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2  border-black dark:bg-[#151515] 
            input: justify-start dark:focus-visible:ring-0 w-full"
            disabled={isPrefill}
            value={currentAddress}
            onChange={(e) => { setCurrentAddress(e.target.value) }}
            
          />

        </div>
        
      </div>

      <div className="flex mt-2">
      <Checkbox 
      className="h-4 w-4 mr-2"
      onCheckedChange={onPrefill}
      />
      <Label>
        Informationen aus Profil verwenden
      </Label>
    </div>


      <Button onClick={() => { onSubmit() }} className="mt-2 dark:bg-[#000000] dark:text-gray-100" //@ts-ignore
        disabled={!currentAddress || currentAddress === inserat.emailAddress}
      >
        <span className="">Email-Bestätigen</span> 
      </Button>

    </div>
     );
}
 
export default SelectEmail;