'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";


import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { title } from "process";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { z } from "zod";

interface InseratProps {
    currentUser: User;
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

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        try {
            const res = axios.post("/api/inserat", {title : values.title, userId : currentUser.id}).
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
                <DialogTrigger className="bg-[#12141f] border border-black ml-8 mt-2 flex justify-center text-gray-300 p-3 rounded-md text-sm items-center font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    
                    
                        <PlusIcon className="w-4 h-4 mr-2 flex justify-center" /> <p className="hidden 2xl:block">Neue Anzeige</p>
                    
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl  text-gray-900 mr-8 ml-2 p-2 rounded-md border-gray-400 border-2">
                            Neue Anzeige erstellen
                            
                        </DialogTitle>

                    </DialogHeader>
                    <div>
                        <div className="flex justify-center">
                            <h3 className="mt-8  text-lg font-semibold flex items-center gap-x-"> <Separator className="w-16 bg-gray-700 mr-4"/> Gebe deiner Anzeige einen Titel <Separator className="w-16 bg-gray-700 ml-4"/> </h3>


                        </div>
                        <p className="font-semibold text-xs text-gray-800/50 flex justify-center mb-8">der Titel kann jederzeit geändert werden</p>
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
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <p><Separator className="ml-auto w-8 bg-black mt-4" /></p>
                                <div className="flex ml-auto">

                                    <Button className="bg-[#202336] border-2 border-gray-300 mt-4 flex drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" type="submit">
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