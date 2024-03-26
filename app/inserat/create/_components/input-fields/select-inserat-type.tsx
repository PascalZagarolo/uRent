'use client';

import { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { inserat } from "@/db/schema";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle } from "lucide-react";

interface SelectInseratTypeProps {
    thisInserat: typeof inserat.$inferSelect;
}

const SelectInseratType: React.FC<SelectInseratTypeProps> = ({ thisInserat }) => {
    const formSchema = z.object({
        multi: z.boolean({
            required_error: "Bitte wähle eine Kategorie aus"
        })
    });

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            multi: thisInserat.multi || false
        }
    });

    const [currentCategory, setCurrentCategory] = useState<boolean>(thisInserat.multi);

    const onSubmit = (selectedValue: string) => {
        try {
            setCurrentCategory(selectedValue === "true");

            const values = {
                multi: selectedValue === "true"
            };
            setIsLoading(true);
            axios.patch(`/api/inserat/${thisInserat.id}`, values);
            toast.success("Mehrfachanzeige : " + values.multi);
            setTimeout(() => {
                router.refresh();
            }, 400);
        } catch {
            toast.error("Fehler beim Speichern der Art");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center">
                    <BiSolidCategory className="w-4 h-4 mr-2" />
                    <p className="ml-2 font-semibold">Art des Inserats *</p>
                    <TooltipProvider>
                        <Tooltip>

                            <TooltipTrigger>
                                <AlertCircle className="w-4 h-4 ml-2" />
                            </TooltipTrigger>
                            <TooltipContent className="dark:bg-[#191919] border-none w-[200px] text-xs p-4">
                                Falls du mehrere identische Fahrzeuge dieser Art hast, wähle &quot;Mehrfach&quot;,
                                falls du nur ein Fahrzeug dieser Art hast, wähle &quot;Einzel&quot;.
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Label>
                <p className="font-semibold text-gray-800/50 text-xs dark:text-gray-100/80">
                    Hast du mehrere identische Fahrzeuge ?
                </p>
                <Select
                    onValueChange={(selectedValue: string) => {
                        onSubmit(selectedValue);
                    }}
                    defaultValue={String(thisInserat.multi)}
                    disabled={isLoading}
                >
                    <SelectTrigger
                        className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md"
                        disabled={isLoading}
                    >
                        <SelectValue placeholder="Wähle die Kategorie aus" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem value="false">Einzel</SelectItem>
                        <SelectItem value="true">Mehrfach</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default SelectInseratType;
