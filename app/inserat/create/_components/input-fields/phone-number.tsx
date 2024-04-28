'use client'


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inserat } from "@/db/schema";



import axios from "axios";
import { MailCheckIcon, MailOpen, PhoneCall, PhoneCallIcon, PhoneForwarded, PhoneIncomingIcon, PinIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

interface PhoneNumberProps {
  thisInserat : typeof inserat.$inferSelect
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({
  thisInserat
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [currentNumber, setCurrentNumber] = useState(thisInserat.phoneNumber || "");
    const [value, setValue] = useState("");

    const [isPrefill, setIsPrefill] = useState(false);

    const router = useRouter();

    const onSubmit = () => {
        try {
          setIsLoading(true)
          const values = {
            phoneNumber : currentNumber
          }

          axios.patch(`/api/inserat/${thisInserat.id}`, values);
          setTimeout(() => {
            router.refresh();
          }, 250)

        } catch {
          toast.error("Fehler beim Versenden der E-Mail")
        } finally {
          setIsLoading(false);
        }
    } 

    const inputRef = React.useRef<HTMLInputElement>(null);

    const onPrefill = () => {
        if(!isPrefill) {
            if(thisInserat.user?.business?.telephone_number) {
              setCurrentNumber(thisInserat.user.business.telephone_number);
            }
            setIsPrefill(true);
        } else if(isPrefill) {
            setCurrentNumber("");
            setIsPrefill(false);
        }
    }

    return ( 
        <div className="items-center w-full">
       <h3 className="text-md font-semibold items-center flex">
          <PhoneIncomingIcon className="h-4 w-4 mr-2"/> Telefonisch
        </h3>
      <div className="flex mt-4 ">
       
        <div className="  items-center  w-full">
          <Label className="flex justify-start items-center">
            <p className="mb-0.5  font-semibold"> Telefonnummer </p>
          </Label>
          <p className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1"> wie möchtest du telefonisch erreicht werden? </p>
          <Input placeholder="+49 1234567890"
          type="tel"
          ref={inputRef}
            className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2  border-black dark:bg-[#151515] 
            input: justify-start dark:focus-visible:ring-0 w-full"
            disabled={isPrefill}
            value={currentNumber}
            onChange={(e) => { setCurrentNumber(e.target.value) }}
            
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


      <Button onClick={() => { onSubmit() }} className="mt-2 dark:bg-[#000000] dark:hover:bg-[#0b0b0b] dark:text-gray-100" //@ts-ignore
        disabled={!currentNumber || currentNumber === thisInserat.phoneNumber || !thisInserat.user?.business?.telephone_number}
      >
        <span className="">Telefonnr. anzeigen</span> 
      </Button>

    </div>
     );
}
 
export default PhoneNumber;