'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSavedSearchParams } from "@/store";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useEffect, useState } from "react";

const DateSearch = () => {
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const currentObject = useSavedSearchParams((state) => state.searchParams);
    
    useEffect(() => {
        if (currentObject["startDate"] && currentObject["startDate"]) {
            setStartDate(new Date(currentObject["startDate"]));
        }

        if (currentObject["endDate"] && currentObject["endDate"]) {
            setEndDate(new Date(currentObject["endDate"]));
        }

    }, [currentObject["startDate"], currentObject["endDate"]]);

    const handleStartDateChange = (date: Date | undefined) => {
        if (date) {
            if (endDate && date > endDate) {
                setEndDate(null);
                deleteSearchParams("endDate");
            }
            setStartDate(date);
            changeSearchParams("startDate", date.toString());
        } else {
            setStartDate(null);
            deleteSearchParams("startDate");
        }
    };

    const handleEndDateChange = (date: Date | undefined) => {
        if (date) {
            if (startDate && date < startDate) {
                // If end date is before start date, set start date to the day before end date
                const newStartDate = new Date(date);
                newStartDate.setDate(date.getDate() - 1);
                setStartDate(newStartDate);
                changeSearchParams("startDate", newStartDate.toString());
            }
            setEndDate(date);
            changeSearchParams("endDate", date.toString());
        } else {
            setEndDate(null);
            deleteSearchParams("endDate");
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <CalendarIcon className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Mietzeitraum</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <div className="text-xs text-gray-400 mb-1 font-medium">Startdatum</div>
                    <div className="group">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "flex h-10 w-full rounded-md justify-start text-left font-normal border-0 bg-[#1e1e2a] text-gray-200 hover:bg-[#1e1e2a] hover:text-white focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                        !startDate && "text-gray-500"
                                    )}
                                >
                                    <CalendarIcon className=" h-4 w-4" />
                                    {startDate ? (
                                        format(startDate, "dd.MM.yyyy", { locale: de })
                                    ) : (
                                        <span>Datum wählen</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-[#1e1e2a] border border-indigo-900/30">
                                <Calendar
                                    mode="single"
                                    selected={startDate || undefined}
                                    onSelect={handleStartDateChange}
                                    initialFocus
                                    locale={de}
                                    className="rounded-md bg-[#1e1e2a]"
                                />
                            </PopoverContent>
                        </Popover>
                        <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${startDate ? 'w-full' : 'w-0'}`}></div>
                    </div>
                </div>

                <div>
                    <div className="text-xs text-gray-400 mb-1 font-medium">Enddatum</div>
                    <div className="group">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "flex h-10 w-full rounded-md justify-start text-left font-normal border-0 bg-[#1e1e2a] text-gray-200 hover:bg-[#1e1e2a] hover:text-white focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                        !endDate && "text-gray-500"
                                    )}
                                >
                                    <CalendarIcon className=" h-4 w-4" />
                                    {endDate ? (
                                        format(endDate, "dd.MM.yyyy", { locale: de })
                                    ) : (
                                        <span>Datum wählen</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-[#1e1e2a] border border-indigo-900/30">
                                <Calendar
                                    mode="single"
                                    selected={endDate || undefined}
                                    onSelect={handleEndDateChange}
                                    disabled={(date) =>
                                        startDate ? date < startDate : false
                                    }
                                    initialFocus
                                    locale={de}
                                    className="rounded-md bg-[#1e1e2a]"
                                />
                            </PopoverContent>
                        </Popover>
                        <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${endDate ? 'w-full' : 'w-0'}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DateSearch;