'use client'

import { onKeyPressForm } from "@/actions/form-actions";
import LetterRestriction from "@/components/letter-restriction";
import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { inserat } from "@/db/schema";
import { useUnsavedChanges } from "@/store";

import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { AlignCenter, PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface TitleInseratCreationProps {
    thisInserat : typeof inserat.$inferSelect;
    currentTitle : string;
    setCurrentTitle : (value : string) => void;
}

const TitleInseratCreation: React.FC<TitleInseratCreationProps> = ({
    thisInserat,
    currentTitle,
    setCurrentTitle
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    

    
    const {currentChanges, changeCurrent} = useUnsavedChanges()

    useEffect(() => {
        const setAmount = async () => {
            await changeCurrent("title", currentTitle);
        
        }

        setAmount();
    }, [currentTitle])


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

    function handleKeyPress(event : any) {
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
        <div className="   rounded-md">
            <h1 className="text-sm flex justify-start  font-semibold   text-gray-900  dark:text-gray-100 items-center">
                Titel deiner Anzeige *
            
            </h1>
           
            <div className="p-4 bg-white dark:bg-[#202020] hover:bg-[#212121] shadow-xl  rounded-md">
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
                                    maxLength={160}
                                    className="  dark:bg-[#202020]  
                                     focus:ring-0 focus-visible:ring-0 w-full rounded-none  text-gray-200/80"
                                    onKeyDown={(e) => 
                                        {onKeyPressForm(e, form.handleSubmit(onSubmit), () => {form.handleSubmit(onSubmit)})}}
                                    onBlur={(e) => {setIsEditing(false)}}
                                    />
                                </FormControl>
                                <FormMessage/>
                                <div className="ml-auto flex justify-end">
                                        <LetterRestriction limit={160} currentLength={currentTitle.length} />
                                    </div>
                            </FormItem>
                        )}
                        />
                        
                    </form>
                </Form>
                    </div>  
                ): (
                    <div className="hover:cursor-pointer" onClick={() => {setIsEditing(true)}}>
                        {!currentTitle.trim() ? (
                            <p className=" text-gray-900/70 dark:text-gray-200/80 mr-8 text-sm"> Noch kein Titel hinzugefügt </p>
                        ) : (
                            <p className=" text-gray-900/70 dark:text-gray-200/80 mr-8 text-sm "> {currentTitle} </p>
                        )}
                    </div>
                )}
            </div>
           
        </div>
     );
}
 
export default TitleInseratCreation;