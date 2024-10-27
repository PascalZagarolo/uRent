'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useRef, useState } from "react";


import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";
import { userTable } from "@/db/schema";
import { useRouter } from "next/navigation";
import LetterRestriction from "@/components/letter-restriction";
import useOnclickOutside from "react-cool-onclickoutside";



interface ProfileDescriptionProps {
    ownProfile: boolean;
    user: typeof userTable.$inferSelect;
}


const BusinessDescriptionNew: React.FC<ProfileDescriptionProps> = ({
    ownProfile,
    user
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentContent, setCurrentContent] = useState(user.business?.description);
    const router = useRouter();

    const formSchema = z.object({
        description: z.string().min(1, {
            message: "Beschreibung zu kurz"
        })
    })

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Focus on the textarea when isEditing becomes true
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isEditing]);

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

    const onChange = () => {
        try {

            setIsLoading(true);
            const values = {
                description: currentContent
            }
            axios.patch(`/api/business/${user.business.id}`, values);
            toast.success("Beschreibung erfolgreich geändert");
            router.refresh()
            setIsEditing(false);
        } catch {
            toast.error("Fehler beim Ändern der Beschreibung")
        } finally {
            setIsLoading(false);
        }
    }

    const ref = useOnclickOutside(() => {
        setIsEditing(false);
      });

    const contentRef = useRef<HTMLDivElement>(null);
    const [isTextTallerThan80px, setIsTextTallerThan80px] = useState(false);

    useEffect(() => {
        if (contentRef.current) {
            const isTaller = contentRef.current.scrollHeight > 80;
            setIsTextTallerThan80px(isTaller);
        }
    }, [currentContent]);

    const onDiscard = () => {
        setCurrentContent(user.business?.description);
        setIsEditing(false);
    }

    return (
        <div className="mt-4" >

            <div className="px-8  rounded-md     
                     w-full"
                     ref={ref}
                >
                <div className=" flex items-center" >

                    
                    {(ownProfile && isEditing) && (
                        
                        <div className="ml-auto mb-4 space-x-4">
                            <Button className="bg-gray-300 dark:border-none dark:hover:bg-indigo-900 dark:text-gray-200 
                                      dark:bg-indigo-800  mt-2"  type="submit" onClick={onChange}
                                disabled={!currentContent || currentContent === user.business?.description || currentContent.trim() === ""}
                            >
                                Beschreibung speichern
                            </Button>
                        
                        
                        <Button className="bg-[#222222] shadow-lg" variant="ghost"  type="submit" onClick={onDiscard}
                            disabled={!currentContent || currentContent === user.business?.description || currentContent.trim() === ""}
                        >
                            Änderungen verwerfen
                        </Button>
                    </div>
                    )} 

                </div>
                <div className="" >
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
                                                    {...field} className="dark:bg-[#171717] border-none h-[600px]"
                                                    
                                                    onChange={(e) => { setCurrentContent(e.target.value) }}
                                                    value={currentContent}
                                                    ref={textareaRef}
                                                    maxLength={5000}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            <div className="ml-auto flex justify-end">
                                                <LetterRestriction limit={5000} currentLength={currentContent?.length} />
                                            </div>
                                        </FormItem>
                                    )}

                                />
                                <div>

                                </div>
                            </form>
                        </Form>
                    ) : (
                        <div className=" text-sm font-medium">

                            {currentContent?.trim() !== "" && currentContent ? (


                                <div>
                                    <div className={cn("dark:text-gray-200/80 whitespace-pre-wrap break-words p-2",
                                        isUnfolded ? "h-full" : "", ownProfile && "hover:cursor-pointer hover:text-gray-200 hover:shadow-lg transition-all duration-200")} style={{ overflow: 'hidden', wordWrap: 'break-word', whiteSpace: 'pre-line' }}
                                        onClick={() => { ownProfile && onEdit() }}
                                    >
                                        {currentContent}

                                    </div>
                                    {/*
                                    
                                    {user?.business?.description?.length > 200 && (
                                        <Button className=" w-full bg-gray-200 
                                focus-visible:ring-0 dark:bg-[#171717] dark:hover:bg-[#1f1f1f]
                                " variant="ghost" onClick={() => { setIsUnfolded(setIsUnfolded => !setIsUnfolded) }}>
                                            {isUnfolded ? "Weniger anzeigen" : "Mehr anzeigen"}
                                        </Button>
                                    )}

                                    */}
                                </div>
                            ) : (
                                (user?.business?.description && ownProfile) ? (
                                    <div className={cn(" font-base text-gray-900/50  dark:text-gray-200/70", ownProfile && "hover:cursor-pointer")} onClick={() => { ownProfile && onEdit() }}>
                                        Erzähle potentiellen Kunden etwas über dich und dein Unternehmen..
                                    </div>
                                ) : (
                                    <div className={cn(" font-base text-gray-900/50  dark:text-gray-200/70", ownProfile && "hover:cursor-pointer")} onClick={() => { ownProfile && onEdit() }}>
                                        Das Unternehmen hat noch nichts über sich geteilt..
                                    </div>
                                )
                            )}

                        </div>
                    )}
                </div>

            </div>

        </div>
    );
}

export default BusinessDescriptionNew;