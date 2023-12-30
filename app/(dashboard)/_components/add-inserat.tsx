'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Inserat = () => {
    const router = useRouter();

    const formSchema = z.object({
        title : z.string().min(3,{
            message : "Titel ist zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            title : ""
        }
    })
    

    return ( 
        <div>
            <Dialog >
                <DialogTrigger>
                <Button variant="ghost" className="bg-white items-center mt-2 flex">
                <PlusIcon className="w-4 h-4 mr-2"/> Neue Anzeige 
            </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Neue Anzeige erstellen
                            <p><Separator className="w-8 bg-black mt-2"/></p>
                        </DialogTitle>
                        
                    </DialogHeader>
                    <div>
                        <div className="flex justify-center">
                            <h3 className="mt-8  text-lg font-semibold">Gebe deiner Anzeige einen Titel</h3>
                            

                        </div>
                        <p className="font-semibold text-xs text-gray-800/50 flex justify-center mb-8">der Titel kann jederzeit geändert werden</p>
                        <Form {...form}>
                            <form>
                                <FormField
                                control = {form.control}
                                name = "title"
                                render = {({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder="Titel der Anzeige..."
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                                <p><Separator className="ml-auto w-8 bg-black mt-4"/></p>
                                <div className="flex ml-auto">
                                
                                    <Button className="bg-blue-800 mt-4 flex">
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