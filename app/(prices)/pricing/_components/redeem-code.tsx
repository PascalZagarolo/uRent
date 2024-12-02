'use client'

import { Button } from "@/components/ui/button";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";


import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { MdOutlineRedeem } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { z } from "zod";


const RedeemCode = () => {

    const [usedCode, setUsedCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/redeem/giftcode/${usedCode}`)
                .then((res) => {
                    setError("");
                    setUsedCode("")
                    toast.success("Der Gutscheincode wurde erfolgreich eingelöst.");
                    router.refresh();
                })


        } catch (error: any) {
            console.log(error?.response?.data);
            setError(error?.response?.data);
            toast.error("Dieser Gutscheincode kann nicht verwendet werden.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setError("");
    },[usedCode])

    const formSchema = z.object({
        pin: z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pin: ""
        }
    })

    return (
        <div className="w-full">

            <div className="w-full mt-2">


                <div className="dark:border-none dark:bg-[#191919] rounded-md p-4 w-full">
                    <div>
                        <div>
                            <h3 className="font-semibold text-md flex items-center">
                                <MdOutlineRedeem className="w-4 h-4 mr-2" />  Code einlösen
                            </h3>
                            <p className="text-xs dark:text-gray-200/70">
                                Gebe hier deinen 16-stelligen Code oder diverse Promocodes ein, um Abos & Vorteile einzulösen.
                            </p>
                        </div>
                        {error && (
                            <div className="text-sm py-2 bg-rose-600/20 p-4 border border-rose-800/20 mt-2 mb-2 shadow-lg">
                                <div className="flex flex-row items-center gap-x-2 text-base font-semibold">
                                    <AlertCircleIcon className="w-4 h-4 text-rose-800" />
                                    Beim Einlösen deines Codes ist ein Fehler aufgetreten.
                                </div>
                                <div className="text-sm text-gray-200/80 mt-2">
                                    {error}
                                </div>
                            </div>
                        )}
                        <div className="mt-2">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="pin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm">Gutscheincode</FormLabel>
                                                <FormControl>
                                                    <Input

                                                        name="pin"
                                                        className="dark:bg-[#131313] shadow-lg sm:w-1/2 dark:border-none"
                                                        onChange={(e) => setUsedCode(e.target.value)}
                                                        value={usedCode}
                                                        placeholder="Promocode.."
                                                    />
                                                </FormControl>
                                                <div className="text-xs dark:text-gray-200/60">
                                                    <div>
                                                        Um über die neuesten Angebote und Aktionen informiert zu werden, <br />
                                                        melde dich unter deinem Profil für unseren Newsletter an.<br /><br />
                                                        <div>

                                                            Für weitere Informationen rundum das Thema Gutscheincodes klicke <a className="underline" href="/faq/giftcodes">hier</a>.
                                                        </div>
                                                    </div>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button variant="ghost"
                                        className="mt-2 text-gray-200 bg-indigo-800 hover:bg-indigo-900 dark:hover:text-gray-300"
                                        disabled={!usedCode || isLoading}
                                    >
                                        {isLoading ? <ClipLoader
                                            color="#2563EB"
                                            loading={true}
                                            size={20}
                                        /> : "Code überprüfen"}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default RedeemCode;