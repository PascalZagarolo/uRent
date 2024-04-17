'use client'

import { reset, resetClient } from "@/actions/reset";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userTable } from "@/db/schema";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { MailsIcon } from "lucide-react";
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

    const compareMails = () => {

    }

    const onSubmit = async () => {
        
        
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
                            muster@mustermail.de
                        </div>
                        <DialogTrigger asChild>
                        <p className="ml-auto flex justify-end p-1 w-full text-xs font-semibold hover:underline hover:cursor-pointer"
                            onClick={onSubmit}
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
                                    <div className="w-full space-y-2">
                                        <Label>
                                            Neue E-Mail Adresse
                                        </Label>
                                        <Input
                                         className="w-full dark:bg-[#131313] dark:border-none dark:text-gray-200"
                                        />
                                    </div>
                                    <div className="w-full space-y-2">
                                        <Label>
                                            Neue E-Mail Adresse bestätigen
                                        </Label>
                                        <Input
                                         className="w-full dark:bg-[#131313] dark:border-none dark:text-gray-200"
                                        />
                                    </div>
                                    <div className="w-full space-y-2">
                                        <Label>
                                            Passwort
                                        </Label>
                                        <Input
                                         className="w-full dark:bg-[#131313] dark:border-none dark:text-gray-200"
                                        />
                                    </div>
                                    <div>

                                    </div>
                                    <div className="w-full flex justify-end ">
                                        <Button className="dark:bg-[#151515] dark:border-none dark:text-gray-200 
                                        dark:hover:bg-[#171717] dark:hover:text-gray-300">
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