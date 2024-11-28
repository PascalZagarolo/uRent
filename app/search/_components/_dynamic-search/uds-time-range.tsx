import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isBefore } from "date-fns";
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
            <div className="flex flex-row gap-x-8">
                            <div className='w-1/2'>
                             
                                <Popover>
                                    <PopoverTrigger asChild>

                                        <Button
                                        disabled={disabled}
                                            variant={"outline"}
                                            className={cn(
                                                "w-full text-left font-normal dark:border-none dark:bg-[#0a0a0a] shadow-lg",
                                                !currentStart && "text-muted-foreground"
                                            )}
                                        >
                                            {currentStart ? (
                                                format(currentStart, "PPP", { locale: de })
                                            ) : (
                                                <span>Wähle ein Datum</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>

                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 dark:border-none rounded-md" align="start">
                                        <Calendar
                                            mode="single"
                                            locale={de}
                                            selected={currentStart}
                                            className="dark:bg-[#0a0a0a] dark:border-none"
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
                            </div>



                            <div className='w-1/2'>
                               
                                <Popover>
                                    <PopoverTrigger asChild>

                                        <Button
                                        disabled={disabled}
                                            variant={"outline"}
                                            className={cn(
                                                "w-full text-left font-normal dark:border-none dark:bg-[#0a0a0a] shadow-lg",
                                                !currentEnd && "text-muted-foreground"
                                            )}
                                        >
                                            {currentEnd ? (
                                                format(currentEnd, "PPP", { locale: de })
                                            ) : (
                                                <span>Wähle ein Datum</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>

                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 dark:border-none rounded-md" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={currentEnd}
                                            className="dark:bg-[#0a0a0a]"
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
                            </div>



                        </div>
        </div>
     );
}
 
export default UdsTimeSpanSearch;