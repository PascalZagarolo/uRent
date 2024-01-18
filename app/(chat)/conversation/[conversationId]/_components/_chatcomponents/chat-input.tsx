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
            setTimeout(() => {
                router.refresh()
            }, 1000)
        } catch {
            console.log("Fehler beim Kommentar absenden")
        } finally {
            setIsLoading(false);
            form.reset();
        }
    }

    return (
        <div className="absolute bottom-0 flex justify-center  ">
            <div className="flex bg-white  p-4 rounded-lg">
            <div className="mr-2">
                <Button className="bg-white border-2 border-gray-400 hover:bg-gray-100">
                    <ImageIcon className="text-black" />
                </Button>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex  ">

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="mt-auto mb-4 border-2 border-none text-black border-gray-300 w-[680px]"
                                        placeholder="Schreibe eine Nachricht..."
                                        {...field}
                                    />
                                </FormControl>
                                
                            </FormItem>
                        )}
                    />
                    <div className="ml-2">
                        <Button className="bg-white border-2 border-black hover:bg-gray-100" type="submit">
                            <Send className="text-black" />
                        </Button>
                    </div>
                </form>
            </Form>
            </div>


        </div>
    );
}

export default ChatInput;