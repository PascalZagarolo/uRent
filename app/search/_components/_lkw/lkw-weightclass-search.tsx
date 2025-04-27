'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScaleIcon } from "lucide-react";

const LkwWeightClassSearch = () => {
    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const [currentMin, setCurrentMin] = useState(currentObject['weightClass']);
    const [currentMax, setCurrentMax] = useState(currentObject['weightClassMax']);
    const [isLoading, setIsLoading] = useState(false);

    const { changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const router = useRouter();
    const params = useParams();

    const onSubmitMin = (selectedValue: string) => {
        changeSearchParams("weightClass", selectedValue);
        setCurrentMin(selectedValue)
    }

    const deleteWeightMin = () => {
        deleteSearchParams("weightClass");
        setCurrentMin(null)
    }

    const onSubmitMax = (selectedValue: string) => {
        changeSearchParams("weightClassMax", selectedValue);
        setCurrentMax(selectedValue)
    }

    const deleteWeightMax = () => {
        deleteSearchParams("weightClassMax");
        setCurrentMax(null)
    }

    const hasSelection = currentMin || currentMax;

    return (
        <div className="w-full space-y-2">
            <div className="flex items-center gap-x-2">
                <div className={cn(
                    "w-8 h-8 rounded-md flex items-center justify-center",
                    hasSelection 
                        ? "bg-indigo-600 text-white" 
                        : "bg-slate-100 text-slate-600"
                )}>
                    <ScaleIcon className="h-4 w-4" />
                </div>
                <Label className="text-base font-medium">
                    Gewichtsklasse
                </Label>
            </div>

            <div className={cn(
                "grid grid-cols-2 gap-x-2 relative pb-0.5",
                hasSelection && "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-indigo-500 after:to-indigo-300"
            )}>
                <Select
                    onValueChange={(value) => {
                        !value ? deleteWeightMin() : onSubmitMin(value)
                    }}
                    value={currentMin}
                    disabled={isLoading}
                >
                    <SelectTrigger className={cn(
                        "bg-white border focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md",
                        hasSelection && "border-indigo-200"
                    )}
                    disabled={isLoading}>
                        <SelectValue placeholder="Von" />
                    </SelectTrigger>

                    <SelectContent className="bg-white border w-full">
                        <SelectItem key="beliebig" value={null} className="font-medium">
                            Beliebig
                        </SelectItem>
                        <SelectItem value="350">3,5 t</SelectItem>
                        <SelectItem value="550">5,5 t</SelectItem>
                        <SelectItem value="750">7,5 t</SelectItem>
                        <SelectItem value="1200">12 t</SelectItem>
                        <SelectItem value="1800">18 t</SelectItem>
                        <SelectItem value="2600">26 t</SelectItem>
                        <SelectItem value="3200">32 t</SelectItem>
                        <SelectItem value="3900">39 t</SelectItem>
                        <SelectItem value="5000">{'>'} 39 t</SelectItem>
                    </SelectContent>
                </Select>
                
                <Select
                    onValueChange={(value) => {
                        !value ? deleteWeightMax() : onSubmitMax(value)
                    }}
                    value={currentMax}
                    disabled={isLoading}
                >
                    <SelectTrigger className={cn(
                        "bg-white border focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md",
                        hasSelection && "border-indigo-200"
                    )}
                    disabled={isLoading}>
                        <SelectValue placeholder="Bis" />
                    </SelectTrigger>

                    <SelectContent className="bg-white border w-full">
                        <SelectItem key="beliebig" value={null} className="font-medium">
                            Beliebig
                        </SelectItem>
                        <SelectItem value="350">3,5 t</SelectItem>
                        <SelectItem value="550">5,5 t</SelectItem>
                        <SelectItem value="750">7,5 t</SelectItem>
                        <SelectItem value="1200">12 t</SelectItem>
                        <SelectItem value="1800">18 t</SelectItem>
                        <SelectItem value="2600">26 t</SelectItem>
                        <SelectItem value="3200">32 t</SelectItem>
                        <SelectItem value="3900">39 t</SelectItem>
                        <SelectItem value="5000">{'>'} 39 t</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default LkwWeightClassSearch;