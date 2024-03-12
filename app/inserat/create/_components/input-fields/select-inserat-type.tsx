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
import { Inserat } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

interface SelectInseratTypeProps {
    inserat: Inserat;
}

const SelectInseratType: React.FC<SelectInseratTypeProps> = ({ inserat }) => {
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
            multi: inserat.multi || false
        }
    });

    const [currentCategory, setCurrentCategory] = useState<boolean>(inserat.multi);

    const onSubmit = (selectedValue: string) => {
        try {
            setCurrentCategory(selectedValue === "true");

            const values = {
                multi: selectedValue === "true"
            };
            setIsLoading(true);
            axios.patch(`/api/inserat/${inserat.id}`, values);
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
                </Label>
                <p className="font-semibold text-gray-800/50 text-xs dark:text-gray-100/80">
                    Vermietest du mehr als ein Fahrzeug?
                </p>
                <Select
                    onValueChange={(selectedValue: string) => {
                        onSubmit(selectedValue);
                    }}
                    defaultValue={String(inserat.multi)}
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
