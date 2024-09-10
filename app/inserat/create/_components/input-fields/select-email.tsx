'use client'


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inserat } from "@/db/schema";


import axios from "axios";
import { ChevronDown, MailCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { contactOptions, business } from '../../../../../db/schema';

interface SelectEmailProps {
    thisInserat : typeof inserat.$inferSelect;
    usedContactOptions : typeof contactOptions.$inferSelect;
}

const SelectEmail: React.FC<SelectEmailProps> = ({
  thisInserat,
  usedContactOptions
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(thisInserat.emailAddress || "");
    const [value, setValue] = useState("");

    const [isPrefill, setIsPrefill] = useState(false);

    const router = useRouter();

    const onSubmit = async () => {
        try {
          setIsLoading(true)
          const values = {
            emailAddress : currentAddress
          }

          await axios.patch(`/api/inserat/${thisInserat.id}`, values)
            .then(() => {
              toast.success("E-Mail wurde erfolgreich geändert")
              router.refresh();
            })
          

        } catch {
          toast.error("Fehler beim Versenden der E-Mail")
        } finally {
          setIsLoading(false);
        }
    } 

    

    const inputRef = React.useRef<HTMLInputElement>(null);

    const onPrefill = () => {
        if(!isPrefill) {
            setCurrentAddress(thisInserat?.user?.business?.email || thisInserat.user?.email);
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
             <p className=" mb-0.5 font-semibold"> Email-Addresse </p>
          </Label>
          <div className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1 sm:block hidden"> über welche Addresse möchtest du kontaktiert werden? </div>
          <div className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1 sm:hidden block"> deine benutzte E-Mail </div>
          <div className="flex flex-row items-center w-full justify-center">
          <Input placeholder="name@addresse.de"
          ref={inputRef}
          className="p-2.5 2xl:pr-16 xl:pr-4 rounded-md rounded-r-none text-sm border-none border-r-0 dark:bg-[#151515] 
          dark:focus-visible:ring-0 w-11/12 mt-2"
            disabled={isPrefill}
            value={currentAddress}
            onChange={(e) => { setCurrentAddress(e.target.value) }}
            
          />
          <Button className="mt-2 bg-[#0F0F0F] hover:bg-[#0F0F0F]  py-5 rounded-l-none" size="sm">
            <ChevronDown className="h-4 w-4 text-gray-200"/>
          </Button>
          </div>

        </div>
        
      </div>

      <div className="flex mt-2">
      <Checkbox 
      className="sm:h-4 sm:w-4 mr-2"
      onCheckedChange={onPrefill}
      />
      <Label className="sm:block hidden">
        Informationen aus Profil verwenden
      </Label>
      <Label className="sm:hidden block">
        aus dem Profil
      </Label>
    </div>


      <Button onClick={() => { onSubmit() }} className="mt-2 dark:bg-[#000000] dark:hover:bg-[#0b0b0b] dark:text-gray-100" //@ts-ignore
        disabled={!currentAddress || currentAddress === thisInserat.emailAddress}
      >
        <span className="">Email anzeigen</span> 
      </Button>

    </div>
     );
}
 
export default SelectEmail;