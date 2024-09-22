'use client'

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { userTable } from "@/db/schema";
import { User2Icon } from "lucide-react";
import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AccountPrivacyProps {
    thisUser : typeof userTable.$inferSelect;
}

const AccountPrivacy : React.FC<AccountPrivacyProps> = ({
    thisUser
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const shareRealName = async (e : any) => {
        try {
            setIsLoading(true);

            const values = {
                sharesRealName : e
            }

            await axios.patch(`/api/profile/${thisUser.id}`, values)
                .then(() => {
                    router.refresh();
                    toast.success("Einstellungen übernommen")
                })

        } catch(error : any) {
            toast.error("Fehler beim Teilen des echten Namens")
        } finally {
            setIsLoading(false)
        }
    }

    const shareEmail = async (e : any) => {
        try {
            setIsLoading(true);

            const values = {
                sharesEmail : e
            }

            await axios.patch(`/api/profile/${thisUser.id}`, values)
                .then(() => {
                    router.refresh();
                    toast.success("Einstellungen übernommen")
                })

        } catch(error : any) {
            toast.error("Fehler beim Teilen des echten Namens")
        } finally {
            setIsLoading(false)
        }
    }

    const sharePhone = async (e : any) => {
        try {
            setIsLoading(true);

            const values = {
                sharesPhoneNumber : e
            }

            await axios.patch(`/api/profile/${thisUser.id}`, values)
                .then(() => {
                    router.refresh();
                    toast.success("Einstellungen übernommen")
                })

        } catch(error : any) {
            toast.error("Fehler beim Teilen des echten Namens")
        } finally {
            setIsLoading(false)
        }
    }

    return ( 
        <div>
            <h1 className="font-semibold flex items-center">
              <User2Icon className="w-4 h-4 mr-2" />  Account-Einstellungen
            </h1>
            <div className="text-sm text-gray-200/60">
                    Account_id : {thisUser?.id}
                </div>
            <div className="mt-4 space-y-4">
                <div className="flex items-center gap-x-2">
                    <Checkbox className="w-4 h-4"
                    onCheckedChange={(e : any) => shareEmail(e)}
                    checked={thisUser.sharesEmail}
                    /> <Label className="font-semibold flex items-center"> E-Mail im Profil teilen 
                     <Popover>
                        <PopoverTrigger>
                        <IoMdInformationCircleOutline className="w-4 h-4 ml-2" />
                        </PopoverTrigger>
                        <PopoverContent className="dark:border-none dark:bg-indigo-900 text-gray-200 text-xs gap-y-2">
                            
                        <IoMdInformationCircleOutline className="w-4 h-4" />
                            Sollte diese Option aktiviert sein, wird deine E-Mail-Adresse 
                            für andere Nutzer in deinem Profil und neben deinen Inseraten angezeigt.
                        </PopoverContent>
                     </Popover>

                     </Label>


                </div>
                <div className="flex items-center gap-x-2">
                    <Checkbox className="w-4 h-4"
                    onCheckedChange={(e : any) => shareRealName(e)}
                    checked={thisUser.sharesRealName}
                    /> <Label className="font-semibold flex items-center"> Echten Namen teilen
                    <Popover>
                        <PopoverTrigger>
                        <IoMdInformationCircleOutline className="w-4 h-4 ml-2" />
                        </PopoverTrigger>
                        <PopoverContent className="dark:border-none dark:bg-indigo-900 text-gray-200 text-xs gap-y-2">
                            
                        <IoMdInformationCircleOutline className="w-4 h-4" />
                            Sollte diese Option aktiviert sein, wird dein Vor- und Nachname 
                            für andere Nutzer in deinem Profil und neben deinen Inseraten angezeigt.
                        </PopoverContent>
                     </Popover>
                    </Label>
                </div>
                
                <div className="flex items-center gap-x-2">
                    <Checkbox className="w-4 h-4"
                    onCheckedChange={(e : any) => sharePhone(e)}
                    checked={thisUser.sharesPhoneNumber}
                    /> <Label className="font-semibold flex items-center"> Telefonnr. teilen
                    <Popover>
                        <PopoverTrigger>
                        <IoMdInformationCircleOutline className="w-4 h-4 ml-2" />
                        </PopoverTrigger>
                        <PopoverContent className="dark:border-none dark:bg-indigo-900 text-gray-200 text-xs gap-y-2">
                            
                        <IoMdInformationCircleOutline className="w-4 h-4" />
                            Sollte diese Option aktiviert sein, wird deine Telefonnummer, falls angegeben, 
                            für andere Nutzer in deinem Profil und neben deinen Inseraten angezeigt.
                        </PopoverContent>
                     </Popover>
                    </Label>
                </div>

            </div>
        </div>
     );
}
 
export default AccountPrivacy;