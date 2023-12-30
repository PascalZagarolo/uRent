'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inserat } from "@prisma/client";
import { PenIcon } from "lucide-react";
import { title } from "process";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface DescriptionInseratProps {
    inserat : Inserat;
}

const DescriptionInserat: React.FC<DescriptionInseratProps> = ({
    inserat
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState("");

    const formSchema = z.object({
        description : z.string().min(3, {
            message: "Titel zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            description : inserat.description || ""
        }
    })

    const onClick = () => {
        setIsEditing(isEditing => !isEditing);
    }


    return ( 
        <div className="w-full ">
            <h1 className="text-xl flex justify-start ml-8 font-semibold">
                Beschreibung <PenIcon className="w-4 h-4 ml-4 mt-1" onClick={onClick}/>
            </h1>
            <div>
                <Separator
                className="mt-2 w-8 bg-black ml-8"
                />
            </div>
            <div className="ml-8 mt-2">
                {isEditing ? (
                    <div className="flex"> 
                        <Form {...form}>
                    <form className="flex">
                        <FormField
                        control={form.control}
                        name="description"
                        render = {({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                    {...field}
                                    className=" w-[500px]"
                                    value={inserat.description || ""}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        
                        />
                        <div>
                            <Button variant="ghost" className="ml-4">
                                Beschreibung speichern
                            </Button>
                        </div>
                    </form>
                </Form>

                    </div>
                    
                ): (
                    <div className="outline outline-offset-8 outline-2 mr-16">

                        {inserat.description ? (
                            <p className="font-semibold text-blue-800 mt-4"> {inserat.description} </p>
                        ) : (
                            <p className="font-semibold text-gray-900/50 italic text-sm mt-4"> Noch keine Beschreibung hinzugefügt </p>
                        )}
                        
                    </div>
                )}
            
            </div>
            
            <Separator
                className="mt-2 w-8 bg-black ml-auto mr-16"
                />
        </div>
     );
}
 
export default DescriptionInserat;