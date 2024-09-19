'use client'

import { abort2faConfirm, abort2faSendMail, activate2Fa } from "@/actions/2fa/2fa-actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { userTable } from "@/db/schema";
import { sendTwoFactorActivating } from "@/lib/mail";
import axios from "axios";
import { CheckIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { CheckmarkIcon } from "react-hot-toast";
import { de } from 'date-fns/locale';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { set } from 'lodash';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Select2FaProps {
    thisUser: typeof userTable.$inferSelect;
}

const Select2Fa: React.FC<Select2FaProps> = ({
    thisUser
}) => {

    const router = useRouter();

    // const onChange = async (e : any) => {
    //     try {

    //          const values = {
    //             usesTwoFactor : e
    //         }

    //         await axios.patch(`/api/profile/${thisUser.id}`, values).then(() => {
    //             if(values.usesTwoFactor === true) {
    //                 toast.success("2FA wurde aktiviert");
    //                 sendTwoFactorActivating(thisUser.email)
    //             }
    //             router.refresh()
    //         })
    //     } catch {
    //         toast.error("Fehler beim Aktivieren der 2FA");
    //     }
    // }

    const [showInput, setShowInput] = useState(false);
    const [isActive, setIsActive] = useState(thisUser?.usesTwoFactor);
    const [error, setError] = useState("");

    const [isLoading, setIsLoading] = useState(false);



    const formSchema = z.object({
        pin: z.string().min(6, {
            message: "Pin zu kurz.",
        }),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pin: ""
        }
    })

    const onAbort = async () => {
        try {
            setIsLoading(true);
            await abort2faSendMail();
            toast.success("Bestätigungs-Email wurde versendet");
            setShowInput(true);
            setIsActive(false);
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Deaktivieren der 2FA");
        } finally {
            setIsLoading(true);
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            const usedPin = values.pin;
            await abort2faConfirm(usedPin);
            setShowInput(false);
            toast.success("2FA wurde deaktiviert");
            setIsActive(false);
        } catch (e: any) {
            console.log(e);
            toast.error("Fehler beim Deaktivieren der 2FA");
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    const onActivate = async () => {
        try {
            setIsLoading(true);
            await activate2Fa();
            toast.success("2FA wurde aktiviert");
            setIsActive(true);
        } catch (e : any) {
            toast.error("Fehler beim Aktivieren der 2FA");
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    const returnDialogAbort = () => {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-rose-800 hover:bg-rose-900 text-gray-200 hover:text-gray-300">
                        2FA Deaktivieren
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#191919] border-none">
                    {showInput ? (
                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                                    <div className="text-lg font-semibold flex flex-row items-center">
                                        <X className="w-4 h-4 mr-2 text-rose-800" /> Zwei-Faktor-Authentifizierung deaktivieren?
                                    </div>
                                    <div className="text-xs text-gray-200/60">
                                        Wir haben dir einen Code per Email geschickt.
                                    </div>
                                    <div>

                                        <FormField
                                            control={form.control}
                                            name="pin"
                                            render={({ field }) => (
                                                <FormItem className="mt-4">
                                                    <FormLabel>Bestätigungs-Code</FormLabel>
                                                    <FormControl>
                                                        <InputOTP maxLength={6} {...field} >
                                                            <InputOTPGroup>
                                                                <InputOTPSlot index={0} />
                                                                <InputOTPSlot index={1} />
                                                                <InputOTPSlot index={2} />

                                                            </InputOTPGroup>
                                                            <InputOTPSeparator />
                                                            <InputOTPGroup>
                                                                <InputOTPSlot index={3} />
                                                                <InputOTPSlot index={4} />
                                                                <InputOTPSlot index={5} />
                                                            </InputOTPGroup>
                                                        </InputOTP>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Gebe den Code ein, der dir per Email zugesendet wurde.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />



                                    </div>
                                    <div className="flex flex-row items-center justify-end mt-4">


                                        <DialogTrigger asChild>
                                            <Button className="bg-rose-800 hover:bg-rose-900 text-gray-200 hover:text-gray-300"
                                            type="submit"
                                            >
                                                Deaktivieren
                                            </Button>
                                        </DialogTrigger>
                                        <DialogTrigger asChild>
                                            <Button className="" variant="ghost">
                                                Abbrechen
                                            </Button>
                                        </DialogTrigger>

                                    </div>
                                </form>
                            </Form>
                        </div>
                    ) : (
                        <div>
                            <div className="text-lg font-semibold flex flex-row items-center">
                                <X className="w-4 h-4 mr-2 text-rose-800" />Zwei-Faktor-Authentifizierung deaktivieren?
                            </div>
                            <div className="text-xs text-gray-200/60">
                                Dir wird im Anschluss eine Bestätigungs-Email zugesendet.
                            </div>
                            <div className="flex flex-row items-center justify-end mt-4">
                                <Button className="bg-rose-800 hover:bg-rose-900 text-gray-200 hover:text-gray-300"
                                    onClick={onAbort}
                                >
                                    Deaktivieren
                                </Button>
                                <DialogTrigger asChild>
                                    <Button className="" variant="ghost">
                                        Abbrechen
                                    </Button>
                                </DialogTrigger>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        )
    }

    const returnDialogaActivate = () => {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300">
                    2FA Aktivieren
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#191919] border-none">
                    
                        <div>
                            <div className="text-lg font-semibold flex flex-row items-center">
                                <CheckIcon className="w-4 h-4 mr-2 text-indigo-800" /> Zwei-Faktor-Authentifizierung aktivieren?
                            </div>
                            <div className="text-xs text-gray-200/60">
                                Falls aktiviert, wird dir bei jedem Login eine Bestätigungs-Email gesendet. <br/>
                                uRent empfiehlt die Aktivierung der 2FA.
                            </div>
                            <div className="flex flex-row items-center justify-end mt-4">
                                <DialogTrigger asChild>
                                <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300"
                                    onClick={onActivate}
                                >
                                    Aktivieren
                                </Button>
                                </DialogTrigger>
                                <DialogTrigger asChild>
                                    <Button className="" variant="ghost">
                                        Abbrechen
                                    </Button>
                                </DialogTrigger>
                            </div>
                        </div>
                   
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <div>
            <div>
                <div className="sm:w-1/2 w-full">
                    <Checkbox
                        checked={isActive}
                        className="hover:cursor-default"
                    />
                    <Label className="text-sm font-semibold p-2">
                    Zwei-Faktor-Authentifizierung aktiviert (empfohlen)
                    </Label>
                    <div className="mt-4">
                        {thisUser.usesTwoFactor ? returnDialogAbort() : returnDialogaActivate()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Select2Fa;