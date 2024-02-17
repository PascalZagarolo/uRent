'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { User } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "lodash";
import { cn } from "@/lib/utils";


interface ProfileDescriptionProps { 
    ownProfile : boolean;
    user : User;
}


const ProfileDescription: React.FC<ProfileDescriptionProps> = ({
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
            description: ""
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
        } catch {
            toast.error("Fehler beim Ändern der Beschreibung")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="mt-2 ">

                    <div className="mt-1  p-8  bg-white dark:bg-[#10121a]  border border-gray-200 mr-16   drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] w-full">
                        <div className=" flex items-center">
                        <Separator
                         className="w-16 mr-8 bg-gray-700 dark:bg-gray-200"
                        />
                        <p className="text-gray-900 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] dark:text-gray-100">
                            Beschreibung
                        </p>
                        <Separator
                         className="w-1/2 ml-8 bg-gray-700 dark:bg-gray-200"
                        />
                        {ownProfile && (
                            <Button className="ml-12 flex bg-gray-200 dark:bg-[#0d0f15]" variant="ghost" onClick={onEdit}>
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
                                                     {...field}
                                                 />
                                             </FormControl>
                                             <FormMessage/>
                                         </FormItem>
                                     )}
             
                                 />
                                 <div>
                                     <Button className="bg-gray-300 border-2 hover:bg-gray-100 mt-2" size="sm" type="submit">
                                         Beschreibung ändern
                                     </Button>
                                 </div>
                             </form>
                         </Form>
                        ) : (
                            <div className="mt-2 ">
                            
                        {user.description ? (
                            

                            <div>
                                <div className={cn("dark:text-gray-100", isUnfolded ? "" : "h-[80px]")}  style={{ overflow: 'hidden', wordWrap: 'break-word', whiteSpace: 'pre-line' }}>
                                {user.description}
                            </div>
                            <Button className="mt-4 w-full bg-gray-200 border-2 border-gray-300" variant="ghost" onClick={() => {setIsUnfolded(setIsUnfolded => !setIsUnfolded)}}>
                                Mehr anzeigen
                            </Button>
                            </div>
                           ) : (
                            <div className="mt-4 font-semibold text-gray-900/50 italic dark:text-gray-100/70">
                                Du hast noch nichts über dich geteilt...
                            </div>
                           )}
                           
                        </div>
                        )}
                        </div>
                        
                    </div>
                    
                </div>
    );
}

export default ProfileDescription;