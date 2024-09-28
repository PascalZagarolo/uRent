'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useBlogCategories } from "@/hooks/blogs/useBlogCategories";
import { PlusIcon, X } from "lucide-react";
import { useState } from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import toast from "react-hot-toast";


import { useRouter } from "next/navigation";
import DescriptionArea from "../../blogs/_components/text-area";

const FaqCreation = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [currentTitle, setCurrentTitle] = useState("");
    const [currentTags, setCurrentTags] = useState<Array<{ label: string, value: string }>>([]);
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentContent, setCurrentContent] = useState("");
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [isPublic, setPublic] = useState(false);

    const allCategories = useBlogCategories();

    // Dynamically filter available categories based on selected ones
    const availableCategories = allCategories.filter(
        (category) => !currentTags.some((current) => current.value === category.value)
    );

    const router = useRouter();

    const onSave = async () => {
        setIsLoading(true);

        const usedTags = [
            ...(currentTags?.map(tag => tag.value) || []),
        ].join(",");

        try {
            const values = {
                title: currentTitle,
                content: currentContent,
                imageUrl: currentImage,
                isPublic: isPublic,
                category: currentCategory,
                tags: usedTags
            }

            await axios.post('/api/blog/create', values)
            toast.success('Blog erfolgreich erstellt')
            setCurrentTitle("");
            setCurrentContent("");
            setCurrentImage(null);
            setCurrentCategory("");
            setCurrentTags([]);
            setPublic(false);
            router.refresh();


        } catch (e: any) {
            console.log(e);
            toast.error('Fehler beim Erstellen des Blogs')
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div className="mt-4 flex flex-col space-y-8">
                
                <div>
                    <Label>Frage</Label>
                    <div className="">
                        <Input
                            className="bg-[#191919] border-none"
                            placeholder="Frage eingeben.."
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
                        <Select onValueChange={(e) => {
                            setCurrentCategory(e);
                        }}>
                            <SelectTrigger className="w-1/2 border-none bg-[#191919]">
                                <SelectValue placeholder="Wähle die Kategorie deines FAQs aus" />
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
                    Blog ist Öffentlich
                </Label>
            </div>
            <div className="mt-4">
                <Button className="bg-indigo-800 text-gray-200 hover:bg-indigo-900 hover:text-gray-300 w-full"
                    onClick={onSave}
                >
                    Blog speichern
                </Button>
            </div>
        </div>
    );
}

export default FaqCreation;
