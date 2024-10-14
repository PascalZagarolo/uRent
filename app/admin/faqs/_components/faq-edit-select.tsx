'use client'

import { faqs } from "@/db/schema";
import { ArrowLeft, ImageIcon, Pencil, PencilIcon, TrashIcon, X } from "lucide-react";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import FaqEdit from "./faq-edit";
import { useFaqsCategories } from "@/hooks/faqs/useFaqsCategories";
import { cn } from "@/lib/utils";
import { getLabelByValueFaqs } from "@/hooks/faqs/convert-faq-values";
import { set } from 'date-fns';
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

interface FaqEditSelectProps {
    foundFaqs: typeof faqs.$inferSelect[]
}

const FaqEditSelect = ({ foundFaqs }: FaqEditSelectProps) => {

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentSearch, setCurrentSearch] = useState<string | null>(null);

    const [renderedAmount, setRenderedAmount] = useState(10);

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

    const [renderedFaqs, setRenderedFaqs] = useState(foundFaqs);

    const faqsCategories = useFaqsCategories();

    useEffect(() => {
        if(currentSearch) {
            setRenderedFaqs(foundFaqs.filter((faq) => faq.question.toLowerCase().includes(currentSearch.toLowerCase())));
        } else {
            setRenderedFaqs(foundFaqs);
        }
    },[currentSearch]);

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
                <div>
                    <div className="mt-4 text-sm font-semibold flex flex-row items-center">
                       <MagnifyingGlassIcon className="w-4 h-4 mr-2" /> {renderedFaqs?.length} FAQs gefunden..
                    </div>
                    <div className="flex flex-row items-center shadow-md mt-4 mb-4">
                        <Input 
                         className="border-none dark:bg-[#212121] dark:text-gray-200 rounded-r-none"
                         placeholder="Suche nach Frage.."
                         onChange={(e) => {setCurrentSearch(e.target.value)}}
                        />
                        <div className="p-3 bg-[#191919] items-center dark:bg-[#171717] rounded-l-none rounded-r-md">
                            <MagnifyingGlassIcon className="w-4 h-4 text-gray-200" />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-x-2 ">
                    {faqsCategories.map((category) => (
                           <Button variant="secondary" key={category.label} size="sm" className={cn("mt-4 shadow-lg bg-indigo-800 text-gray-200 text-sm hover:bg-indigo-900", 
                                                                                category.value === selectedCategory && 
                                                                                "bg-indigo-900/80 hover:bg-indigo-900/80 shadow-none text-gray-600 font-medium")} onClick={() => {
                            if(category.value === selectedCategory) {
                                setSelectedCategory(null);
                                setRenderedFaqs(foundFaqs);
                            } else {
                                setSelectedCategory(category.value);
                                setRenderedFaqs(foundFaqs.filter((faq) => faq.category === category.value));
                            }
                           }}>
                                 {category.label}
                           </Button>
                        ))}
                    </div>
                    <div className="gap-y-4 mt-4 space-y-4">
                    {
                        renderedFaqs.length > 0 ? (
                            renderedFaqs.slice(0,renderedAmount).map((blog) => (
                                <div className="w-full bg-[#131313] rounded-md px-4 py-2 hover:cursor-pointer shadow-lg"
                                key={blog.id}
                                >
                                    <div className="">
                                        <div className="text-sm flex-grow flex items-center line-clamp-1 font-semibold break-all ">
                                            <div className="flex flex-row items-center space-x-2">
                                                <div className="bg-indigo-800 p-1 rounded-md text-xs text-gray-200 font-medium whitespace-nowrap">
                                                    {getLabelByValueFaqs(blog.category)}
                                                </div>
                                                <span className="hover:underline line-clamp-1 break-all">
                                                    {blog.question}
                                                </span>
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
                                                <div dangerouslySetInnerHTML={{ __html: blog.answer }} className="text-sm" />

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
                    
                    {renderedFaqs?.length > renderedAmount && (
                        <div className="text-sm text-gray-200/60 hover:cursor-pointer hover:underline mt-2" onClick={() => {setRenderedAmount(renderedAmount + 10)}}>
                            Mehr laden..
                        </div>
                    )}

                    {renderedFaqs?.length !== 0 && renderedFaqs?.length <= renderedAmount && (
                        <div className="text-sm text-gray-200/60 hover:cursor-pointer hover:underline mt-2" onClick={() => {setRenderedAmount(10)}}>
                            Weniger anzeigen..
                        </div>
                    )}
                </div>
                </div>
            )}
        </div>
    );
}

export default FaqEditSelect;