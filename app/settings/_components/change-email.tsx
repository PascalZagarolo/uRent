'use client'

import { changeEmailSendMail } from "@/actions/change-email-mail";
import { reset, resetClient } from "@/actions/reset";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userTable } from "@/db/schema";


import { MailsIcon, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdShareAlt } from "react-icons/io";

interface ChangeEmailProps {
    thisUser: typeof userTable.$inferSelect;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({
    thisUser
}) => {

    const [firstMail, setFirstMail] = useState<string>("");
    const [secondMail, setSecondMail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showOTP, setShowOTP] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    function compareMails() {
        return (firstMail.trim() === secondMail.trim() && firstMail.trim() !== "" && firstMail);
    }

    const onSubmit = async () => {

        setError("");
        console.log("dijfosmpd")
        const sameEmail = compareMails();
        if (!sameEmail) {
            toast.error("Die E-Mail Adressen stimmen nicht überein.");
            return;
        }
        console.log(firstMail)

        const res = await changeEmailSendMail(firstMail, thisUser, password)
            .then((res) => {
                if (res.success) {
                    setShowOTP(true);
                } else {
                    setError(res.error);
                }
            })
        
    }

    return (
        <div>
            <div>
                <Dialog>
                    <div className="w-1/2">
                        <Label className="text-sm font-semibold p-2">
                            E-Mail Adresse
                        </Label>
                        <div className="w-full">
                            <div className="pl-3 p-2.5 dark:bg-[#141414] border dark:border-none bg-gray-200 text-sm rounded-md">
                                {thisUser.email}
                            </div>
                            <DialogTrigger asChild>
                                <p className="ml-auto flex justify-end p-1 w-full text-xs font-semibold hover:underline hover:cursor-pointer"
                                    
                                >
                                    Ändern
                                </p>
                            </DialogTrigger>
                            <DialogContent className="w-full dark:text-gray-200 dark:bg-[#191919] dark:border-none">
                                <div>
                                    <div>
                                        <h1 className="flex font-semibold text-md items-center">
                                            <MailsIcon className="w-4 h-4 mr-2" />  E-Mail Adresse ändern?
                                        </h1>
                                        <div className="text-xs dark:text-gray-200/60 flex justify-start">
                                            Ändere die, mit deinem uRent Account verknüpfte E-Mail Adresse.
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        {showOTP ? (
                                            <div>
                                            </div>
                                        ) : (
                                        <div>
                                            <div className="w-full space-y-2">
                                        <Label>
                                            Neue E-Mail Adresse
                                        </Label>
                                        <Input
                                         className="w-full dark:bg-[#131313] dark:border-none dark:text-gray-200"
                                         onChange={(e) => {setFirstMail(e.target.value)}}
                                         value={firstMail}
                                        />
                                    </div>
                                    <div className="w-full space-y-2">
                                        <Label>
                                            Neue E-Mail Adresse bestätigen
                                        </Label>
                                        <Input
                                         className="w-full dark:bg-[#131313] dark:border-none dark:text-gray-200"
                                         onChange={(e) => {setSecondMail(e.target.value)}}
                                         value={secondMail}
                                        />
                                    </div>
                                    <div className="w-full space-y-2">
                                        <Label>
                                            Passwort
                                        </Label>
                                        <Input
                                         className="w-full dark:bg-[#131313] dark:border-none dark:text-gray-200"
                                         onChange={(e) => {setPassword(e.target.value)}}
                                        value={password}
                                        />
                                    </div>
                                        </div>
                                        )}
{error && (
    <div className="bg-rose-800 p-4 flex justify-start bg-opacity-20 font-semibold text-sm items-center">
     <X className="w-4 h-4 text-gray-200 mr-2"/>   {error}
    </div>
)}
                                        <div className="w-full flex justify-end ">
                                            <Button className="dark:bg-[#151515] dark:border-none dark:text-gray-200 
                                        dark:hover:bg-[#171717] dark:hover:text-gray-300" onClick={onSubmit}>
                                                <IoMdShareAlt className="w-4 h-4 mr-2" />    Bestätigung schicken
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>

                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}

export default ChangeEmail;