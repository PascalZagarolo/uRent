"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import { format, set, isSameDay, isBefore } from 'date-fns';

import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import { BookOpenCheck, CalendarCheck2, CalendarClockIcon, CalendarIcon, PencilIcon, PlusSquare } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import toast from "react-hot-toast";
import { usesearchUserByBookingStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { booking, inserat } from "@/db/schema";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { vehicle } from '../../../../../../db/schema';
import { Input } from "@/components/ui/input";
import { MdOutlinePersonPin } from "react-icons/md";
import { de } from "date-fns/locale";
import SelectTimeRange from "./select-time-range";
import { Checkbox } from "@/components/ui/checkbox";
import { TbListNumbers } from "react-icons/tb";
import ConflictDialog from "./conflict-dialog.tsx/conflict-dialog";
import { checkAvailability } from "@/actions/check-availability";
import LetterRestriction from "@/components/letter-restriction";


interface EditBookingProps {
    foundInserate: typeof inserat.$inferSelect[];
    thisBooking: typeof booking.$inferSelect;
    useHover?: boolean;
}


const EditBooking: React.FC<EditBookingProps> = ({
    foundInserate,
    thisBooking,
    useHover
}) => {





    const [currentStart, setCurrentStart] = useState(new Date(thisBooking?.startDate) ?? new Date());
    const [currentEnd, setCurrentEnd] = useState(new Date(thisBooking?.endDate) ?? new Date());
    const [currentPeriodStart, setCurrentPeriodStart] = useState(thisBooking?.startPeriod ?? "");
    const [currentPeriodEnd, setCurrentPeriodEnd] = useState(thisBooking?.endPeriod ?? "");
    const [currentInternal, setCurrentInternal] = useState(thisBooking?.buchungsnummer ?? "");
    const [affectAll, setAffectAll] = useState(false);

    const [ignore, setIgnore] = useState(false);
    const [ignoreOnce, setIgnoreOnce] = useState(false);
    const [showConflict, setShowConflict] = useState(false);

    const [conflictedBooking, setConflictedBooking] = useState<typeof booking.$inferSelect | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [currentInserat, setCurrentInserat] = useState<string | null>(thisBooking?.inseratId);
    const [currentInseratObject, setCurrentInseratObject] = useState<typeof inserat.$inferSelect | null | any>(null);
    const [currentVehicle, setCurrentVehicle] = useState<string | null>(thisBooking?.vehicleId);
    const [currentContent, setCurrentContent] = useState<string | null>(thisBooking?.content);
    const [currentName, setCurrentName] = useState<string | null>(thisBooking?.name);
    const selectedUser = usesearchUserByBookingStore((user) => user.user);




    useEffect(() => {

        const newInserat = foundInserate.find((inserat) => inserat.id === currentInserat);

        setCurrentInseratObject(newInserat);

    }, [currentInserat])



    const params = useParams();
    const router = useRouter();

    

   



    const handleTextChange = (event) => {
        const newText = event.target.value;
        const lines = newText.split('\n');

        // Only update text if line count is within limit
        if (lines.length <= 30) {
            setCurrentContent(newText);
        }
    };


    const onSubmit = () => {
        try {

            setIsLoading(true);


            const values = {
                content: currentContent,

                //Days
                start: currentStart,
                end: currentEnd,

                //Hours
                startPeriod: currentPeriodStart,
                endPeriod: currentPeriodEnd,


                userId: selectedUser ? selectedUser?.id : null,
                vehicleId: currentVehicle,
                buchungsnummer: currentInternal,
                name: currentName,


            }

            const isAvailable: {
                isConflict?: boolean,
                booking?: any
            } = checkAvailability(
                currentInseratObject,
                currentStart,
                currentEnd,
                currentPeriodStart,
                currentPeriodEnd,
                thisBooking.id,
                currentVehicle ? currentVehicle : null,
            )



            if (isAvailable.isConflict) {

                setConflictedBooking(isAvailable.booking)
                setShowConflict(true);
                setIsLoading(false);



            } else {
                axios.patch(`/api/booking/edit/${thisBooking.id}`, values)
                    .then(() => {
                        router.refresh();
                        
                        setCurrentStart(new Date());
                        setCurrentEnd(new Date());
                        setCurrentInserat(null);
                        setCurrentInternal("");
                        setCurrentVehicle(null);
                        setCurrentName(null);
                        setCurrentPeriodStart("");
                        setCurrentPeriodEnd("");
                    })
                toast.success("Buchung bearbeitet");
            }

        } catch (err) {
            toast.error("Fehler beim hinzufügen der Buchung", err)
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        if (currentStart > currentEnd) {
            setCurrentEnd(currentStart)
        }
    }, [currentEnd, currentStart])

    const onShowConflictConfirm = () => {
        try {
            setIsLoading(true);

            const values = {
                content: currentContent,

                //Days
                start: currentStart,
                end: currentEnd,

                //Hours
                startPeriod: currentPeriodStart,
                endPeriod: currentPeriodEnd,


                userId: selectedUser ? selectedUser?.id : null,
                vehicleId: currentVehicle,
                buchungsnummer: currentInternal,
                name: currentName,


            }

            axios.patch(`/api/booking/edit/${thisBooking.id}`, values)
                .then(() => {
                    setIgnoreOnce(false);
                    setShowConflict(false);
                    setConflictedBooking(null)
                    router.refresh();
                    
                    setCurrentStart(new Date());
                    setCurrentEnd(new Date());
                    setCurrentInserat(null);
                    setCurrentInternal("");
                    setCurrentVehicle(null);
                    setCurrentName(null);
                    setCurrentPeriodStart("");
                    setCurrentPeriodEnd("");
                })
        } catch (error: any) {
            toast.error("Fehler beim hinzufügen der Buchung", error)
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    if (showConflict) {
        return (
            <ConflictDialog
                title={currentInseratObject?.title}
                reqStartDate={currentStart}
                reqEndDate={currentEnd}
                reqStartPeriod={currentPeriodStart}
                reqEndPeriod={currentPeriodEnd}
                conflictedBooking={conflictedBooking}
                setShowConflict={setShowConflict}
                onShowConflictConfirm={onShowConflictConfirm}
            />
        )
    }

    return (
        <Dialog>
            {useHover ? (
                <DialogTrigger asChild>
                    <Button variant="ghost">
                        <PencilIcon className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
            ) : (
                <DialogTrigger >
                    <PencilIcon className="h-4 w-4" />
                </DialogTrigger>
            )}
            <DialogContent className="dark:bg-[#0F0F0F] dark:border-gray-100 dark:border-none">
                <div>
                    <div>
                        <h3 className="font-bold flex mb-8">
                            <CalendarClockIcon className="mr-2" /> Buchung bearbeiten
                        </h3>
                    </div>
                    <div className="py-4">
                        <Label className="">
                            Zugehöriges Inserat
                        </Label>
                        <Select
                            onValueChange={(selectedValue) => {
                               
                                setCurrentInserat(selectedValue);

                                setCurrentVehicle(null);
                            }}

                            value={//@ts-ignore
                                currentInserat}

                        >
                            <SelectTrigger className="w-full dark:border-none dark:bg-[#222222] shadow-lg" value={//@ts-ignore
                                currentInserat}>
                                <SelectValue defaultValue={currentInserat} placeholder="Wähle dein Inserat" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-[#0a0a0a] dark:border-none" >

                                {foundInserate.map((thisInserat: typeof inserat.$inferSelect) => (
                                    <SelectItem value={thisInserat.id} key={thisInserat.id}>
                                        {thisInserat.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>

                        </Select>
                    </div>
                    {currentInseratObject?.multi && currentInseratObject && (
                        <div className="pb-8 pr-8">
                            <Label className="">
                                Fahrzeug
                            </Label>
                            <Select
                                onValueChange={(selectedValue) => {
                                    setCurrentVehicle(selectedValue);
                                }}
                                disabled={affectAll}
                                value={currentVehicle || ''}

                            >
                                <SelectTrigger className={cn("dark:border-none dark:bg-[#222222] shadow-lg", !currentVehicle && "text-gray-200/80")}
                                    disabled={//@ts-ignore
                                        !currentInserat || currentInseratObject?.vehicles?.length <= 0}
                                >
                                    <SelectValue placeholder={affectAll ? "Buchung wird auf alle Fahrzeuge angewandt.." : "Bitte wähle dein Fahrzeug"} />

                                    <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">

                                        {//@ts-ignore
                                            currentInseratObject?.vehicles?.length > 0 ? (
                                                //@ts-ignore
                                                currentInseratObject?.vehicles?.map((thisVehicle: typeof vehicle.$inferSelect) => (
                                                    <SelectItem value={thisVehicle.id} key={thisVehicle.id} onSelect={() => { setAffectAll(false) }}>
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
                            <div className="space-x-2 mt-2">
                                <Checkbox
                                    checked={affectAll}
                                    onCheckedChange={(e) => {
                                        setAffectAll(Boolean(e));
                                        if (Boolean(e)) {

                                            setCurrentVehicle(undefined);
                                        }
                                    }} />

                                <Label className="hover:cursor-pointer" onClick={() => {
                                    setAffectAll(!affectAll);
                                    if (affectAll) {
                                        setCurrentVehicle(undefined);
                                    }
                                }}>
                                    Buchung auf alle Fahrzeuge anwenden
                                </Label>
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col">
                        
                                <div className="flex flex-row gap-x-8">
                                   
                                               <div className="w-1/2">
                                               <Label>Anfangsdatum</Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full text-left font-normal dark:border-none bg-[#222222] shadow-lg",
                                                                    !currentStart && "text-muted-foreground  "
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
                                                            selected={currentStart}
                                                            className="dark:bg-[#0a0a0a] dark:border-none"
                                                            locale={de}
                                                            onSelect={(date) => {
                                                               
                                                                setCurrentStart(date);
                                                            }}
                                                            disabled={(date) =>
                                                                date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                               </div>
                                              


                                   
                                               <div className="w-1/2">
                                               <Label>Enddatum</Label>
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
                                                                date < currentStart || date < new Date("1900-01-01")
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
                                        setStartTimeParent={setCurrentPeriodStart}
                                        setEndTimeParent={setCurrentPeriodEnd}
                                        prefilledStartTime={thisBooking?.startPeriod}
                                        prefilledEndTime={thisBooking?.endPeriod}
                                        

                                    />
                                </div>
                                <div className="mt-8">
                                    
                                                <Label className="flex items-center"><MdOutlinePersonPin className="w-4 h-4 mr-2" /> Name</Label>
                                                <Input
                                                    className="focus:ring-0 focus:outline-none focus:border-0 dark:border-none
                                                    dark:bg-[#222222] shadow-lg"
                                                    maxLength={160}
                                                    onChange={(e) => { setCurrentName(e.target.value) }}
                                                    value={currentName}
                                                />
                                                <div className="flex justify-end">
                                                    <LetterRestriction
                                                        limit={160}
                                                        currentLength={currentInternal?.length ?? 0}
                                                    />
                                                </div>
                                            
                                </div>
                                <div className="mt-2">
                                    <Label className="font-semibold text-sm flex items-center">
                                        <TbListNumbers className="w-4 h-4 mr-2" /> Interne Buchungsnr.
                                    </Label>
                                    <div className="mt-2">
                                        <Input
                                            value={currentInternal}
                                            maxLength={160}
                                            className="focus:ring-0 focus:outline-none focus:border-0 dark:border-none
                                            dark:bg-[#222222] shadow-lg"
                                            onChange={(e) => { setCurrentInternal(e.target.value) }}
                                        />
                                        <div className="flex justify-end">
                                            <LetterRestriction
                                                limit={160}
                                                currentLength={currentInternal?.length ?? 0}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span className="font-semibold text-base flex">
                                        <BookOpenCheck className="mr-2" />  Anmerkungen:
                                    </span>
                                    

                                                <Textarea
                                                    className="focus:ring-0 focus:outline-none focus:border-0 dark:border-none
                                                    dark:bg-[#222222] shadow-lg h-40"
                                                    onChange={handleTextChange}
                                                    maxLength={2000}
                                                    value={currentContent}
                                                />
                                                <div className="flex justify-end">
                                                    <LetterRestriction
                                                        currentLength={currentContent?.length ?? 0}
                                                        limit={2000} />
                                                </div>
                                            
                                </div>
                                <DialogTrigger asChild>
                                    <Button
                                        className="bg-white border border-gray-300 text-gray-900 
                   hover:bg-gray-200
                   dark:bg-indigo-800 dark:text-gray-100 dark:hover:bg-indigo-900 w-full dark:border-none"
                                        disabled={(!selectedUser && (!currentName || currentName.trim() === "")) || isLoading || !currentInserat || !currentStart || !currentEnd}
                                        type="submit"
                                    >
                                        Änderungen speichern</Button>
                                </DialogTrigger>
                            
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditBooking;