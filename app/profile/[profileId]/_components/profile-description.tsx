'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Pencil } from "lucide-react";

interface ProfileDescriptionProps { 
    ownProfile : boolean;
}


const ProfileDescription: React.FC<ProfileDescriptionProps> = ({
    ownProfile
}) => {

    const [isEditing, setIsEditing] = useState(false);

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

    const { isSubmitting, isValid } = form.formState;



    return (
        <div>

            {isEditing ? (
                <Form {...form}>
                <form>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}

                    />
                    <div>
                        <Button className="bg-blue-800" size="sm" mt->
                            Beschreibung ändern
                        </Button>
                    </div>
                </form>
            </Form>
            ) : 
            <div className="flex">
                <p className="text-sm font-semibold text-gray-800/50 italic">Noch keine Beschreibung hinzugefügt</p>
                {ownProfile && (
                    <Pencil className="h-4 w-4 ml-2 hidden"/>
                )}
            </div>    
            }
            
        </div>
    );
}

export default ProfileDescription;