'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inserat } from "@prisma/client";
import axios from "axios";
import { AlignCenter, PenIcon } from "lucide-react";
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
        <div className="mr-32 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]  ml-4  rounded-md">
            <h1 className="text-xl flex justify-start p-4 font-semibold mt-2  text-gray-900  ">
                <AlignCenter className="mr-4 "/>Titel deiner Anzeige <PenIcon className="w-4 h-4 ml-4 mt-1" onClick={onClick}/>
            </h1>
            <div>
                
            </div>
            <div className=" mr-16 mt-4 p-4 bg-white rounded-md border border-gray-200">
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
                            <Button variant="ghost" className="ml-4 bg-gray-200" type="submit">
                                Titel speichern
                            </Button>
                        </div>
                    </form>
                </Form>
                    </div>  
                ): (
                    <div className="">
                        <p className="font-semibold text-gray-900/70   mr-8"> {inserat.title} </p>
                    </div>
                )}
            </div>
           
        </div>
     );
}
 
export default TitleInserat;