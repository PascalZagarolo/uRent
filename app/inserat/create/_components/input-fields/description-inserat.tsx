'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inserat } from "@prisma/client";
import axios from "axios";
import { AppWindow, PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { title } from "process";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface DescriptionInseratProps {
    inserat : Inserat;
}

const DescriptionInserat: React.FC<DescriptionInseratProps> = ({
    inserat
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    

    const formSchema = z.object({
        description : z.string().min(3, {
            message: "Titel zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            description : inserat.description || ""
        }
    })

    const onClick = () => {
        setIsEditing(isEditing => !isEditing);
    }

    const onSubmit = (values : z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            axios.patch(`/api/inserat/${inserat.id}`, values)
            toast.success("Beschreibung erfolgreich gespeichert")
            setTimeout(() => {
                router.refresh();
            }, 1000)
        } catch {
            toast.error("Fehler beim Speichern der Beschreibung")
        } finally {
            setIsLoading(false);
            setIsEditing(false);
        }
    }

    return ( 
        <div className="w-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]  ">
            <h1 className="text-xl flex justify-start ml-8 font-semibold  mr-16 p-4 text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]  ">
               <AppWindow className="mr-4"/> Beschreibung <PenIcon className="w-4 h-4 ml-4 mt-1" onClick={onClick}/>
            </h1>
            
            <div className="ml-4  mt-2 bg-white border border-gray-300 p-4 mr-48 rounded-md h-[120px]">
                {isEditing ? (
                    <div className="flex"> 
                        <Form {...form}>
                    <form className="flex" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="description"
                        render = {({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                    {...field}
                                    className=" w-[500px]"
                                    
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        
                        />
                        <div>
                            <Button variant="ghost" className="ml-4 bg-gray-200" type="submit">
                                Beschreibung speichern
                            </Button>
                        </div>
                    </form>
                </Form>

                    </div>
                    
                ): (
                    <div className="   ">

                        {inserat.description ? (
                            <p className="font-semibold text-gray-900 flex-1 truncate   "> {inserat.description} </p>
                        ) : (
                            <p className="font-semibold text-gray-900/50 italic text-sm "> Noch keine Beschreibung hinzugefügt </p>
                        )}
                        
                    </div>
                )}
            
            </div>
            
            
        </div>
     );
}
 
export default DescriptionInserat;