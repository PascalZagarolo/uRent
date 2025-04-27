import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isBefore, isValid } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

interface UdsTimeSpanSearchProps {
    setStartDate: (date: Date) => void;
    setEndDate: (date: Date) => void;
    endDate: Date;
    startDate: Date;
    disabled?: boolean;
}

const UdsTimeSpanSearch = ({ setStartDate, setEndDate, endDate, startDate, disabled }) => {
  const [currentStart, setCurrentStart] = useState<Date | undefined>(startDate ? startDate : undefined);
  const [currentEnd, setCurrentEnd] = useState<Date | undefined>(endDate ? endDate : undefined);

    return ( 
        <div>
            <div className="flex flex-row gap-x-4">
                <div className='w-1/2'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                disabled={disabled}
                                variant={"outline"}
                                className={cn(
                                    "w-full h-10 text-left font-normal transition-all duration-200 dark:border-0 dark:bg-[#1e1e2a] shadow-md text-gray-200 hover:bg-[#1e1e2a] hover:text-white focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                    !currentStart && "text-gray-500"
                                )}
                            >
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                {isValid(currentStart) ? (
                                    format(currentStart, "dd.MM.yyyy", { locale: de })
                                ) : (
                                    <span>Datum wählen</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[#1e1e2a] border border-indigo-900/30 rounded-md" align="start">
                            <Calendar
                                mode="single"
                                locale={de}
                                selected={currentStart}
                                className="rounded-md bg-[#1e1e2a]"
                                onSelect={(date) => {
                                    setStartDate(date);
                                    setCurrentStart(date);
                                }}
                                disabled={(date) =>
                                    isBefore(date, new Date().setHours(0, 0, 0, 0)) || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentStart ? 'w-full' : 'w-0'}`}></div>
                </div>

                <div className='w-1/2'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                disabled={disabled}
                                variant={"outline"}
                                className={cn(
                                    "w-full h-10 text-left font-normal transition-all duration-200 dark:border-0 dark:bg-[#1e1e2a] shadow-md text-gray-200 hover:bg-[#1e1e2a] hover:text-white focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                    !currentEnd && "text-gray-500"
                                )}
                            >
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                {isValid(currentEnd) ? (
                                    format(currentEnd, "dd.MM.yyyy", { locale: de })
                                ) : (
                                    <span>Datum wählen</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[#1e1e2a] border border-indigo-900/30 rounded-md" align="start">
                            <Calendar
                                mode="single"
                                selected={currentEnd}
                                className="rounded-md bg-[#1e1e2a]"
                                locale={de}
                                onSelect={(date) => {
                                    setEndDate(date);
                                    setCurrentEnd(date);
                                }}
                                disabled={(date) =>
                                    isBefore(date, new Date().setHours(0, 0, 0, 0)) || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentEnd ? 'w-full' : 'w-0'}`}></div>
                </div>
            </div>
        </div>
    );
}
 
export default UdsTimeSpanSearch;