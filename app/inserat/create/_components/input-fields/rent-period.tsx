'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { inserat } from "@/db/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { format } from "date-fns";
import { de } from "date-fns/locale";

import { AlertCircle, CalendarClockIcon, CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { boolean, z } from "zod";

interface RentPeriodProps {
    thisInserat : typeof inserat.$inferSelect
}

const RentPeriod: React.FC<RentPeriodProps> = ({
    thisInserat
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isDateless, setIsDateless] = useState(thisInserat.annual);

    const [currentStart, setCurrentStart] = useState<Date | null>(thisInserat.begin ? thisInserat.begin : new Date());
    const [currentEnd, setCurrentEnd] = useState<Date | null>(thisInserat.end ? thisInserat.end : new Date());

    const router = useRouter();

    const formSchema = z.object({
        begin: z.date({
            required_error: "Ein Startdatum ist erforderlich",
        }), end: z.date({
            required_error: "Ein Abschlussdatum ist erforderlich",
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            begin: new Date(),
            end: new Date()

        }
    })

    const onSubmit = () => {
        try {   
            setIsLoading(true);

            const values = {
                begin : currentStart,
                end : currentEnd,
                annual: false
            }

            axios.patch(`/api/inserat/${thisInserat.id}`, values);
            toast.success("Datum erfolgreich festgelegt");
            setTimeout(() => {
                router.refresh();
            
            },500)
        } catch {
            toast.error("Etwas ist schief gelaufen...")
        } finally {
            setIsLoading(false);
        }
    }

    const onAnnual = (checked : boolean) => {
        try {
            console.log(checked)

            setIsLoading(true);
            setIsDateless(checked);
            const values = {
                //@ts-ignore
                begin: null,
                //@ts-ignore
                end : null,
                annual: checked,
                dailyPrice : true,
            }

            console.log(values)

            if(checked) {
                axios.patch(`/api/inserat/${thisInserat.id}`, values);
            }
            toast.success(checked ? "Angebot ist nun datumsunabhängig" : "Angebot ist nun datumsabhängig")
            setTimeout(() => {
                router.refresh();
            }, 500)
        } catch {
            toast.error("Etwas ist schief gelaufen...")
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(currentStart > currentEnd) {
            setCurrentEnd(currentStart);
        }
    },[currentStart])


    return (
        <div className="w-full">
            <div className="bg-white dark:bg-[#0b0b0b] p-4 w-full mt-2 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" >
                <div className="flex">
                    <Checkbox
                    className="dark:bg-[#0F0F0F]"
                    checked={isDateless}
                    onCheckedChange={(checked) => {
                        console.log(checked)
                        onAnnual(Boolean(checked));
                        
                    }}
                    /> 
                    <p className="ml-2 font-semibold  text-sm ">
                        Dauerhaftes Inserat
                    </p>
                    <Popover>
                            <PopoverTrigger>
                                <AlertCircle className="w-4 h-4 ml-2" />
                            </PopoverTrigger>
                            <PopoverContent className="dark:bg-[#191919] border-none w-[200px] text-xs p-4">
                                Dauerhafte Inserate bleiben immer online und sind nicht an ein Datum gebunden. <br/>
                                Du kannst diese dann manuell selber als belegt oder als verfügbar markieren.
                            </PopoverContent>
                    </Popover>
                </div>
        </div>

        <div className="bg-white dark:bg-[#0b0b0b] p-4 w-full mt-2 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" >
                <div className="flex">
                    <Checkbox
                    className="dark:bg-[#0F0F0F]"
                    checked={!isDateless}
                    onCheckedChange={(checked) => {
                        console.log(checked)
                        onAnnual(Boolean(checked ? false : true));
                        
                    }}
                    /> 
                    <p className="ml-2 font-semibold  text-sm ">
                        Zeitlich begrenztes Inserat
                    </p>
                    
                        <Popover>

                            <PopoverTrigger>
                                <AlertCircle className="w-4 h-4 ml-2" />
                            </PopoverTrigger>
                            <PopoverContent className="dark:bg-[#191919] border-none w-[200px] text-xs p-4">
                                Zeitlich begrenzte Inserate werden automatisch nach dem Ablaufen des Datums privat gestellt. <br/>
                                Du kannst das Datum jederzeit ändern.
                            </PopoverContent>
                        </Popover>
                    
                </div>
        </div>

            <div className="  justify-center dark:bg-[#0b0b0b] dark:border-gray-100 dark:border-none mt-4 
             bg-white p-8  rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <h3 className="w-full font-bold text-xl flex justify-center">
                <CalendarClockIcon className="mr-2"/>
               Zeitlich begrenztes Inserat
                
            </h3>
            
            <div className="w-full">
                <div className="w-full">
                   
                      
                            <h1 className=" text-base mb-2">
                                Von :
                            </h1>
                            <div className="w-full">
                                
                            
                                            
                                            <Popover>
                                            
                                                <PopoverTrigger asChild className="w-full">
                                                    
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "min-w-full pl-3 text-left font-normal dark:bg-[#242424] dark:hover:bg-[#2d2d2d] dark:border-none",
                                                                !currentStart && "text-muted-foreground"
                                                            )}
                                                            disabled={isDateless}
                                                        >
                                                            {currentStart ? (
                                                                format(currentStart, "PPP", { locale: de })
                                                            ) : (
                                                                <span>Wähle einen Startpunkt</span>
                                                            )}

                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        locale={de}
                                                        selected={currentStart}
                                                        onSelect={(e) => {setCurrentStart(e); console.log(currentStart)}}
                                                        className="dark:bg-[#0B0B0B] dark:border-none"
                                                        disabled={(date) =>
                                                            date < new Date() 
                                                            
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <div className="text-xs dark:text-gray-100/70">
                                                Das Startdatum ist inkludiert.
                                            </div>
                                            
                                <h1 className=" text-base mt-4 mb-2">
                                    Bis :
                                </h1>
                                
                                      
                               
                                            <Popover>
                                                <PopoverTrigger asChild>     
                                                        <Button
                                                            variant={"outline"}
                                                            disabled={isDateless}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal dark:bg-[#242424] dark:border-none dark:hover:bg-[#2d2d2d]",
                                                                !currentEnd && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {currentEnd ? (
                                                                format(currentEnd, "PPP", { locale: de })
                                                            ) : (
                                                                <span>Wähle deinen Endpunkt</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        
                                                        </Button>
                                                
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        className="dark:bg-[#0B0B0B] dark:border-none"
                                                        locale={de}
                                                        selected={currentEnd}
                                                        onSelect={(e) => {setCurrentEnd(e)}}
                                                        disabled={(date) =>
                                                            date < new Date() || date < currentStart
                                                            
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <div className="text-xs dark:text-gray-100/70">
                                                Das Enddatum ist inkludiert.
                                            </div>
                                            
                                          
                                        
                                 
                            </div>
                            <Button onClick={onSubmit} 
                            className="bg-blue-800 dark:bg-[#191919] dark:hover:bg-[#2d2d2d] dark:text-gray-100  w-full mt-2" 
                            disabled={isDateless || 
                            (currentStart?.toString() === thisInserat.begin?.toString() && currentEnd?.toString() === thisInserat.end?.toString()) 
                            }>Daten festlegen </Button>
                            
                </div>
            </div>
                                                        
                                           
        </div>
        
        </div>
    );
}

export default RentPeriod;