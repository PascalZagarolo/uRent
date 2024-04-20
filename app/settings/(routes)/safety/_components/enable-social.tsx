'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RiUserForbidLine } from "react-icons/ri";


interface EnableSocialLoginProps {
    enabledSocials: boolean;
    userId : string;
}

const EnableSocialLogin: React.FC<EnableSocialLoginProps> = ({
    enabledSocials,
    userId
}) => {

    const router = useRouter();

    const onCheck = async (e: any) => {
        try {

            const values = {
               enableSocialLogin : e
           }

           await axios.patch(`/api/profile/${userId}`, values).then(() => {
               if(values.enableSocialLogin === true) {
                   toast.success("Google-Login wurde aktiviert");
                   
               }
               router.refresh()
            
               
           })

           if(values.enableSocialLogin === false) {
            toast.success("Google-Login wurde deaktiviert");
            
            router.push("/login");
            }


       } catch {
           toast.error("Fehler beim Aktivieren der 2FA");
       }
    }

    return (
        <div>
            <div>
                <div className="w-1/2">
                    {enabledSocials ? (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Checkbox
                                    
                                    checked={enabledSocials}
                                />
                            </AlertDialogTrigger>
                            <AlertDialogContent className="dark:border-none dark:bg-[#191919]">
                            <div>
                                <div>
                                <h1 className="font-semibold text-md flex items-center">
                                <RiUserForbidLine className="w-4 h-4 mr-2" /> SocialLogin deaktivieren?
                                </h1>
                                <p className="text-xs dark:text-gray-200/70">
                                    Wenn du SocialLogin deaktivierst, kannst du dich nicht mehr über deinen Google Account anmelden.
                                    Alle bestehenden Sitzungen werden gelöscht und du musst dich neu anmelden.
                                </p>
                                </div>
                                <div className="flex w-full justify-end">
                                <AlertDialogCancel className="dark:border-none">
                                    Abbrechen
                                </AlertDialogCancel>
                                <AlertDialogAction className="bg-rose-800 text-gray-200" onClick={() => {onCheck(false)}}>
                                    Deaktivieren
                                </AlertDialogAction>
                                </div>
                            </div>
                            </AlertDialogContent>
                        </AlertDialog>
                    ) : (
                        <Checkbox
                            onCheckedChange={(e) => { onCheck(e)}}
                            checked={enabledSocials}
                        />
                    )}
                    <Label className="text-sm font-semibold p-2">
                        SocialLogin aktiveren
                    </Label>


                </div>
            </div>
        </div>
    );
}

export default EnableSocialLogin;