'use client'


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inserat, userContactprofiles } from "@/db/schema";


import axios from "axios";
import { ChevronDown, MailCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { contactOptions, business } from '../../../../../db/schema';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { login } from "@/actions/login";
import { is } from 'drizzle-orm';
import { cn } from "@/lib/utils";
import { profile } from 'console';
import LetterRestriction from "@/components/letter-restriction";

interface SelectEmailProps {
  thisInserat: typeof inserat.$inferSelect | any;
  usedContactOptions: typeof contactOptions.$inferSelect | any;
}

const SelectEmail: React.FC<SelectEmailProps> = ({
  thisInserat,
  usedContactOptions
}) => {


  const [currentAddress, setCurrentAddress] = useState(thisInserat.emailAddress || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isPrefill, setIsPrefill] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const loginMail = {
    id: "1",
    title: "Anmelde-Email",
    content: thisInserat.user?.email,
  }


  const [renderedMails, setRenderedMails] = useState<typeof userContactprofiles.$inferSelect[]>([]);

  useEffect(() => {
    console.log(thisInserat?.user?.userContactprofiles);

    // Filter to get only the EMAIL profiles
    const mails = thisInserat?.user?.userContactprofiles?.filter((mail) => mail?.profileType === "EMAIL");

    console.log(mails);

    // Set the state with the filtered emails and loginMail
    setRenderedMails([...(mails || []), loginMail]);
  }, []);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const values = {
        emailAddress: currentAddress
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

  const onPrefill = (usedMail: string) => {
    setCurrentAddress(usedMail);
    setModalOpen(false);
  }

  const isAlreadyChosen = (mail: string) => {
    return mail === currentAddress;
  }

  return (
    <div className="items-center w-full">
      <h3 className="text-md font-semibold items-center flex">
        <MailCheckIcon className="h-4 w-4 mr-2" /> Mail
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
            <Popover onOpenChange={(e) => { setModalOpen(e) }}
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
                  {renderedMails?.length > 0 ? (
                    renderedMails?.map((mail) => (
                      <Button
                        disabled={isAlreadyChosen(mail?.content)}
                        key={mail?.id}
                        variant="ghost"
                        className="justify-start text-left w-full p-3 py-6 rounded-md hover:bg-[#1E1E1E] transition-colors duration-200"
                        onClick={() => { onPrefill(mail?.content) }}
                      >
                        <div className="text-left w-full">
                          <div className={cn("text-sm text-gray-200 font-bold", mail?.id == "1" && "text-indigo-800 underline")}>
                            {mail?.title}
                          </div>
                          <div className="mt-1 text-xs text-gray-200/60 font-medium">
                            {mail?.content}
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
          <div className="ml-auto flex justify-end">
            <LetterRestriction limit={40} currentLength={currentAddress.length || 0} />
          </div>
        </div>

      </div>

      {/* 
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
      */}


      <Button onClick={() => { onSubmit() }} className=" dark:bg-[#000000] dark:hover:bg-[#0b0b0b] dark:text-gray-100 mt-3" //@ts-ignore
        disabled={!currentAddress || currentAddress === thisInserat.emailAddress}
      >
        <span className="">Email anzeigen</span>
      </Button>

    </div>
  );
}

export default SelectEmail;