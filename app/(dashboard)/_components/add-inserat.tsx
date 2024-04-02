'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { users } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";


import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { title } from "process";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { z } from "zod";

interface InseratProps {
    currentUser: typeof users.$inferSelect;
}

const Inserat: React.FC<InseratProps> = ({
    currentUser
}) => {
    const router = useRouter();

    const formSchema = z.object({
        title: z.string().min(3, {
            message: "Titel ist zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    })

    const onSubmit = (value: z.infer<typeof formSchema>) => {
        try {

            const values = {
                title: value.title,
                userId : currentUser.id
            }

            const res = axios.post("/api/inserat", values).
            then((res) => {
                toast.success("Anzeige erfolgreich erstellt");
                router.push(`/inserat/create/${res.data.id}`);
            
            })
            
        } catch {
            toast.error("Fehler beim Erstellen der Anzeige")
        }
    }


    return (
        <div>
            
            <Dialog >
            <DialogTrigger className="bg-[#12141f] ml-4  lg:mr-4 2xl:mr-16 mt-2 flex justify-center text-gray-300 p-3 rounded-md text-sm items-center 
            font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] dark:bg-[#1C1E2C] ">
                    
                    
                    <PlusIcon className="w-4 h-4 xl:mr-2 flex justify-center" /> <p className="hidden xl:block mr-1">Neue Anzeige</p>
                        
                    </DialogTrigger>
                <DialogContent className="dark:bg-[#0F0F0F] dark:border-none">
                    <DialogHeader>
                        <DialogTitle className="text-xl  text-gray-900 mr-8 ml-2 p-2 rounded-md border-gray-400 border-2 dark:border-none dark:text-gray-100">
                            Neue Anzeige erstellen
                            
                        </DialogTitle>

                    </DialogHeader>
                    <div>
                        <div className="flex justify-center">
                            <h3 className="mt-8  text-lg font-semibold flex items-center gap-x-"> <Separator className="w-16 bg-gray-700 mr-4"/> Gebe deiner Anzeige einen Titel <Separator className="w-16 bg-gray-700 ml-4"/> </h3>


                        </div>
                        <p className="font-semibold text-xs text-gray-800/50 flex justify-center mb-8 dark:text-gray-100/70">der Titel kann jederzeit geändert werden</p>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Titel der Anzeige..."
                                                    className="dark:bg-[#0a0a0a] dark:border-gray-100 focus-visible:ring-0"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <p><Separator className="ml-auto w-8 bg-black mt-4" /></p>
                                <div className="flex ml-auto">

                                    <Button className="bg-[#202336] border-2 border-gray-300 mt-4 flex drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                                    dark:bg-[#080808] dark:border-none dark:text-gray-100 dark:hover:bg-[#0c0c0c]
                                    " type="submit">
                                        Anzeige erstellen
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default Inserat;