'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useRef, useState } from "react";
import { GoLaw } from "react-icons/go";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "lodash";
import { cn } from "@/lib/utils";
import { userTable } from "@/db/schema";
import { useRouter } from "next/navigation";
import LetterRestriction from "@/components/letter-restriction";


interface ProfileDescriptionProps {
    ownProfile: boolean;
    user: typeof userTable.$inferSelect;
}


const Imprint: React.FC<ProfileDescriptionProps> = ({
    ownProfile,
    user
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentContent, setCurrentContent] = useState(user.business?.impressum);
    const router = useRouter();

    const formSchema = z.object({
        impressum: z.string().min(1, {
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
            impressum: user.business?.impressum
        }
    })

    const [isUnfolded, setIsUnfolded] = useState(false);

    const { isSubmitting, isValid } = form.formState;

    const onEdit = () => {
        setIsEditing(isEditing => !isEditing)
    }

    const onChange = () => {
        try {
            const values = {
                impressum: currentContent
            }
            setIsLoading(true);
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

    return (
        <div className="">
            <div className="p-4 rounded-md bg-[#1a1a25] border border-indigo-900/20 w-full">
                <div className="flex items-center">
                    <p className="text-gray-200 font-semibold text-md flex w-full items-center">
                        <GoLaw className="w-4 h-4 mr-2 text-indigo-400" /> Impressum
                    </p>
                    {ownProfile && (
                        <div className="ml-auto">
                            <Button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white" 
                                size="sm" 
                                onClick={onChange}
                                disabled={!currentContent || currentContent === user.business?.impressum || currentContent.trim() === ""}
                            >
                                Impressum speichern
                            </Button>
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    {isEditing ? (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onChange)}>
                                <FormField
                                    control={form.control}
                                    name="impressum"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    {...field} 
                                                    className="bg-[#1a1a25] border-indigo-900/30 h-[200px] text-gray-200"
                                                    onBlur={() => {
                                                        setIsEditing(false);
                                                    }}
                                                    onChange={(e) => { setCurrentContent(e.target.value) }}
                                                    value={currentContent}
                                                    ref={textareaRef}
                                                    maxLength={5000}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            <div className="ml-auto flex justify-end">
                                                <LetterRestriction limit={5000} currentLength={currentContent?.length ? currentContent?.length : 0} />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    ) : (
                        <div className="mt-2 text-sm font-medium">
                            {(currentContent?.trim() !== "" && currentContent) ? (
                                <div>
                                    <div className={cn("text-gray-200/90 whitespace-pre-wrap break-words",
                                        isUnfolded ? "h-full" : "h-full", ownProfile && "hover:cursor-pointer")} 
                                        style={{ overflow: 'hidden', wordWrap: 'break-word', whiteSpace: 'pre-line' }}
                                        onClick={() => { ownProfile && onEdit() }}
                                    >
                                        {currentContent}
                                    </div>
                                </div>
                            ) : (
                                <div className={cn("font-base text-gray-200/60", ownProfile && "hover:cursor-pointer")} 
                                    onClick={() => { ownProfile && onEdit() }}>
                                    Das Unternehmen hat noch nichts über sich geteilt..
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Imprint;