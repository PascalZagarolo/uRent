'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inserat } from "@prisma/client";
import axios from "axios";
import { PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface TitleInseratProps {
    inserat : Inserat;
}

const TitleInserat: React.FC<TitleInseratProps> = ({
    inserat
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = z.object({
        title : z.string().min(3, {
            message: "Titel zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            title : inserat.title || ""
        }
    })

    const router = useRouter();

    const onClick = () => {
        setIsEditing(isEditing => !isEditing);
    }

    const onSubmit = (values : z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            axios.patch(`/api/inserat/${inserat.id}`, values);
            toast.success("Titel erfolgreich gespeichert");
            setTimeout(() => {
                router.refresh();
            }, 1000);
        } catch { 
            toast.error("Fehler beim Speichern des Titels");
        } finally {
            setIsEditing(false);
            setIsLoading(false);
        }
    }


    return ( 
        <div>
            <h1 className="text-xl flex justify-start ml-8 font-semibold mt-2">
                Titel deiner Anzeige <PenIcon className="w-4 h-4 ml-4 mt-1" onClick={onClick}/>
            </h1>

            <div>
                <Separator
                className="mt-2 w-8 bg-black ml-8"
                />
            </div>
            
            <div className="ml-8 mt-2 w-80">
                {isEditing ? (
                    <div className="flex"> 
                        <Form {...form}>
                    <form className="flex" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="title"
                        render = {({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                    {...field}
                                    className=" w-80"
                                    
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        
                        />
                        <div>
                            <Button variant="ghost" className="ml-4" type="submit">
                                Titel speichern
                            </Button>
                        </div>
                    </form>
                </Form>

                    </div>
                    
                ): (
                    <div>
                        <p className="font-semibold text-gray-900/70 mt-4  mr-8"> {inserat.title} </p>
                    </div>
                )}
            
            </div>
            <Separator
                className="mt-2 w-8 bg-black ml-auto mr-16"
                />
            
        </div>
     );
}
 
export default TitleInserat;