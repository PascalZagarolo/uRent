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


import { BookOpenCheck, CalendarClockIcon, CalendarIcon, Check, Clock as ClockIcon, ClipboardList, CreditCard, PlusCircle, PlusSquare } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import toast from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { booking, inserat } from "@/db/schema";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";



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

    const [currentStartTime, setCurrentStartTime] = useState(usedStartTime ? usedStartTime : undefined);
    const [currentEndTime, setCurrentEndTime] = useState(usedEndTime ? usedEndTime : undefined);


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
                onClose();
            }
        }}>
            <DialogTrigger className="w-full" asChild>
                <Button variant="default" className="w-full flex items-center gap-2 text-sm">
                    <PlusCircle className="h-4 w-4" /> 
                    Neue Buchung erstellen
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px] dark:bg-[#161616] border-none max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-xl gap-2 dark:text-white">
                        <ClipboardList className="h-5 w-5 text-primary" /> 
                        Neue Buchung anlegen
                    </DialogTitle>
                </DialogHeader>

                <Separator className="my-2" />

                <div className="grid gap-5 py-3">
                    {/* Inserat Selector */}
                    <div className="grid gap-2">
                        <Label htmlFor="inserat" className="text-sm font-medium flex items-center gap-1">
                            <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                            Inserat auswählen
                            <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            onValueChange={(selectedValue) => {
                                setCurrentInserat(selectedValue);
                                setCurrentVehicle(null);
                            }}
                            value={currentInserat || ''} 
                        >
                            <SelectTrigger className="dark:bg-[#222222] border-none shadow-sm h-9">
                                <SelectValue placeholder="Bitte wähle dein Inserat" />
                            </SelectTrigger>

                            <SelectContent className="dark:bg-[#111111] border-none">
                                <SelectGroup>
                                    <SelectLabel className="text-xs text-muted-foreground">Verfügbare Inserate</SelectLabel>
                                    {foundInserate.map((thisInserat) => (
                                        <SelectItem value={thisInserat.id} key={thisInserat.id} className="text-sm">
                                            {thisInserat.title}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Vehicle Selector (if inserat is multi) */}
                    {currentInseratObject && currentInseratObject.multi && (
                        <div className="grid gap-2">
                            <Label htmlFor="vehicle" className="text-sm font-medium flex items-center gap-1">
                                <ClockIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                Fahrzeug auswählen
                                <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                onValueChange={(selectedValue) => {
                                    setCurrentVehicle(selectedValue);
                                }}
                                disabled={affectAll}
                                value={currentVehicle || ''}
                            >
                                <SelectTrigger 
                                    className="dark:bg-[#222222] border-none shadow-sm h-9"
                                    disabled={affectAll || !currentInserat}
                                >
                                    <SelectValue placeholder={affectAll ? "Buchung wird auf alle Fahrzeuge angewandt.." : "Bitte wähle dein Fahrzeug"} />
                                </SelectTrigger>

                                <SelectContent className="dark:bg-[#111111] border-none">
                                    <SelectGroup>
                                        <SelectLabel className="text-xs text-muted-foreground">Verfügbare Fahrzeuge</SelectLabel>
                                        {(currentInseratObject as any)?.vehicles?.length > 0 ? (
                                            (currentInseratObject as any).vehicles.map((thisVehicle: typeof vehicle.$inferSelect) => (
                                                <SelectItem value={thisVehicle.id} key={thisVehicle.id} className="text-sm">
                                                    {thisVehicle.title}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="none" disabled>
                                                Keine Fahrzeuge verfügbar
                                            </SelectItem>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            
                            <div className="flex items-center gap-2 mt-1">
                                <Checkbox
                                    id="affectAll"
                                    checked={affectAll}
                                    onCheckedChange={(e) => {
                                        setAffectAll(Boolean(e));
                                        if (Boolean(e)) {
                                            setCurrentVehicle(undefined);
                                        }
                                    }} 
                                />
                                <Label 
                                    htmlFor="affectAll" 
                                    className="text-sm text-muted-foreground cursor-pointer"
                                >
                                    Buchung auf alle Fahrzeuge anwenden
                                </Label>
                            </div>
                        </div>
                    )}

                    {/* Date Range Selector */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium flex items-center gap-1">
                                <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                Anfangsdatum
                                <span className="text-red-500">*</span>
                            </Label>
                            <Popover modal={true}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "justify-start text-left font-normal h-9 dark:bg-[#222222] border-none shadow-sm",
                                            !currentStart && "text-muted-foreground"
                                        )}
                                    >
                                        {currentStart ? (
                                            format(currentStart, "dd. MMM yyyy", { locale: de })
                                        ) : (
                                            <span>Anfangsdatum wählen</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 dark:bg-[#111111] border-none shadow-lg" align="start">
                                    <Calendar
                                        mode="single"
                                        locale={de}
                                        selected={currentStart}
                                        onSelect={(date) => setCurrentStart(date)}
                                        disabled={(date) =>
                                            isBefore(date, new Date().setHours(0, 0, 0, 0)) || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                        className="dark:bg-[#111111]"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-sm font-medium flex items-center gap-1">
                                <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                Enddatum
                                <span className="text-red-500">*</span>
                            </Label>
                            <Popover modal={true}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "justify-start text-left font-normal h-9 dark:bg-[#222222] border-none shadow-sm",
                                            !currentEnd && "text-muted-foreground"
                                        )}
                                    >
                                        {currentEnd ? (
                                            format(currentEnd, "dd. MMM yyyy", { locale: de })
                                        ) : (
                                            <span>Enddatum wählen</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 dark:bg-[#111111] border-none shadow-lg" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={currentEnd}
                                        locale={de}
                                        onSelect={(date) => setCurrentEnd(date)}
                                        disabled={(date) =>
                                            isBefore(date, new Date().setHours(0, 0, 0, 0)) || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                        className="dark:bg-[#111111]"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Time Range */}
                    <div className="grid gap-2">
                        <Label className="text-sm font-medium flex items-center gap-1">
                            <ClockIcon className="h-3.5 w-3.5 text-muted-foreground" />
                            Zeitraum
                            <span className="text-red-500">*</span>
                        </Label>
                        <SelectTimeRange
                            isSameDay={isSameDay(currentStart, currentEnd)}
                            setStartTimeParent={setCurrentStartTime}
                            setEndTimeParent={setCurrentEndTime}
                            prefilledStartTime={usedStartTime}
                            prefilledEndTime={usedEndTime}
                        />
                    </div>

                    <Separator />

                    {/* Booking Name */}
                    <div className="grid gap-2">
                        <Label className="text-sm font-medium flex items-center gap-1">
                            <MdOutlinePersonPin className="h-3.5 w-3.5 text-muted-foreground" />
                            Name der Buchung
                            <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            maxLength={160}
                            value={currentName || ''}
                            className="dark:bg-[#222222] border-none shadow-sm h-9"
                            onChange={(e) => setCurrentName(e.target.value)}
                            placeholder="Name oder Beschreibung der Buchung eingeben"
                        />
                        <div className="flex justify-end">
                            <LetterRestriction
                                limit={160}
                                currentLength={currentName?.length ?? 0}
                            />
                        </div>
                    </div>

                    {/* Internal Booking ID */}
                    <div className="grid gap-2">
                        <Label className="text-sm font-medium flex items-center gap-1">
                            <TbListNumbers className="h-3.5 w-3.5 text-muted-foreground" />
                            Interne Buchungsnummer
                        </Label>
                        <Input
                            value={currentInternal || ''}
                            className="dark:bg-[#222222] border-none shadow-sm h-9"
                            onChange={(e) => setCurrentInternal(e.target.value)}
                            placeholder="Optionale interne Referenznummer"
                            maxLength={160}
                        />
                        <div className="flex justify-end">
                            <LetterRestriction
                                limit={160}
                                currentLength={currentInternal?.length ?? 0}
                            />
                        </div>
                    </div>

                    {/* Notes/Comments */}
                    <div className="grid gap-2">
                        <Label className="text-sm font-medium flex items-center gap-1">
                            <BookOpenCheck className="h-3.5 w-3.5 text-muted-foreground" />
                            Anmerkungen
                        </Label>
                        <Textarea
                            className="dark:bg-[#222222] border-none shadow-sm resize-none min-h-[100px]"
                            value={currentContent || ''}
                            maxLength={2000}
                            onChange={handleTextChange}
                            placeholder="Optionale Anmerkungen zur Buchung"
                        />
                        <div className="flex justify-end">
                            <LetterRestriction
                                limit={2000}
                                currentLength={currentContent?.length ?? 0}
                            />
                        </div>
                    </div>

                    <Button
                        disabled={((!currentName || currentName.trim() === ""))
                            || isLoading || !currentInserat || !currentStart || !currentEnd
                            || !currentStartTime || !currentEndTime ||
                            (currentInseratObject?.multi && !(currentVehicle || affectAll))
                        }
                        onClick={onSubmit}
                        className="w-full mt-2"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                Wird erstellt...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Check className="h-4 w-4" />
                                Buchung hinzufügen
                            </span>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddBooking;