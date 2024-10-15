'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import { ArrowLeft, PlusIcon, X } from "lucide-react";
import { useState } from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import toast from "react-hot-toast";

import { blog, faqs } from "@/db/schema";
import { getLabelByValue } from "@/hooks/blogs/convert-values";
import { useFaqsCategories } from "@/hooks/faqs/useFaqsCategories";
import DescriptionArea from "../../blogs/_components/text-area";


interface FaqCreationProps {
    thisFaq : typeof faqs.$inferSelect
    deleteCurrentFaq : () => void;
    onChange : (changedFaq) => void;
}

const FaqEdit = ({ thisFaq, onChange, deleteCurrentFaq }: FaqCreationProps) => {

    const [isLoading, setIsLoading] = useState(false);

    const [currentTitle, setCurrentTitle] = useState(thisFaq?.question);

    const [currentCategory, setCurrentCategory] = useState(thisFaq?.category);
    const [currentContent, setCurrentContent] = useState(thisFaq?.answer);
  
    const [isPublic, setPublic] = useState(thisFaq?.isPublic);

    const allCategories = useFaqsCategories();

    // Dynamically filter available categories based on selected ones
   
    

    const onSave = async () => {
        setIsLoading(true);

        

        try {
            const values = {
                question: currentTitle,
                answer: currentContent,
                isPublic: isPublic,
                category: currentCategory,

            }

            const patchedFaq = await axios.patch(`/api/faqs/${thisFaq?.id}/edit`, values)
            toast.success('Faq erfolgreich bearbeitet')
            
            onChange(patchedFaq.data[0]);

        } catch (e: any) {
            console.log(e);
            toast.error('Fehler beim Erstellen des Faqs')
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            
            <div className="mt-4 flex flex-col space-y-8">
                
                <div>
                    <Label>Titel</Label>
                    <div className="">
                        <Input
                            className="bg-[#191919] border-none"
                            placeholder="Frage des Faqs..."
                            value={currentTitle}
                            onChange={(e) => setCurrentTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <Label>
                        Kategorie
                    </Label>
                    <div>
                        <Select 
                        value={currentCategory}
                        onValueChange={(e) => {
                            setCurrentCategory(e);
                        }}>
                            <SelectTrigger className="w-1/2 border-none bg-[#191919]">
                                <SelectValue placeholder="Wähle die Kategorie deines Faqs aus" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#191919] border-none">
                                <SelectGroup>
                                    <SelectLabel>Kategorie</SelectLabel>
                                    {allCategories.map((category, index) => (
                                        <SelectItem key={index} value={category.value}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                
                <div>

                    <DescriptionArea currentContent={currentContent} setCurrentContent={setCurrentContent} />
                </div>
                
            </div>
            <div className="flex flex-row gap-x-4 items-center mt-4">
                <Switch
                    onCheckedChange={(e) => { setPublic(e) }}
                />
                <Label className="text-sm font-semibold">
                    Faq ist Öffentlich
                </Label>
            </div>
            <div className="mt-4">
                <Button className="bg-indigo-800 text-gray-200 hover:bg-indigo-900 hover:text-gray-300 w-full"
                    onClick={onSave}
                >
                    Änderungen speichern
                </Button>
            </div>
        </div>
    );
}

export default FaqEdit;
