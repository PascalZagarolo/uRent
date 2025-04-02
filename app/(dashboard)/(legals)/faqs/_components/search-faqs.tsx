'use client'

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { faqs } from "@/db/schema";
import { getLabelByValueFaqs } from "@/hooks/faqs/convert-faq-values";
import { useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";

interface SearchFaqsProps {
    foundFaqs: typeof faqs.$inferSelect[];
}

const SearchFaqs = ({ foundFaqs }: SearchFaqsProps) => {
    const [title, setTitle] = useState("");
    const [renderedFaqs, setRenderedFaqs] = useState(foundFaqs);
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState<number | null>(null);

    useEffect(() => {
        if (title) {
            setRenderedFaqs(foundFaqs.filter((faq) => faq.question.toLowerCase().includes(title.toLowerCase())));
        } else {
            setRenderedFaqs(foundFaqs);
        }
    }, [title, foundFaqs]);

    const ref = useOnclickOutside(() => {
        setIsFocused(false);
        setIsOpen(null);
    });

    const handleOpenChange = (index: number, isOpen: boolean) => {
        if (isOpen) {
            setIsOpen(index);
            setIsFocused(false); // Optionally close the input when the dialog is opened
        } else {
            setIsOpen(null); // Reset the dialog when closed
        }
    };
    

    return (
        <div className="w-full relative">
            <div>
                Nach Hilfe suchen
            </div>
            <Input
                className="bg-[#191919] border-none"
                placeholder="Ich brauche Hilfe bei.."
                onFocus={() => setIsFocused(true)}
                value={title}
                onChange={(e) => { setTitle(e.target.value); }}
            />
            {((isFocused || isOpen !== null) && title) && (
                <div className="bg-[#212121] rounded-b-md shadow-xl w-full py-2 absolute top-full left-0 space-y-4" ref={ref}>
                    {
                        renderedFaqs?.length > 0 ? (
                            renderedFaqs.slice(0, 5).map((faq, index) => {
                                const adjustedIndex = index + 1; // Adjust the index to start at 1, otherwise first question wont load
                                return (
                                    <Dialog key={faq.question} open={isOpen !== null && isOpen === adjustedIndex} onOpenChange={(e) => handleOpenChange(adjustedIndex, e)}>
                                        <DialogTrigger asChild>
                                            <div className="text-sm text-gray-200/80 hover:text-gray-200 gap-x-2 
                                            font-medium hover:bg-[#292929] px-2 py-2 flex flex-row items-center hover:cursor-pointer">
                                                <div className="bg-indigo-800 p-1 text-xs rounded-md text-gray-200 whitespace-nowrap">
                                                    {getLabelByValueFaqs(faq?.category)}
                                                </div>
                                                <span className="w-full line-clamp-1 break-all">
                                                    {faq.question}
                                                </span>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="bg-[#191919] border-none">
                                            <div>
                                                <h3 className="text-base font-semibold flex flex-row items-center w-full break-all">
                                                    <span>{faq.question}</span>
                                                </h3>
                                                <div dangerouslySetInnerHTML={{ __html: faq?.answer }} className="text-sm text-gray-200/80 mt-4" />
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                );
                            })
                        ) : (
                            <div className="px-2 py-2 text-sm text-gray-200/60 flex flex-row items-center w-full justify-center">
                                Keine Ergebnisse gefunden..
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
}

export default SearchFaqs;
