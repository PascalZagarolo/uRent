'use client'

import { faqs } from "@/db/schema";
import { ArrowLeft, ImageIcon, Pencil, PencilIcon, TrashIcon, X } from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import FaqEdit from "./faq-edit";

interface FaqEditSelectProps {
    foundFaqs: typeof faqs.$inferSelect[]
}

const FaqEditSelect = ({ foundFaqs }: FaqEditSelectProps) => {

    const [selectedId, setSelectedId] = useState<string | null>(null);

    const router = useRouter();

    const onDelete = async (id: string) => {
        try {
            await axios.delete(`/api/faqs/${id}/delete`);
            toast.success('FAQ erfolgreich gelöscht');
            router.refresh();
        } catch(e : any) {
            console.log(e);
            toast.error('Fehler beim Löschen des FAQ')
        }
    }

    return (
        <div>
            {selectedId ? (
                <div>
                    <div className="mt-4 flex flex-row items-center text-sm font-semibold gap-x-2 hover:underline hover:cursor-pointer"
                        onClick={() => setSelectedId(null)}
                    >
                        <ArrowLeft className="w-4 h-4 text-gray-200 hover:text-gray-300" />
                        Zurück zur FAQ Auswahl
                    </div>
                    <FaqEdit
                        thisFaq={foundFaqs.find((faq) => faq.id === selectedId) as any}
                        deleteCurrentFaq={() => setSelectedId(null)}
                    /> 
                </div>

            ) : (
                <div className="gap-y-4 mt-4">
                    {
                        foundFaqs.length > 0 ? (
                            foundFaqs.map((blog) => (
                                <div className="w-full bg-[#131313] rounded-md p-2 hover:cursor-pointer shadow-lg"
                                key={blog.id}
                                >
                                    <div className="">
                                        <div className="text-sm flex-grow flex items-center line-clamp-1 font-semibold break-all hover:underline">
                                            <div>
                                                {blog.question}
                                            </div>
                                            <div className="flex justify-end ml-auto">
                                                <Button size="sm" variant="ghost" onClick={() => setSelectedId(blog.id)} key={blog.id}>
                                                    <PencilIcon className="w-4 h-4 text-gray-200" />
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button className="" size="sm" variant="ghost">
                                                            <TrashIcon className="w-4 h-4 text-rose-600" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="border-none dark:bg-[#191919]">
                                                        <div>
                                                            <div className="text-lg font-semibold flex flex-row items-center">
                                                                <X className="w-4 h-4 mr-2 text-rose-600" />
                                                                Faq wirklich löschen?
                                                            </div>
                                                            <p className="text-xs text-gray-200/60">
                                                                Gelöschte Faqs können nicht wiederhergestellt werden.
                                                            </p>
                                                            <div className="mt-4 flex justify-end">
                                                                <AlertDialogAction asChild>
                                                                <Button className="bg-rose-600 hover:bg-rose-700 text-gray-200 hover:text-gray-300"
                                                                onClick={() => {onDelete(blog.id)}}
                                                                >
                                                                        Löschen
                                                                    </Button>
                                                                </AlertDialogAction>
                                                                <AlertDialogCancel asChild>
                                                                    <Button variant="ghost" className="border-none">
                                                                        Abbrechen
                                                                    </Button>
                                                                </AlertDialogCancel>
                                                            </div>
                                                        </div>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            {blog.answer && (
                                                <div dangerouslySetInnerHTML={{ __html: blog.answer }} />

                                            )}
                                                
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="mt-4 text-sm text-gray-200/60">
                                Keine Faqs gefunden..
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
}

export default FaqEditSelect;