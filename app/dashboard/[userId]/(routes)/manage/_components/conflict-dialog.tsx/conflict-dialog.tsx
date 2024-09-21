'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarCheck2 } from "lucide-react";
import { format, set } from 'date-fns';
import { useState } from "react";
import { de } from "date-fns/locale";

interface ConflictDialogProps {
    title: string;
    reqStartDate : Date;
    reqEndDate : Date;
    reqStartPeriod : string;
    reqEndPeriod : string;
    conflictedBooking: any;
    setShowConflict: (show: boolean) => void;
    onShowConflictConfirm: () => void;
}

const ConflictDialog = ({ title, conflictedBooking, reqStartDate, reqEndDate, reqStartPeriod, reqEndPeriod,
                        setShowConflict, onShowConflictConfirm,  }: ConflictDialogProps) => {

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

    const [ignore, setIgnore] = useState(false);

    return (
        <AlertDialog open>
            <AlertDialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                    <h3 className="flex items-center text-md font-semibold">
                        <CalendarCheck2 className="mr-2 w-4 h-4" /> Buchungskonflikt
                    </h3>
                    <p className="text-xs text-gray-200/60">
                        Das Fahrzeug ist in dem angegeben Zeitraum bereits gebucht.
                    </p>
                    <div className="mt-2 text-sm text-gray-200/90">
                        Eine Buchung für diesen Zeitraum existiert bereits. <br /> Möchtest du trotzdem fortfahren?
                    </div>
                    {conflictedBooking && (
                        <div className="mt-2">
                            <h3 className="font-semibold text-sm text-rose-600">
                                Gefundene Buchung:
                            </h3>
                            <div className="text-sm font-semibold">
                                {title}
                            </div>
                            <div className="text-sm text-gray-200/90">
                                {conflictedBooking?.name}
                            </div>
                            <div className="text-sm text-gray-200/90">
                                Zeitraum : {format(conflictedBooking?.startDate, "PPP", { locale: de })} - {format(conflictedBooking?.endDate, "PPP", { locale: de })}
                            </div>
                            <div className="w-full flex items-center text-sm gap-x-4">
                                <div className="w-1/2">
                                    Abholzeit : {convertMinutesToDayTime(Number(conflictedBooking?.startPeriod))}
                                </div>
                                <div className="w-1/2">
                                    Abgabezeit: {convertMinutesToDayTime(Number(conflictedBooking?.endPeriod))}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="mt-4">
                        <div className="underline">
                            Deine Buchung
                        </div>
                        <div className="text-sm text-gray-200/90">
                            Zeitraum : {format(reqStartDate, "PPP", { locale: de })} - {format(reqEndDate, "PPP", { locale: de })}
                        </div>
                        <div className="w-full flex items-center text-sm gap-x-4">
                            
                            <div className="w-1/2">
                                Abholzeit : {convertMinutesToDayTime(Number(reqStartPeriod))}
                            </div>
                            <div className="w-1/2">
                                Abgabezeit: {convertMinutesToDayTime(Number(reqEndPeriod))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 space-x-2 flex items-center">
                        <Checkbox
                            onCheckedChange={(e) => { setIgnore(Boolean(e)) }}
                            checked={ignore}
                        />
                        <p className="text-xs">
                            Hinweis in Zukunft ausblenden
                        </p>
                    </div>
                    <div className="flex justify-end mt-2">
                        <AlertDialogAction className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300"
                            onClick={onShowConflictConfirm}
                        >
                            Buchung eintragen
                        </AlertDialogAction>
                        <AlertDialogCancel className="dark:border-none" onClick={() => {
                            setShowConflict(false)
                        }}>
                            Abbrechen
                        </AlertDialogCancel>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ConflictDialog;