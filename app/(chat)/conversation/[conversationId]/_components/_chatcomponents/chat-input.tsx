'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ImageIcon, Plane, Send } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UploadImage from "../upload-image";

const ChatInput = () => {

    const params = useParams();

    const formSchema = z.object({
        content: z.string().min(1, {
            message: "Kommentar ist zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        }
    })
    
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            axios.post(`/api/message/${params.conversationId}`, values);
            
        } catch {
            console.log("Fehler beim Kommentar absenden")
        } finally {
            setIsLoading(false);
            form.reset();
        }
    }

    return (
        <div className="bottom-0 flex justify-center sm:bg-white items-center  w-full dark:bg-[#0F0F0F]">
            
        <div className="w-full flex p-4">
        
        <UploadImage/>

<Form {...form} >
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full">

        <FormField
            control={form.control}
            
            name="content"
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormControl className="w-full">
                        <Input className="mt-auto mb-4 border-2 border-none text-black border-gray-300 w-full
                        dark:bg-[#080808] dark:text-gray-100"
                            placeholder="Schreibe eine Nachricht..."
                            {...field}
                        />
                    </FormControl>
                    
                </FormItem>
            )}
        />
        
        <div className="ml-2">
                        <Button className="bg-white  hover:bg-gray-100 dark:bg-[#080808] " type="submit">
                            <Send className="text-black dark:text-gray-100" />
                        </Button>
                    </div>

    </form>
</Form>
            </div>
        

        </div>
    );
}

export default ChatInput;