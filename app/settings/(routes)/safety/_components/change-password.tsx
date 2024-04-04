'use client'

import { reset, resetClient } from "@/actions/reset";
import { Label } from "@/components/ui/label";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import toast from "react-hot-toast";

interface ChangePasswordProps {
    userEmail: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
    userEmail
}) => {

    const onSubmit = async () => {
        
        await resetClient(userEmail);

        toast.success("Email gesendet!")
    }

    return (
        <div>
            <div>
                <div className="w-1/2">
                    <Label className="text-sm font-semibold p-2">
                        Passwort
                    </Label>
                    <div className="w-full">
                        <div className="pl-3 p-2.5 dark:bg-[#141414] border dark:border-none bg-gray-200 text-sm rounded-md">
                            *********
                        </div>
                        <p className="ml-auto flex justify-end p-1 w-full text-xs font-semibold hover:underline hover:cursor-pointer"
                            onClick={onSubmit}
                        >
                            Passwort ändern
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;