'use client'

import { checkOTPMail } from "@/actions/change-email";
import { changeEmailSendMail } from "@/actions/change-email-mail";
import { reset, resetClient } from "@/actions/reset";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { userTable } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";


import { MailsIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GiConfirmed } from "react-icons/gi";
import { IoMdShareAlt } from "react-icons/io";
import { z } from "zod";

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

    const [otp, setOTP] = useState<string>("");

    const router = useRouter();

    function compareMails() {
        return (firstMail.trim() === secondMail.trim() && firstMail.trim() !== "" && firstMail);
    }

    const onCheck = async () => {

        setError("");
        console.log("dijfosmpd")
        const sameEmail = compareMails();
        if (!sameEmail) {
            toast.error("Die E-Mail Adressen stimmen nicht überein.");
            return;
        }
        console.log(thisUser)

        const res = await changeEmailSendMail(firstMail, thisUser, password)
            .then((res) => {
                if (res.success) {
                    setShowOTP(true);
                } else {
                    setError(res.error);
                }
            })

    }

    const formSchema = z.object({
        pin: z.string().min(6, {
            message: "Pin zu kurz.",
          }),
        
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            pin : ""
        }
    })

    const onSubmit = (values : z.infer<typeof formSchema>) => {
        const usedPin = values.pin;

        checkOTPMail(usedPin, thisUser)
        .then((res) => {
            if(res.success) {
                toast.success(res.success);
                router.push("/login")
            } else {
                setError(res.error);
            }
        })

    }

    useEffect(() => {
        console.log(otp)
    }, [otp])

    return (
        <div>
            <div>
                <Dialog>
                    <div className="sm:w-1/2 w-full">
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
                                        {showOTP ? (
                                            <div className="text-xs dark:text-gray-200/60 flex justify-start">
                                                Gebe den Code ein den wir dir per E-Mail geschickt haben.
                                            </div>
                                        ) : (
                                            <div className="text-xs dark:text-gray-200/60 flex justify-start">
                                                Ändere die, mit deinem uRent Account verknüpfte E-Mail Adresse.
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        {showOTP ? (
                                            <div className="flex justify-center">

                                                <Form {...form}>
                                                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                                                        <FormField
                                                            control={form.control}
                                                            name="pin"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>One-Time Password</FormLabel>
                                                                    <FormControl>
                                                                        <InputOTP maxLength={6} {...field}>
                                                                            <InputOTPGroup>
                                                                                <InputOTPSlot index={0} />
                                                                                <InputOTPSlot index={1} />
                                                                                <InputOTPSlot index={2} />
                                                                                
                                                                            </InputOTPGroup>
                                                                            <InputOTPSeparator/>
                                                                            <InputOTPGroup>
                                                                                <InputOTPSlot index={3} />
                                                                                <InputOTPSlot index={4} />
                                                                                <InputOTPSlot index={5} />
                                                                            </InputOTPGroup>
                                                                        </InputOTP>
                                                                    </FormControl>
                                                                    <FormDescription>
                                                                        Gebe den Code ein, den wir an deine neue Email verschickt haben.
                                                                    </FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <Button type="submit">Code bestätigen</Button>
                                                    </form>
                                                </Form>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="w-full space-y-2">
                                                    <Label>
                                                        Neue E-Mail Adresse
                                                    </Label>
                                                    <Input
                                                        className="w-full dark:bg-[#131313] dark:border-none dark:text-gray-200"
                                                        onChange={(e) => { setFirstMail(e.target.value) }}
                                                        value={firstMail}
                                                    />
                                                </div>
                                                <div className="w-full space-y-2">
                                                    <Label>
                                                        Neue E-Mail Adresse bestätigen
                                                    </Label>
                                                    <Input
                                                        className="w-full dark:bg-[#131313] dark:border-none dark:text-gray-200"
                                                        onChange={(e) => { setSecondMail(e.target.value) }}
                                                        value={secondMail}
                                                    />
                                                </div>
                                                <div className="w-full space-y-2">
                                                    <Label>
                                                        Passwort
                                                    </Label>
                                                    <Input
                                                        className="w-full dark:bg-[#131313] dark:border-none dark:text-gray-200"
                                                        onChange={(e) => { setPassword(e.target.value) }}
                                                        value={password}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {error && (
                                            <div className="bg-rose-800 p-4 flex justify-start bg-opacity-20 font-semibold text-sm items-center">
                                                <X className="w-4 h-4 text-gray-200 mr-2" />   {error}
                                            </div>
                                        )}
                                        <div className="w-full flex justify-end ">
                                            {!showOTP && (
                                                <Button className="dark:bg-[#151515] dark:border-none dark:text-gray-200 
                                                dark:hover:bg-[#171717] dark:hover:text-gray-300" onClick={onCheck}>
                                                    <GiConfirmed className="w-4 h-4 mr-2" />    Code bestätigen
                                                </Button>
                                           
                                            )}
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