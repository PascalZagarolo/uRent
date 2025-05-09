"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import { format, isBefore, isSameDay, set } from 'date-fns';

import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import { BookOpenCheck, CalendarCheck2, CalendarClockIcon, CalendarIcon, PlusSquare } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import toast from "react-hot-toast";
import { usesearchUserByBookingStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { booking, inserat, userTable } from "@/db/schema";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { vehicle } from '../../../../../../db/schema';
import { de } from "date-fns/locale";
import SelectTimeRange from "./select-time-range";

import { checkAvailability } from "@/actions/check-availability";
import ConflictDialog from "./conflict-dialog.tsx/conflict-dialog";
import { Input } from "@/components/ui/input";
import LetterRestriction from "@/components/letter-restriction";

interface AddAvailabilityProps {
    foundInserate: typeof inserat.$inferSelect[];
    open?: boolean;
    onClose?: () => void;
    usedInserat?: typeof inserat.$inferSelect;
    usedStart?: Date;
    usedEnd?: Date;
    usedStartTime?: string;
    usedEndTime?: string;
    usedTitle?: string;
    usedContent?: string;
    requestId?: string;
}


const AddAvailability: React.FC<AddAvailabilityProps> = ({
    foundInserate,
    open,
    usedInserat,
    usedStart,
    usedEnd,
    usedStartTime,
    usedEndTime,
    usedTitle,
    usedContent,
    onClose = () => {},
    requestId
}) => {

    const [currentStart, setCurrentStart] = useState(usedStart ? usedStart : new Date());
    const [currentEnd, setCurrentEnd] = useState(usedEnd ? usedEnd : new Date());
    const [startTime, setStartTime] = useState(usedStartTime ? usedStartTime : null);
    const [endTime, setEndTime] = useState(usedEndTime ? usedEndTime : null);


    const [isLoading, setIsLoading] = useState(false);
    const [currentInserat, setCurrentInserat] = useState<typeof inserat.$inferSelect | any>(usedInserat ? usedInserat : null);
    const [currentVehicle, setCurrentVehicle] = useState<string | null>(null);

    const [currentTitle, setCurrentTitle] = useState(usedTitle ? usedTitle : "");

    const [content, setContent] = useState(usedContent ? usedContent : "");


    const [isOpen, setIsOpen] = useState(open);




    const router = useRouter();

    


    const onSubmit = async () => {
        try {

            setIsLoading(true);
            const values = {
                content: content,
                start: currentStart,
                end: currentEnd,
                name: currentTitle,
                //Hours
                startPeriod: startTime,
                endPeriod: endTime,

                vehicleId: currentVehicle,
                isAvailability: true,
                requestId: requestId
            }

            const isAvailable: {
                isConflict?: boolean,
                booking?: any
            } = checkAvailability(
                currentInserat,
                currentStart,
                currentEnd,
                startTime,
                endTime,
                null,
                currentVehicle ? currentVehicle : null,
            )



            if (isAvailable.isConflict) {

                setConflictedBooking(isAvailable.booking)
                setShowConflict(true);
                setIsLoading(false);

            } else {

                setIsOpen(false);
                onClose();
                axios.post(`/api/booking/${currentInserat.id}`, values)
                    .then(() => {
                        router.refresh();
                        setCurrentStart(new Date());
                        setCurrentEnd(new Date());
                        setCurrentInserat(null);
                        setCurrentVehicle(null);
                        setCurrentTitle("");
                        setContent("");
                        setStartTime("");
                        setEndTime("");
                    })
                toast.success("Verfügbarkeit geändert");
            }



        } catch (err) {
            toast.error("Fehler beim hinzufügen der Buchung")
            console.log(err)
        } finally {

            setIsLoading(false);
        }
    }



    useEffect(() => {
        if (currentStart > currentEnd) {
            setCurrentEnd(currentStart);
        }
    }, [currentStart, currentEnd])


    const [ignore, setIgnore] = useState(false);
    const [ignoreOnce, setIgnoreOnce] = useState(false);
    const [showConflict, setShowConflict] = useState(false);

    const [conflictedBooking, setConflictedBooking] = useState<typeof booking.$inferSelect | null>(null);

    function convertMinutesToDayTime(minutes: number): string {
        // Calculate hours and minutes
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        // Format hours and minutes to two digits
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = remainingMinutes.toString().padStart(2, '0');

        // Construct the time string in HH:MM format
        const dayTime = `${formattedHours}:${formattedMinutes} Uhr`;

        return dayTime;
    }

    const onShowConflictConfirm = async () => {
        try {
            setIsLoading(true);

            const values = {

                //!SET CONTENT
                content: content,
                start: currentStart,
                end: currentEnd,
                name: currentTitle,
                //Hours
                startPeriod: startTime,
                endPeriod: endTime,

                vehicleId: currentVehicle,
                isAvailability: true,
            }

            setIsOpen(false);
            onClose();
            await axios.post(`/api/booking/${currentInserat.id}`, values)

            setIgnoreOnce(false);
            setShowConflict(false);
            setConflictedBooking(null)
            setStartTime("");
            setEndTime("");
            router.refresh();

        } catch (error: any) {
            toast.error("Fehler beim hinzufügen der Verfügbarkeit")
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    if (showConflict) {

        return (
            <ConflictDialog
                title={currentInserat?.title}
                reqStartDate={currentStart}
                reqEndDate={currentEnd}
                reqStartPeriod={startTime}
                reqEndPeriod={endTime}
                conflictedBooking={conflictedBooking}
                setShowConflict={setShowConflict}
                onShowConflictConfirm={onShowConflictConfirm}
            />
        )
    }

    const handleTextChange = (event) => {
        const newText = event.target.value;
        const lines = newText.split('\n');

        // Only update text if line count is within limit
        if (lines.length <= 30) {
            setContent(newText);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(e) => {
            if (e === false) {
                onClose();
            }
            setIsOpen(e)
        }}
        >

            <div className="dark:bg-[#0F0F0F] bg-gray-200 rounded-md w-full">
                <DialogTrigger asChild className="w-full">
                    <Button className=" text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-[#141414] " variant="ghost">
                        <CalendarCheck2 className="mr-2 h-4 w-4" /> Verfügbarkeit ändern
                    </Button>
                </DialogTrigger>
            </div>

            <DialogContent className="dark:bg-[#0F0F0F] dark:border-gray-100 dark:border-none overflow-y-auto max-h-[80vh] sm:max-h-[100vh] no-scrollbar">
                <div>
                    <div className="sm:mb-8">
                        <h3 className="font-bold flex ">
                            <CalendarClockIcon className="mr-2" /> Verfügbarkeit ändern

                        </h3>
                        <p className="dark:text-gray-200/70 text-xs">
                            Gebe unkompliziert, Zeiträume an, an denen dein Fahrzeug NICHT verfügbar ist.
                        </p>
                    </div>
                    <div className="py-4 ">
                        <Label className="">
                            Zugehöriges Inserat*
                        </Label>
                        <Select
                            onValueChange={(selectedValue) => {

                                setCurrentInserat(foundInserate.find((inserat) => inserat.id === selectedValue));
                            }}
                            value={currentInserat?.id || ''} // Ensures a falsy value like null doesn't break the component
                        >
                            <SelectTrigger className={cn("dark:border-none dark:bg-[#222222] shadow-lg ", !currentInserat && "text-gray-200/80")}>
                                <SelectValue placeholder="Bitte wähle dein Inserat" />
                            </SelectTrigger>

                            <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
                                {foundInserate.map((thisInserat) => (
                                    <SelectItem value={thisInserat.id} key={thisInserat.id}>
                                        {thisInserat.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {currentInserat?.multi && currentInserat?.vehicles.length > 0 && (
                        <div className="pb-8">
                            <Label className="">
                                Fahrzeug
                            </Label>
                            <Select
                                onValueChange={(selectedValue) => {
                                    setCurrentVehicle(selectedValue);
                                }}

                                value={currentVehicle}

                            >
                                <SelectTrigger className="dark:border-none dark:bg-[#222222] shadow-lg"
                                    disabled={//@ts-ignore
                                        !currentInserat || currentInserat?.vehicles.length <= 0}>
                                    {currentVehicle ? (
                                        <SelectValue>

                                        </SelectValue>
                                    ) : (
                                        <SelectValue>
                                            Wähle dein Fahrzeug
                                        </SelectValue>
                                    )}

                                    <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">

                                        {//@ts-ignore
                                            currentInserat?.vehicles.length > 0 ? (
                                                //@ts-ignore
                                                currentInserat?.vehicles?.map((thisVehicle: typeof vehicle.$inferSelect) => (
                                                    <SelectItem value={thisVehicle.id} key={thisVehicle.id}>
                                                        {thisVehicle.title}
                                                    </SelectItem>
                                                ))

                                            ) : (
                                                <SelectItem value={null}>
                                                    Keine Fahrzeuge verfügbar
                                                </SelectItem>
                                            )}
                                    </SelectContent>
                                </SelectTrigger>
                            </Select>
                        </div>
                    )}
                    <div className="flex flex-col">
                   
                           
                                <div className="flex flex-row gap-x-8">
                                   
                                                <div className="w-1/2">
                                                <Label>Anfangsdatum*</Label>
                                                <Popover modal={true}>
                                                    <PopoverTrigger asChild>
                                                        
                                                           <div className="w-full">
                                                           <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full dark:bg-[#222222] shadow-lg text-left font-normal dark:border-none ",
                                                                    !currentStart && "text-muted-foreground  "
                                                                )}
                                                            >
                                                                {currentStart ? (
                                                                    format(currentStart, "PPP", { locale: de })
                                                                ) : (
                                                                    <span>Wähle ein Datum</span>
                                                                )}
                                                               {!currentStart && (
                                                                 <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                               )}
                                                            </Button>
                                                           </div>
                                                       </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 dark:border-none rounded-md" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={currentStart}
                                                            className="dark:bg-[#0a0a0a] "
                                                            onSelect={(date) => {
                                                              
                                                                setCurrentStart(date);
                                                            }}
                                                            locale={de}
                                                            disabled={(date) =>
                                                                isBefore(date, new Date().setHours(0, 0, 0, 0)) || date < new Date("1900-01-01")
                                                            }

                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                </div>
                                    


                                  
                                                <div className="w-1/2">
                                                <Label>Enddatum*</Label>
                                                <Popover modal={true}>
                                                    <PopoverTrigger asChild>
                                                    <div className="w-full">
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full dark:bg-[#222222] shadow-lg text-left font-normal dark:border-none",
                                                                    !currentEnd && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {(currentEnd) ? (
                                                                    format(currentEnd, "PPP", { locale: de })
                                                                ) : (
                                                                    <span>Wähle ein Datum</span>
                                                                )}
                                                                {!currentEnd && (
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 dark:border-none rounded-md" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={currentEnd}
                                                            className="dark:bg-[#0a0a0a] "
                                                            onSelect={(date) => {
                                                            
                                                                setCurrentEnd(date);
                                                            }}
                                                            locale={de}
                                                            disabled={(date) =>
                                                                isBefore(date, new Date().setHours(0, 0, 0, 0)) || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                </div>
                                     


                                </div>
                                <div className="mt-4">
                                    <SelectTimeRange
                                        isSameDay={isSameDay(currentStart, currentEnd)}
                                        setStartTimeParent={setStartTime}
                                        setEndTimeParent={setEndTime}
                                        prefilledStartTime={startTime}
                                        prefilledEndTime={endTime}
                                    />
                                </div>
                                <div className="sm:mt-8 mt-4">
                                    <Label className="flex items-center"> Titel*</Label>
                                    <Input
                                        className="focus:ring-0 focus:outline-none focus:border-0 dark:border-none
                                        dark:bg-[#222222] shadow-lg"
                                        value={currentTitle}
                                        maxLength={160}
                                        onChange={(e) => { setCurrentTitle(e.target.value) }}
                                    />
                                    <div className="flex justify-end">
                                        <LetterRestriction
                                            limit={160}
                                            currentLength={currentTitle.length}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span className="font-semibold text-base flex">
                                        Notiz
                                    </span>
                                 
                                                <Textarea
                                                    onChange={handleTextChange}
                                                    value={content}
                                                    maxLength={2000}
                                                    className="focus:ring-0 focus:outline-none focus:border-0 dark:border-none
                            dark:bg-[#222222] shadow-lg sm:h-40 h-8"
                                                />
                                                <div className="flex justify-end">
                                                    <LetterRestriction
                                                        limit={2000}
                                                        currentLength={content.length}
                                                    />
                                                </div>
                                          
                                </div>


                                <Button
                                    className="text-gray-200 hover:text-gray-300 shadow-lg bg-indigo-800 hover:bg-indigo-900"
                                    disabled={isLoading || !currentInserat || !currentStart || !currentEnd ||
                                        !startTime || !endTime || !currentTitle || currentInserat?.multi && !currentVehicle}
                                    onClick={onSubmit}
                                >
                                    Verfügbarkeit anpassen</Button>

                           
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddAvailability;