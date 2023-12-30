'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inserat } from "@prisma/client";
import { PenIcon } from "lucide-react";
import { title } from "process";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface TitleInseratProps {
    inserat : Inserat;
}

const TitleInserat: React.FC<TitleInseratProps> = ({
    inserat
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState("");

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

    const onClick = () => {
        setIsEditing(isEditing => !isEditing);
    }


    return ( 
        <div>
            <h1 className="text-xl flex justify-start ml-8 font-semibold">
                Titel deiner Anzeige <PenIcon className="w-4 h-4 ml-4 mt-1" onClick={onClick}/>
            </h1>
            <div className="ml-8 mt-2 w-80">
                {isEditing ? (
                    <div className="flex"> 
                        <Form {...form}>
                    <form className="flex">
                        <FormField
                        control={form.control}
                        name="title"
                        render = {({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                    {...field}
                                    className=" w-80"
                                    value={inserat.title || ""}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        
                        />
                        <div>
                            <Button variant="ghost" className="ml-4">
                                Titel speichern
                            </Button>
                        </div>
                    </form>
                </Form>

                    </div>
                    
                ): (
                    <div>
                        {currentTitle}
                    </div>
                )}
            
            </div>
            
            {isEditing && (
                <div>
                    ja!!
                </div>
            )}
        </div>
     );
}
 
export default TitleInserat;