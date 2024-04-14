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

import { AlertCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
            toast.success(values.multi ? "Auf Mehrfachinserat gewechselt." : "Auf Einzelinserat gewechselt.");
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
                        <Popover>
                            <PopoverTrigger>
                                <AlertCircle className="w-4 h-4 ml-2" />
                            </PopoverTrigger>
                            <PopoverContent className="dark:bg-[#191919] border-none w-[200px] text-xs p-4">
                                Falls du mehrere identische Fahrzeuge dieser Art hast, wähle &quot;Flotte&quot;,
                                falls du nur ein Fahrzeug dieser Art hast, wähle &quot;Einzel&quot;.
                            </PopoverContent>
                        </Popover>
                   
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
                        <SelectItem value="true">Flotte</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default SelectInseratType;
