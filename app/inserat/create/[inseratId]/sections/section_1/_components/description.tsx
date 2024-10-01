'use client'


import LetterRestriction from "@/components/letter-restriction";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { inserat } from "@/db/schema";
import { useUnsavedChanges } from "@/store";

import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { AppWindow } from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface DescriptionInseratCreationProps {
    thisInserat: typeof inserat.$inferSelect;
}

const DescriptionInseratCreation: React.FC<DescriptionInseratCreationProps> = ({
    thisInserat
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentDescription, setCurrentDescription] = useState(thisInserat?.description || "");

    const { deleteCurrent, currentChanges, changeCurrent } = useUnsavedChanges()

    useEffect(() => {

        const setAmount = async () => {
            if (currentDescription) {
                await changeCurrent("description", currentDescription);
            } else {
                deleteCurrent("description");
            }
        }
        setAmount();

    }, [currentDescription])

    useEffect(() => {
        changeCurrent("description", thisInserat?.description)
    }, [])

    const router = useRouter();



    const formSchema = z.object({
        description: z.string().min(3, {
            message: "Titel zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: thisInserat.description || ""
        }
    })


    const onSubmit = () => {
        try {

            const values = {
                description: currentDescription?.trim()
            }

            setIsLoading(true);
            axios.patch(`/api/inserat/${thisInserat.id}`, values)
            toast.success("Beschreibung erfolgreich gespeichert")
            setTimeout(() => {
                router.refresh();
            }, 1000)
        } catch {
            toast.error("Fehler beim Speichern der Beschreibung")
        } finally {
            setIsLoading(false);
            setIsEditing(false);
        }
    }


    function handleKeyPress(event: any) {
        if ((event.key === 'Escape' || event.button === 0) && isEditing) {
            setIsEditing(false);

            form.handleSubmit(onSubmit);
        }
    }



    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isEditing]);





    return (
        <div className="w-full" >
            <h1 className="text-sm flex justify-start  font-semibold    text-gray-200 items-center"
            >
                Beschreibung *

              

            </h1>

            <div className=" bg-white dark:bg-[#202020]  shadow-xl hover:bg-[#212121] hover:cursor-pointer p-4 rounded-md  h-[320px]" onClick={() => { setIsEditing(true) }} >
                {isEditing ? (
                    <div className="flex w-full h-full">
                        <Form {...form}>
                            <form className="flex w-full h-full" onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="description"

                                    render={({ field }) => (
                                        <FormItem className="w-full h-full">
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    className="dark:bg-[#202020] hover:bg-[#212121]  h-full text-gray-200/80"
                                                    ref={textareaRef}
                                                    maxLength={5000}
                                                    onChange={(e) => { setCurrentDescription(e.target.value) }}
                                                    value={currentDescription}
                                                    onBlur={(e) => { setIsEditing(false) }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            <div className="ml-auto flex justify-end">
                                                <LetterRestriction limit={5000} currentLength={currentDescription?.length} />
                                            </div>
                                        </FormItem>
                                    )}

                                />

                            </form>
                        </Form>

                    </div>

                ) : (
                    <div className="">

                        {currentDescription ? (
                            <p className="  text-sm max-h-[320px] overflow-hidden dark:text-gray-200/80 ">
                                {currentDescription}
                            </p>
                        ) : (
                            <p className=" text-gray-900/50  text-sm dark:text-gray-200/70"> Gebe Informationen zu deinem Inserat an.. </p>
                        )}

                    </div>
                )}

            </div>


        </div>
    );
}

export default DescriptionInseratCreation;