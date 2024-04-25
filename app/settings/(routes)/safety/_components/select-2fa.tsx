'use client'

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { userTable } from "@/db/schema";
import { sendTwoFactorActivating } from "@/lib/mail";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Select2FaProps {
    thisUser : typeof userTable.$inferSelect;
}

const Select2Fa: React.FC<Select2FaProps> = ({
    thisUser
}) => {

    const router = useRouter();

    const onChange = async (e : any) => {
        try {

             const values = {
                usesTwoFactor : e
            }

            await axios.patch(`/api/profile/${thisUser.id}`, values).then(() => {
                if(values.usesTwoFactor === true) {
                    toast.success("2FA wurde aktiviert");
                    sendTwoFactorActivating(thisUser.email)
                }
                router.refresh()
            })
        } catch {
            toast.error("Fehler beim Aktivieren der 2FA");
        }
    }

    return ( 
        <div>
            <div>
                <div className="sm:w-1/2 w-full">
                    <Checkbox 
                    onCheckedChange={(e) => {onChange(e)}}
                    checked={thisUser.usesTwoFactor}
                    />
                    <Label className="text-sm font-semibold p-2">
                        2FA Aktivieren
                    </Label>

                   
                </div>
            </div>
        </div>
     );
}
 
export default Select2Fa;