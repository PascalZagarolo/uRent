'use client'

import { onKeyPressForm } from "@/actions/form-actions";
import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { inserat } from "@/db/schema";

import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { AlignCenter, PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface TitleInseratProps {
    thisInserat : typeof inserat.$inferSelect;
}

const TitleInserat: React.FC<TitleInseratProps> = ({
    thisInserat
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(thisInserat.title || "");

    const formSchema = z.object({
        title : z.string().min(3, {
            message: "Titel zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            title : thisInserat.title || ""
        }
    })

    const router = useRouter();

    

    const onSubmit = () => {
        try {
            setIsLoading(true);
            const values = {
                title : currentTitle
            }
            axios.patch(`/api/inserat/${thisInserat.id}`, values);
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
                <AlignCenter className="mr-2 h-4 w-4"/>Titel deiner Anzeige *
                
                    <Button 
                    className="ml-auto dark:bg-[#0F0F0F] dark:hover:bg-[#1a1a1a] dark:text-gray-100 text-xs font-semibold"
                    disabled={currentTitle === thisInserat.title || !currentTitle}
                    onClick={onSubmit}
                    > 
                    Änderungen speichern </Button>
                
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
                                    onChange={(e) => {setCurrentTitle(e.target.value)}}
                                    value={currentTitle}
                                    className="  dark:bg-[#0F0F0F] dark:border-gray-100 
                                     focus:ring-0 focus-visible:ring-0 w-full rounded-none border"
                                    onKeyDown={(e) => 
                                        {onKeyPressForm(e, form.handleSubmit(onSubmit), () => {form.handleSubmit(onSubmit)})}}
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
                        <p className=" text-gray-900/70 dark:text-gray-100 mr-8"> {currentTitle} </p>
                    </div>
                )}
            </div>
           
        </div>
     );
}
 
export default TitleInserat;