'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "lodash";
import { cn } from "@/lib/utils";
import { users } from "@/db/schema";


interface ProfileDescriptionProps { 
    ownProfile : boolean;
    user : typeof users.$inferSelect;
}


const BusinessDescription: React.FC<ProfileDescriptionProps> = ({
    ownProfile,
    user
}) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = z.object({
        description: z.string().min(1, {
            message: "Beschreibung zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: user.description
        }
    })

    const [isUnfolded, setIsUnfolded] = useState(false);

    const { isSubmitting, isValid } = form.formState;

    const onEdit = () => {
        setIsEditing(isEditing => !isEditing)
    }

    const onChange = (values : z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            axios.patch(`/api/profile/${user.id}`, values);
            toast.success("Beschreibung erfolgreich geändert");
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
                        <div className=" flex items-center">
                        
                        <p className="text-gray-900 font-semibold  dark:text-gray-100 text-md">
                            Beschreibung
                        </p>
                        
                        {ownProfile && !isEditing && (
                            <Button className="ml-auto flex
                              dark:hover:bg-[#1f1f1f]" variant="ghost" size="sm" onClick={onEdit}>
                            <PencilIcon className="h-4 w-4 dark:text-gray-100"/>
                        </Button>
                        )}
                        </div>
                        <div className="mt-4">
                        {isEditing ? (
                             <Form {...form}>
                             <form onSubmit={form.handleSubmit(onChange)}>
                                 <FormField
                                     control={form.control}
                                     name="description"
                                     render={({ field }) => (
                                         <FormItem>
                                             <FormControl>
                                                 <Textarea
                                                     {...field} className="dark:bg-[#171717] border-none h-[200px]"
                                                     onBlur={() => {
                                                        setIsEditing(false);
                                                     }}
                                                 />
                                             </FormControl>
                                             <FormMessage/>
                                         </FormItem>
                                     )}
             
                                 />
                                 <div>
                                     <Button className="bg-gray-300 dark:border-none dark:hover:bg-[#272626] dark:text-gray-200 
                                      dark:bg-[#171717] hover:bg-gray-100 mt-2"  type="submit">
                                         Beschreibung ändern
                                     </Button>
                                 </div>
                             </form>
                         </Form>
                        ) : (
                            <div className="mt-2 text-sm">
                            
                        {user.description ? (
                            

                            <div>
                                <div className={cn("dark:text-gray-200 whitespace-pre-wrap break-words", isUnfolded ? "h-full" : "max-h-[72px]")}  style={{ overflow: 'hidden', wordWrap: 'break-word', whiteSpace: 'pre-line' }}>
                                {user.description} 

                            </div>
                            {user.description.length > 400 && (
                                <Button className=" w-full bg-gray-200 
                                focus-visible:ring-0 dark:bg-[#171717] dark:hover:bg-[#1f1f1f]
                                " variant="ghost" onClick={() => {setIsUnfolded(setIsUnfolded => !setIsUnfolded)}}>
                                    {isUnfolded ? "Weniger anzeigen" : "Mehr anzeigen"}
                                </Button>
                            )}
                            </div>
                           ) : (
                            <div className=" font-base text-gray-900/50  dark:text-gray-200/70">
                                Es wurde noch nichts geteilt
                            </div>
                           )}
                           
                        </div>
                        )}
                        </div>
                        
                    </div>
                    
                </div>
    );
}

export default BusinessDescription;