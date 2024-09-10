'use client'


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { inserat, userContactprofiles } from "@/db/schema";
import { cn } from "@/lib/utils";



import axios from "axios";
import { ChevronDown, MailCheckIcon, MailOpen, PhoneCall, PhoneCallIcon, PhoneForwarded, PhoneIncomingIcon, PinIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

interface PhoneNumberProps {
  thisInserat: typeof inserat.$inferSelect | any;
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({
  thisInserat
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(thisInserat.phoneNumber || "");
  const [modalOpen, setModalOpen] = useState(false);

  


  const [renderedNumbers, setRenderedNumbers] = useState<typeof userContactprofiles.$inferSelect[]>([]);

  useEffect(() => {
    const phoneNumbers = thisInserat?.user?.userContactprofiles.map((mail) => {
      if(mail.profileType === "PHONE") {
        return {
          id: mail.id,
          title: mail.title,
          content: mail.content,
        }
      }
    })
    setRenderedNumbers([...phoneNumbers]);
  },[])

  const [isPrefill, setIsPrefill] = useState(false);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const values = {
        phoneNumber: currentNumber
      }

      await axios.patch(`/api/inserat/${thisInserat.id}`, values)
        .then(() => {
          toast.success("Telefonnummer wurde erfolgreich geändert")
          router.refresh();
        })


    } catch {
      toast.error("Fehler beim Versenden der E-Mail")
    } finally {
      setIsLoading(false);
    }
  }

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onPrefill = (usedNumber : string) => {
    setCurrentNumber(usedNumber);
  }

  const isAlreadyChosen = (number: string) => {
    return number === currentNumber;
  }

  return (
    <div className="items-center w-full">
      <h3 className="text-md font-semibold items-center flex">
        <PhoneIncomingIcon className="h-4 w-4 mr-2" /> Telefonisch
      </h3>
      <div className="flex mt-4 ">

        <div className="  items-center  w-full">
          <Label className="flex justify-start items-center">
            <p className="mb-0.5  font-semibold"> Telefonnummer </p>
          </Label>
          <p className=" text-gray-800/50 text-xs dark:text-gray-100/80 mt-1"> wie möchtest du telefonisch erreicht werden? </p>
          <div className="flex flex-row items-center">
            <Input placeholder="+49 1234567890"
              type="tel"
              ref={inputRef}
              className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border-none rounded-r-none mt-2   dark:bg-[#151515] 
              input: justify-start dark:focus-visible:ring-0 w-full"
              disabled={isPrefill}
              value={currentNumber}
              onChange={(e) => { setCurrentNumber(e.target.value) }}
            />
            <Popover onOpenChange={(e) => {setModalOpen(e)}}
            open={modalOpen}
            >
              <PopoverTrigger asChild>
                <Button className="mt-2 bg-[#0F0F0F] hover:bg-[#0F0F0F]  py-5 rounded-l-none" size="sm">
                  <ChevronDown className="h-4 w-4 text-gray-200" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-[#171717] rounded-md border-none p-4 shadow-lg">
                <div className="font-semibold text-base">
                  Email-Addresse auswählen
                </div>
                <div className="flex flex-col h-full space-y-2 mt-2">
                  {renderedNumbers.length > 0 ? (
                    renderedNumbers.map((mail) => (
                      <Button
                      disabled={isAlreadyChosen(mail.content)}
                      key={mail.id}
                      variant="ghost"
                      className="justify-start text-left w-full p-3 py-6 rounded-md hover:bg-[#1E1E1E] transition-colors duration-200"
                      onClick={() => { onPrefill(mail.content) }}
                    >      
                       <div className="text-left w-full">
                          <div className={cn("text-sm text-gray-200 font-bold", mail.id == "1" && "text-indigo-800 underline" )}>
                            {mail.title}
                          </div>
                          <div className="mt-1 text-xs text-gray-200/60 font-medium">
                          {mail.content}
                          </div>
                        </div>
                      </Button>
                    ))
                  ) : (
                    <div className="text-xs text-gray-200/60">
                      Noch keine Emails hinzugefügt..
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

      </div>

      {/*
      <div className="flex mt-2">
        <Checkbox
          className="h-4 w-4 mr-2"
          onCheckedChange={onPrefill}
        />
        <Label>
          Informationen aus Profil verwenden
        </Label>
      </div>
      */}


      <Button onClick={() => { onSubmit() }} className="mt-8 dark:bg-[#000000] dark:hover:bg-[#0b0b0b] dark:text-gray-100" //@ts-ignore
        disabled={!currentNumber || currentNumber === thisInserat.phoneNumber || !thisInserat.user?.business?.telephone_number}
      >
        <span className="">Telefonnr. anzeigen</span>
      </Button>

    </div>
  );
}

export default PhoneNumber;