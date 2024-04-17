'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Car } from "lucide-react";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import axios from "axios";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { userTable } from "@/db/schema";



interface AddRezensionProps {
    currentUser : typeof userTable.$inferSelect;
}

const AddRezension: React.FC<AddRezensionProps> = ({
    currentUser
}) => {


    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();

    const canComment = currentUser?.id === params.profileId ? false : true;

    const formSchema = z.object({
        content : z.string().min(1, {
            message : "Beschreibung ist zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            content : ""
        }
    })

    const handleStarClick = (index: number) => {
        setRating(index);
    };

    //@ts-ignore
    const onSubmit = (values : z.infer<typeof formSchema> ) => {
        try {
            
            if(!rating) {
                toast.error("Du musst eine Bewertung abgeben");
                return null;
            }
            axios.post(`/api/rezension/${params.profileId}` , {content : values.content, rating : rating})
        } catch {
            toast.error("Es ist ein Fehler aufgetreten");
        } 
        
    };

    const { isSubmitting, isValid } = form.formState;

    return (
        <div className="mt-2 w-full">
            <Dialog>
                {canComment ? (
                    <DialogTrigger className="w-full" asChild>
                    <Button className="w-full border-gray-200 border bg-gray-200 dark:bg-[#0a0a0a] dark:hover:bg-[#191919]" variant="ghost">
                        Rezension verfassen
                    </Button>
                </DialogTrigger>
                ) : (
                    <p className="text-gray-800/50 font-semibold flex justify-center"> </p>
                )}
                <DialogContent className="w-[800px] dark:bg-[#0F0F0F] dark:border-gray-100">
                    <DialogHeader>
                        <DialogTitle className="dark:text-gray-100">
                            Rezension verfassen
                        </DialogTitle>
                        <p className="text-gray-900/50 text-xs dark:text-gray-100">
                            Teile deine Erfahrung mit diesem Mieter, um anderen Nutzern Anhalt zu geben.
                        </p>
                    </DialogHeader>

                    <div>
                        <h3 className="text-lg text-gray-900 font-semibold dark:text-gray-100 ">
                            Bewertung
                        </h3>

                        <div className="stars flex gap-x-2">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <i
                                    key={index}
                                    className={`fa-solid fa-star ${rating && index <= rating ? "active" : ""}`}
                                    onClick={() => handleStarClick(index)}
                                >
                                    <Car className="w-8 h-8" />
                                </i>
                            ))}
                        </div>
                        {rating && (
                            <p className={`flex justify-center text-lg font-semibold mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]`}>
                                {rating === 1 && "Schrecklich"}
                                {rating === 2 && "Naja"}
                                {rating === 3 && "In Ordnung"}
                                {rating === 4 && "Gut"}
                                {rating === 5 && "Fantastisch"}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="text-gray-900 font-semibold text-xs dark:text-gray-100/70">Hinterlasse eine Bemerkung</p>
                    </div>

                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField 
                        control = {form.control}
                        name="content"
                        render = {({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                    disabled={isSubmitting}
                                    className="dark:bg-[#0b0b0b] dark:border-gray-100 dark:text-gray-100"
                                    placeholder="Erzähle etwas über deine Erfahrung mit diesem Mieter"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2">
                            <DialogTrigger asChild>
                            <Button disabled={!isValid || isSubmitting}  
                            className="bg-gray-800 border-gray-200 border drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                             dark:bg-[#0b0b0b] dark:text-gray-100 dark:hover:bg-[#131313]" 
                            type="submit">
                                Beschreibung speichern
                            </Button>
                            </DialogTrigger>
                        </div>
                    </form>
                </Form>

                    
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddRezension;
