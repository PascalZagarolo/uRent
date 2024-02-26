'use client'

import { onKeyPressForm } from "@/actions/form-actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inserat } from "@prisma/client";
import axios from "axios";
import { AlignCenter, PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
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

    function handleKeyPress(event) {
        if ((event.key === 'Escape' || event.button === 0) && isEditing) {
            setIsEditing(false); 

            form.handleSubmit(onSubmit);
        }
      }

    

    const inputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);
    


    return ( 
        <div className=" drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]   rounded-md">
            <h1 className="text-md flex justify-start  font-semibold   text-gray-900  dark:text-gray-100 items-center">
                <AlignCenter className="mr-2  h-4 w-4"/>Titel deiner Anzeige 
            </h1>
            <div>
                
            </div>
            <div className="  mt-2 p-4 bg-white dark:bg-[#0F0F0F]  ">
                {isEditing ? (
                    <div className="flex"> 
                        <Form {...form}>
                    <form className="flex w-full" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="title"
                        render = {({field}) => (
                            <FormItem className="w-full">
                                <FormControl className="w-full">
                                    <Input
                                    {...field}
                                    ref={inputRef}
                                    className="  dark:bg-[#0F0F0F] dark:border-gray-100 focus:border-none focus:ring-0 focus-visible:ring-0 w-full rounded-none"
                                    onKeyDown={(e) => {onKeyPressForm(e, form.handleSubmit(onSubmit), () => {form.handleSubmit(onSubmit)})}}
                                    onBlur={(e) => {setIsEditing(false)}}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        
                    </form>
                </Form>
                    </div>  
                ): (
                    <div className="hover:cursor-pointer" onClick={() => {setIsEditing(true)}}>
                        <p className=" text-gray-900/70 dark:text-gray-100   mr-8"> {inserat.title} </p>
                    </div>
                )}
            </div>
           
        </div>
     );
}
 
export default TitleInserat;