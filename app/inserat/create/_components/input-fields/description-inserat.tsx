'use client'


import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { inserat } from "@/db/schema";
import { useUnsavedChanges } from "@/store";

import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { AppWindow} from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface DescriptionInseratProps {
    thisInserat : typeof inserat.$inferSelect;
}

const DescriptionInserat: React.FC<DescriptionInseratProps> = ({
    thisInserat
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentDescription, setCurrentDescription] = useState(thisInserat?.description || "")

    const {currentChanges, changeCurrent} = useUnsavedChanges()

    useEffect(() => {
        const setAmount = async () => {
            await changeCurrent("description", currentDescription);
        
        }

        setAmount();
    }, [currentDescription])

    const router = useRouter();

    

    const formSchema = z.object({
        description : z.string().min(3, {
            message: "Titel zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            description : thisInserat.description || ""
        }
    })


    const onSubmit = () => {
        try {

            const values = {
                description : currentDescription
            }

            setIsLoading(true);
            axios.patch(`/api/inserat/${thisInserat.id}`, values)
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

    
    function handleKeyPress(event) {
        if ((event.key === 'Escape' || event.button === 0) && isEditing) {
            setIsEditing(false); 

            form.handleSubmit(onSubmit);
        }
      }

    

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isEditing]);
    


    

    return ( 
        <div className="w-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]" >
            <h1 className="text-md flex justify-start  font-semibold    text-gray-900  dark:text-gray-100 items-center" 
            >
               <AppWindow className="mr-2 h-4 w-4"/> Beschreibung * 
               {/* 
               <Button className="ml-auto dark:bg-[#0F0F0F] dark:hover:bg-[#1a1a1a] dark:text-gray-100 text-xs font-semibold"
               onClick={onSubmit}
               disabled={currentDescription === thisInserat.description || isLoading || !currentDescription}
               > Änderungen speichern </Button>
               */}
            </h1>
            
            <div className=" mt-2 bg-white dark:bg-[#0F0F0F] hover:cursor-pointer p-4 rounded-md  h-[160px]" onClick={() => {setIsEditing(true)}} >
                {isEditing ? (
                    <div className="flex w-full h-full"> 
                        <Form {...form}>
                    <form className="flex w-full h-full" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="description"
                    
                        render = {({field}) => (
                            <FormItem className="w-full h-full">
                                <FormControl>
                                    <Textarea
                                    {...field}
                                    className="  dark:bg-[#0F0F0F] h-full"
                                    ref={textareaRef}
                                    onChange={(e) => {setCurrentDescription(e.target.value)}}
                                    value={currentDescription}
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
                    <div className="">

                        {currentDescription  ? (
                            <p className=" text-gray-900 text-sm max-h-[100px] overflow-hidden dark:text-gray-100 ">
                            {currentDescription}
                          </p>
                        ) : (
                            <p className=" text-gray-900/50  text-sm dark:text-gray-200/70"> Gebe Informationen zu deinem Inserat an.. </p>
                        )}
                        
                    </div>
                )}
            
            </div>
            
            
        </div>
     );
}
 
export default DescriptionInserat;