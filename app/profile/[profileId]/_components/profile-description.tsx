'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { User } from "@prisma/client";
import { Separator } from "@/components/ui/separator";


interface ProfileDescriptionProps { 
    ownProfile : boolean;
    user : User;
}


const ProfileDescription: React.FC<ProfileDescriptionProps> = ({
    ownProfile,
    user
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
        <div className="flex mt-2">

                    <div className="flex mt-1   p-8  bg-white border-2 border-gray-900 mr-16 rounded-md w-1/2">
                        <div className="w-1/2 flex items-center">
                        <Separator
                         className="w-16 mr-8 bg-gray-700"
                        />
                        <p className="text-gray-900 font-semibold">
                            Beschreibung
                        </p>
                        <Separator
                         className="w-full ml-8 bg-gray-700"
                        />
                        </div>
                        <div className="">
                            
                           {user.description ? (
                            <div>
                                {user.description}
                            </div>
                           ) : (
                            <div>
                                Dieser Nutzer hat noch nichts über sich geteilt.
                            </div>
                           )}
                           
                        </div>
                    </div>
                </div>
    );
}

export default ProfileDescription;