'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSavedSearchParams } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CautionSearch = () => {
    const currentObject: any = useSavedSearchParams((state) => state.searchParams);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState<string>(currentObject["caution"] || "");
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const setCaution = (currentCaution: number) => {
        if (currentCaution) {
            changeSearchParams("caution", currentCaution);
        } else {
            deleteSearchParams("caution");
        }
    }

    const formSchema = z.object({
        caution: z.preprocess(
            (args) => (args === '' ? undefined : args),
            z.coerce
                .number({ invalid_type_error: 'Preis muss eine Nummer sein' })
                .positive('Price must be positive')
                .optional()
        ),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            caution: currentObject["caution"] || undefined
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/[^0-9]/g, '');
        setCurrentValue(newValue);
        setCaution(Number(newValue));
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <Banknote className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Kautionsgebühr</h3>
            </div>
            
            <div className="group">
                <Input
                    type="text"
                    value={currentValue}
                    className="h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24] placeholder:text-gray-500"
                    placeholder="Maximale Kaution in €"
                    onChange={handleInputChange}
                />
                <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentValue ? 'w-full' : 'w-0'}`}></div>
            </div>
        </div>
    );
}

export default CautionSearch;