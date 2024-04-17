'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useRef, useState } from "react";
import { GoLaw } from "react-icons/go";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "lodash";
import { cn } from "@/lib/utils";
import { userTable } from "@/db/schema";
import { useRouter } from "next/navigation";


interface ProfileDescriptionProps { 
    ownProfile : boolean;
    user : typeof userTable.$inferSelect;
}


const AddImpressum: React.FC<ProfileDescriptionProps> = ({
    ownProfile,
    user
}) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentContent, setCurrentContent] = useState(user.business?.impressum);
    const router = useRouter();

    const formSchema = z.object({
        impressum: z.string().min(1, {
            message: "Beschreibung zu kurz"
        })
    })

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Focus on the textarea when isEditing becomes true
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isEditing]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            impressum: user.business?.impressum
        }
    })

    const [isUnfolded, setIsUnfolded] = useState(false);

    const { isSubmitting, isValid } = form.formState;

    const onEdit = () => {
        setIsEditing(isEditing => !isEditing)
    }

    const onChange = () => {
        try {
            const values = {
                impressum : currentContent
            }
            setIsLoading(true);
            axios.patch(`/api/business/${user.business.id}`, values);
            toast.success("Beschreibung erfolgreich geändert");
            router.refresh()
            setIsEditing(false);
        } catch {
            toast.error("Fehler beim Ändern der Beschreibung")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="mt-2 ">

                    <div className="  p-4  bg-white dark:bg-[#191919] rounded-md dark:border-[#191919] border border-gray-200    
                     w-full">
                        <div className=" flex items-center" >
                        
                        <p className="text-gray-900 font-semibold  dark:text-gray-100 text-md flex w-full items-center">
                        <GoLaw className="w-4 h-4 mr-2" /> Impressum 
                        </p>
                        {ownProfile && (
                            <div className="ml-auto"> 
                            <Button className="bg-gray-300 dark:border-none dark:hover:bg-[#272626] dark:text-gray-200 
                                      dark:bg-[#171717] hover:bg-gray-100 mt-2" size="sm" onClick={onChange}
                                      disabled={!currentContent || currentContent === user.business?.impressum || currentContent.trim() === ""}
                                      >
                                         Impressum speichern
                                     </Button>
                                </div>
                        )}
                        
                        </div>
                        <div className="mt-4" >
                        {isEditing ? (
                             <Form {...form}>
                             <form onSubmit={form.handleSubmit(onChange)}>
                                 <FormField
                                     control={form.control}
                                     name="impressum"
                                     render={({ field }) => (
                                         <FormItem>
                                             <FormControl>
                                                 <Textarea
                                                     {...field} className="dark:bg-[#171717] border-none h-[200px]"
                                                     onBlur={() => {
                                                        setIsEditing(false);
                                                     }}
                                                     onChange={(e) => {setCurrentContent(e.target.value)}}
                                                     value={currentContent}
                                                     ref={textareaRef}
                                                 />
                                             </FormControl>
                                             <FormMessage/>
                                         </FormItem>
                                     )}
             
                                 />
                                 <div>
                                     
                                 </div>
                             </form>
                         </Form>
                        ) : (
                            <div className="mt-2 text-sm font-medium">
                            
                        {(currentContent?.trim() !== "" && currentContent)? (
                            

                            <div>
                                <div className={cn("dark:text-gray-200 whitespace-pre-wrap break-words", 
                                isUnfolded ? "h-full" : "max-h-[72px]", ownProfile && "hover:cursor-pointer")}  style={{ overflow: 'hidden', wordWrap: 'break-word', whiteSpace: 'pre-line' }}
                                onClick={() => {ownProfile && onEdit()}}
                                >
                                {currentContent} 

                            </div>
                            {user?.business?.impressum?.length > 400 && (
                                <Button className=" w-full bg-gray-200 
                                focus-visible:ring-0 dark:bg-[#171717] dark:hover:bg-[#1f1f1f]
                                " variant="ghost" onClick={() => {setIsUnfolded(setIsUnfolded => !setIsUnfolded)}}>
                                    {isUnfolded ? "Weniger anzeigen" : "Mehr anzeigen"}
                                </Button>
                            )}
                            </div>
                           ) : (
                            <div className={cn(" font-base text-gray-900/50  dark:text-gray-200/70", ownProfile && "hover:cursor-pointer")} onClick={() => {ownProfile && onEdit()}}>
                                Das Unternehmen hat noch nichts über sich geteilt..
                            </div>
                           )}
                           
                        </div>
                        )}
                        </div>
                        
                    </div>
                    
                </div>
    );
}

export default AddImpressum;