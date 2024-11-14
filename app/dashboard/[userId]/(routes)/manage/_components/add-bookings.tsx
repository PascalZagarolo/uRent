"use client"



import { format, getDate, isBefore, isSameDay, set } from 'date-fns';



import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import { BookOpenCheck, CalendarClockIcon, CalendarIcon, PlusSquare } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import toast from "react-hot-toast";

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
import { checkAvailability } from "@/actions/check-availability";

import ConflictDialog from "./conflict-dialog.tsx/conflict-dialog";
import LetterRestriction from "@/components/letter-restriction";



interface AddBookingProps {
    foundInserate: typeof inserat.$inferSelect[];
    open?: boolean;
    onClose?: () => void;
    usedInserat?: typeof inserat.$inferSelect;
    usedStart?: Date;
    usedEnd?: Date;
    usedStartTime?: string;
    usedEndTime?: string;
    usedTitle?: string;
    usedContent?: string
    requestId?: string;
}


const AddBooking: React.FC<AddBookingProps> = ({
    foundInserate,
    open,
    onClose = () => { },
    usedInserat,
    usedStart,
    usedEnd,
    usedStartTime,
    usedEndTime,
    usedTitle,
    usedContent,
    requestId
}) => {



    const [currentStart, setCurrentStart] = useState(usedStart ? usedStart : new Date());
    const [currentEnd, setCurrentEnd] = useState(usedEnd ? usedEnd : new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [currentInserat, setCurrentInserat] = useState<string | null>(usedInserat ? usedInserat.id : null);
    const [currentVehicle, setCurrentVehicle] = useState<string | null>(null);
    const [currentName, setCurrentName] = useState<string | null>(usedTitle ? usedTitle : null);
    const [currentInternal, setCurrentInternal] = useState<string | null>(null);
    const [currentContent, setCurrentContent] = useState<string | null>(usedContent ? usedContent : null);
    const [affectAll, setAffectAll] = useState(false);

    const [currentStartTime, setCurrentStartTime] = useState(usedStartTime ? usedStartTime : "");
    const [currentEndTime, setCurrentEndTime] = useState(usedEndTime ? usedEndTime : "");


    const [isOpen, setIsOpen] = useState(open);




    const [currentInseratObject, setCurrentInseratObject] = useState<typeof inserat.$inferSelect | null>(null);


    const [ignoreOnce, setIgnoreOnce] = useState(false);
    const [showConflict, setShowConflict] = useState(false);

    const [conflictedBooking, setConflictedBooking] = useState<typeof booking.$inferSelect | null>(null);


    const router = useRouter();




    useEffect(() => {

        const newInserat = foundInserate.find((inserat) => inserat.id === currentInserat);

        setCurrentInseratObject(newInserat);

    }, [currentInserat])

    const onSubmit = () => {
        try {

            setIsLoading(true);


            const values = {
                content: currentContent ?? "",

                //Days
                start: currentStart,
                end: currentEnd,

                //Hours
                startPeriod: currentStartTime,
                endPeriod: currentEndTime,


                vehicleId: currentVehicle,
                buchungsnummer: currentInternal,
                name: currentName,
                requestId: requestId
            }



            const isAvailable: {
                isConflict?: boolean,
                booking?: any
            } = checkAvailability(
                currentInseratObject,
                currentStart,
                currentEnd,
                currentStartTime,
                currentEndTime,
                null,
                currentVehicle ? currentVehicle : null,
            )



            if (isAvailable?.isConflict) {
                setConflictedBooking(isAvailable.booking)
                setShowConflict(true);
                setIsLoading(false);
            } else {
                setIsOpen(false);
                onClose();
                axios.post(`/api/booking/${currentInserat}`, values)
                    .then(() => {
                       
                        setCurrentStart(new Date());
                        setCurrentEnd(new Date());
                        setCurrentInserat(null);
                        setCurrentInternal("");
                        setCurrentVehicle(null);
                        setCurrentName(null);
                        setCurrentStartTime("");
                        setCurrentEndTime("");
                    })
                toast.success("Buchung hinzugefügt");
                router.refresh();    
            }

        } catch (err) {
            console.log(err);
            toast.error("Fehler beim hinzufügen der Buchung", err)
        } finally {

            setIsLoading(false);
        }
    }

    const handleTextChange = (event) => {
        const newText = event.target.value;
        const lines = newText.split('\n');

        // Only update text if line count is within limit
        if (lines.length <= 30) {
            setCurrentContent(newText);
        }
    };



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
                startPeriod: currentStartTime,
                endPeriod: currentEndTime,


                vehicleId: currentVehicle,
                buchungsnummer: currentInternal,
                name: currentName,


            }

            axios.post(`/api/booking/${currentInserat}`, values)
                .then(() => {
                    setIgnoreOnce(false);
                    setShowConflict(false);
                    setCurrentContent("");
                    setCurrentName("");
                    setCurrentStart(new Date());
                    setCurrentEnd(new Date());
                    setCurrentStartTime("");
                    setCurrentEndTime("");
                    setCurrentVehicle(null);
                    setCurrentInternal("");
                    setConflictedBooking(null)
                    setIsOpen(false);
                    router.refresh();
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
                reqStartPeriod={currentStartTime}
                reqEndPeriod={currentEndTime}
                conflictedBooking={conflictedBooking}
                setShowConflict={setShowConflict}
                onShowConflictConfirm={onShowConflictConfirm}
            />
        )
    }




    return (
        <Dialog open={isOpen} onOpenChange={(e) => {
            setIsOpen(e);
            if (e === false) {
                console.log("...")
                onClose();
            }

        }}>

            <div className="dark:bg-[#0F0F0F] bg-gray-200  w-full">
                <DialogTrigger asChild className="w-full">
                    <Button className=" text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-[#141414] rounded-none" variant="ghost">
                        <PlusSquare className="mr-2 h-4 w-4" /> Buchungen hinzufügen
                    </Button>
                </DialogTrigger>
            </div>

            <DialogContent className="dark:bg-[#0F0F0F] dark:border-gray-100 dark:border-none">
                <div className="flex flex-col h-full w-full">
                    <div>
                        <h3 className="font-bold flex mb-8">
                            <CalendarClockIcon className="mr-2" /> Buchungen hinzufügen
                        </h3>
                    </div>
                    <div className="py-4 ">
                        <Label className="">
                            Zugehöriges Inserat*
                        </Label>
                        <Select
                            onValueChange={(selectedValue) => {
                                setCurrentInserat(selectedValue);
                                setCurrentVehicle(null);
                            }}
                            value={currentInserat || ''} // Ensures a falsy value like null doesn't break the component
                        >
                            <SelectTrigger className={cn("dark:border-none dark:bg-[#222222] shadow-lg w-full", !currentInserat && "text-gray-200/80")}>
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
                    {currentInseratObject && currentInseratObject.multi && (
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
                                <SelectTrigger className={cn("dark:border-none dark:bg-[#0a0a0a]", !currentVehicle && "text-gray-200/80")}
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
                    <div className="flex-col">

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
                                isSameDay={isSameDay(currentStart, currentEnd) || false}
                                setStartTimeParent={setCurrentStartTime}
                                setEndTimeParent={setCurrentEndTime}
                                prefilledStartTime={usedStartTime}
                                prefilledEndTime={usedEndTime}
                            />
                        </div>
                        <div>

                            <Label className="flex items-center mt-8">
                                Name*</Label>
                            <Input
                                maxLength={160}
                                value={currentName}
                                className="focus:ring-0 focus:outline-none focus:border-0 dark:border-none
                                dark:bg-[#222222] shadow-lg"
                                onChange={(e) => { setCurrentName(e.target.value) }}
                            />
                            <div className="flex justify-end">
                                <LetterRestriction
                                    limit={160}
                                    currentLength={currentName?.length ?? 0}
                                />
                            </div>

                        </div>

                        <div className="mt-2">
                            <Label className="font-semibold text-sm flex items-center">
                                Interne Buchungsnr.
                            </Label>
                            <div className="">
                                <Input
                                    value={currentInternal}
                                    className="focus:ring-0 focus:outline-none focus:border-0 dark:border-none
                                                    dark:bg-[#222222] shadow-lg"
                                    onChange={(e) => { setCurrentInternal(e.target.value) }}
                                    maxLength={160}
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
                            <span className="font-semibold text-sm  flex">
                                 Anmerkungen:
                            </span>


                            <Textarea
                                className="focus:ring-0 focus:outline-none focus:border-0 dark:border-none h-40
                            dark:bg-[#222222] shadow-lg"
                                value={currentContent}
                                maxLength={2000}
                                onChange={handleTextChange}
                            />
                            <div className='flex justify-end'>
                                <LetterRestriction
                                    limit={2000}
                                    currentLength={currentContent?.length ?? 0}
                                />
                            </div>

                        </div>
                        <Button
                            className="border border-gray-300  shadow-lg text-gray-200
                                        bg-indigo-800 hover:bg-indigo-900 dark:border-none"
                            disabled={((!currentName || currentName.trim() === ""))
                                || isLoading || !currentInserat || !currentStart || !currentEnd
                                || !currentStartTime || !currentEndTime ||
                                (currentInseratObject?.multi && !(currentVehicle || affectAll))
                            }
                            onClick={onSubmit}
                        >
                            Buchung hinzufügen</Button>


                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddBooking;