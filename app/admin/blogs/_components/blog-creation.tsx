'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useBlogCategories } from "@/hooks/blogs/useBlogCategories";
import { PlusIcon, X } from "lucide-react";
import { useState } from "react";
import AddImageBlog from "./add-image";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const BlogCreation = () => {
    const [currentTitle, setCurrentTitle] = useState("");
    const [currentCategories, setCurrentCategories] = useState<Array<{ label: string, value: string }>>([]);
    const [currentContent, setCurrentContent] = useState("");

    const [isPublic, setPublic] = useState(false);

    const allCategories = useBlogCategories();

    // Dynamically filter available categories based on selected ones
    const availableCategories = allCategories.filter(
        (category) => !currentCategories.some((current) => current.value === category.value)
    );

    return (
        <div>
            <div className="mt-4 flex flex-col space-y-8">
                <div>
                    <AddImageBlog />
                </div>
                <div>
                    <Label>Titel</Label>
                    <div className="">
                        <Input
                            className="bg-[#191919] border-none"
                            placeholder="Titel des Blogs..."
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
                        <Select>
                            <SelectTrigger className="w-1/2 border-none bg-[#191919]">
                                <SelectValue placeholder="Wähle die Kategorie deines Blogs aus" />
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
                    <Label>Tags</Label>
                    <div className="flex-wrap space-y-2 w-full">
                        {currentCategories.length > 0 && (
                            <div className="flex flex-row items-center flex-wrap gap-y-2 gap-x-2 mt-2">
                                {currentCategories.map((category, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center bg-[#242424] hover:bg-[#232323] text-gray-200 hover:text-gray-300 
                                        rounded-full px-3 py-1 text-sm shadow-md transition-all duration-150 ease-in-out"
                                    >
                                        <button
                                            onClick={() => setCurrentCategories(currentCategories.filter((cat) => cat.value !== category.value))}
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <span className="mr-2">{category.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <Popover>
                            <PopoverTrigger>
                                <Button
                                    className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300 mt-2"
                                    size="sm"
                                >
                                    <PlusIcon className="w-4 h-4 mr-2" /> Tags hinzufügen
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="bg-[#191919] border-none shadow-lg sm:w-[700px]">
                                <div>
                                    <div>
                                        <h3 className="text-sm text-gray-200 font-semibold flex flex-row items-center">
                                            <PlusIcon className="w-4 h-4 mr-2" />
                                            Tags hinzufügen
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-3 gap-x-4 mt-2 gap-y-4">
                                        {availableCategories.map((category, index) => (
                                            <button
                                                key={index}
                                                className="text-sm bg-indigo-800 rounded-md p-2 hover:bg-indigo-900 text-gray-200 hover:text-gray-300"
                                                onClick={() => {
                                                    setCurrentCategories([...currentCategories, category]);
                                                }}
                                            >
                                                {category.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div>
                    <Label>Inhalt</Label>
                    <div className="">
                        <Textarea
                            value={currentContent}
                            onChange={(e) => setCurrentContent(e.target.value)}
                            className="bg-[#191919] border-none h-[600px]"
                            placeholder="Titel des Blogs..."
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-x-4 items-center mt-4">
                <Switch 
                onCheckedChange={(e) => {setPublic(e)}}
                />
                <Label className="text-sm font-semibold">
                    Blog ist Öffentlich
                </Label>
            </div>
            <div className="mt-4">
                <Button className="bg-indigo-800 text-gray-200 hover:bg-indigo-900 hover:text-gray-300 w-full">
                        Blog speichern
                </Button>
            </div>
        </div>
    );
}

export default BlogCreation;
