import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isBefore } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

interface UdsTimeSpanProps {
    currentStart : Date;
    currentEnd : Date;
    setCurrentStart : (date: Date) => void;
    setCurrentEnd : (date: Date) => void;
}

const UdsTimeSpan = ({
    currentStart,
    currentEnd,
    setCurrentStart,
    setCurrentEnd,
} : UdsTimeSpanProps) => {
    return ( 
        <div>
            <div className="flex flex-row gap-x-8">
                            <div className='w-1/2'>
                                <Label>Anfangsdatum*</Label>
                                <Popover>
                                    <PopoverTrigger asChild>

                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full text-left font-normal dark:border-none bg-[#222222] shadow-lg",
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
                                <Label>Enddatum*</Label>
                                <Popover>
                                    <PopoverTrigger asChild>

                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full text-left font-normal dark:border-none bg-[#222222] shadow-lg",
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
 
export default UdsTimeSpan;