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
                <div className="rounded-2xl p-8 w-full shadow-2xl  bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-[#23244a] dark:via-[#181a2a] dark:to-[#23244a]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex flex-col items-center w-full">
                            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-600 shadow-lg mb-2">
                                <MdOutlineRedeem className="w-8 h-8 text-white" />
                            </span>
                            <h3 className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-700 mb-1">Code einlösen</h3>
                            <p className="text-sm text-indigo-900 dark:text-indigo-200/80 text-center max-w-md">
                                Gebe hier deinen 16-stelligen Code oder diverse Promocodes ein, um Abos & Vorteile einzulösen.
                            </p>
                        </div>
                        {error && (
                            <div className="w-full text-sm py-2 bg-rose-600/20 p-4 border border-rose-800/20 mt-2 mb-2 shadow-lg rounded-xl animate-shake">
                                <div className="flex flex-row items-center gap-x-2 text-base font-semibold">
                                    <AlertCircleIcon className="w-5 h-5 text-rose-800" />
                                    Beim Einlösen deines Codes ist ein Fehler aufgetreten.
                                </div>
                                <div className="text-sm text-gray-800 dark:text-gray-200/80 mt-2">
                                    {error}
                                </div>
                            </div>
                        )}
                        <div className="mt-2 w-full flex flex-col items-center">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-4">
                                    <FormField
                                        control={form.control}
                                        name="pin"
                                        render={({ field }) => (
                                            <FormItem className="w-full max-w-md">
                                                <FormLabel className="text-sm font-semibold text-indigo-700 dark:text-indigo-200">Gutscheincode</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        name="pin"
                                                        className="dark:bg-[#131313] bg-white border border-indigo-200 dark:border-indigo-700 shadow-md rounded-full px-5 py-3 text-base focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all placeholder:text-indigo-300 dark:placeholder:text-indigo-400"
                                                        onChange={(e) => setUsedCode(e.target.value)}
                                                        value={usedCode}
                                                        placeholder="Promocode.."
                                                    />
                                                </FormControl>
                                                <div className="text-xs text-indigo-700/80 dark:text-indigo-200/60 mt-2">
                                                    Um über die neuesten Angebote und Aktionen informiert zu werden,<br />
                                                    melde dich unter deinem Profil für unseren Newsletter an.<br /><br />
                                                    Für weitere Informationen rundum das Thema Gutscheincodes klicke <a className="underline" href="/faq/giftcodes">hier</a>.
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        variant="default"
                                        className="w-full max-w-md py-3 rounded-full font-bold text-base bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 text-white shadow-lg hover:from-indigo-800 hover:to-indigo-900 hover:scale-[1.03] transition-all duration-200"
                                        disabled={!usedCode || isLoading}
                                    >
                                        {isLoading ? <ClipLoader color="#fff" loading={true} size={20} /> : "Code überprüfen"}
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