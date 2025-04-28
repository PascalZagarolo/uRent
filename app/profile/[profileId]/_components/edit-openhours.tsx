'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { openingTimes } from "@/db/schema";
import axios from "axios";
import { Clock7Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface EditOpenHoursProps {
    businessId : string;
    openTimes : typeof openingTimes.$inferSelect;
}

const EditOpenhours : React.FC<EditOpenHoursProps> = ({
    businessId,
    openTimes
}) => {

    const [sMon, eMon]: string[] = openTimes?.monday?.split('-') || ["", ""];
    const [sTue, eTue]: string[] = openTimes?.tuesday?.split('-') || ["", ""];
    const [sWed, eWed]: string[] = openTimes?.wednesday?.split('-') || ["", ""];
    const [sThu, eThu]: string[] = openTimes?.thursday?.split('-') || ["", ""];
    const [sFri, eFri]: string[] = openTimes?.friday?.split('-') || ["", ""];
    const [sSat, eSat]: string[] = openTimes?.saturday?.split('-') || ["", ""];
    const [sSun, eSun]: string[] = openTimes?.sunday?.split('-') || ["", ""];

    


    const [startMonday, setStartMonday] = useState(sMon.trim());
    const [endMonday, setEndMonday] = useState(eMon.trim());
    const [startTuesday, setStartTuesday] = useState(sTue.trim());
    const [endTuesday, setEndTuesday] = useState(eTue.trim());
    const [startWednesday, setStartWednesday] = useState(sWed.trim());
    const [endWednesday, setEndWednesday] = useState(eWed.trim());
    const [startThursday, setStartThursday] = useState(sThu.trim());
    const [endThursday, setEndThursday] = useState(eThu.trim());
    const [startFriday, setStartFriday] = useState(sFri.trim());
    const [endFriday, setEndFriday] = useState(eFri.trim());
    const [startSaturday, setStartSaturday] = useState(sSat.trim());
    const [endSaturday, setEndSaturday] = useState(eSat.trim());
    const [startSunday, setStartSunday] = useState(eSun.trim());
    const [endSunday, setEndSunday] = useState(sSun.trim());

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onClosed = (day : string) => {
        switch(day) {
            case "monday":
                setStartMonday("Geschlossen");
                setEndMonday("");
                break;
            case "tuesday":
                setStartTuesday("Geschlossen");
                setEndTuesday("");
                break;
            case "wednesday":
                setStartWednesday("Geschlossen");
                setEndWednesday("");
                break;
            case "thursday":
                setStartThursday("Geschlossen");
                setEndThursday("");
                break;
            case "friday":
                setStartFriday("Geschlossen");
                setEndFriday("");
                break;
            case "saturday":
                setStartSaturday("Geschlossen");
                setEndSaturday("");
                break;
            case "sunday":
                setStartSunday("Geschlossen");
                setEndSunday("");
                break;
        }
    }

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const values = {
                monday : startMonday + " - " + endMonday,
                tuesday : startTuesday + " - " + endTuesday,
                wednesday : startWednesday + " - " + endWednesday,
                thursday : startThursday + " - "  + endThursday,
                friday : startFriday + " - " + endFriday,
                saturday : startSaturday + " - " + endSaturday,
                sunday : startSunday + " - " + endSunday
            }
            
            await axios.patch(`/api/business/${businessId}/openingTimes`, values)
                .then(() => {
                    router.refresh();
                })
            toast.success("Öffnungszeiten gespeichert")
        } catch {
            toast.error("Fehler beim Speichern der Öffnungszeiten")
        } finally {
            setIsLoading(false);
        }
    }

    const checkBox = (day : string) => {
        return (
            <div className="">
                <div className="flex flex-row items-center">
                    <Label>
                        Geschlossen
                    </Label>
                    <Checkbox
                    onChange={(e) => {
                        if(e) {
                            onClosed(day)
                        }
                    }} 
                    />
                </div>
            </div>
        )
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto text-xs bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white 
                    transition-all duration-300 hover:shadow-indigo-900/20" size="sm" variant="ghost">
                    <Clock7Icon className="w-4 h-4 mr-2" /> Öffnungszeiten bearbeiten
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-[#1a1a25] dark:border-indigo-900/30">
                <div>
                    <h1 className="font-semibold text-gray-200 flex items-center">
                        <Clock7Icon className="w-4 h-4 mr-2 text-indigo-400" /> Öffnungszeiten bearbeiten
                    </h1>
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-200">
                            Wochentage
                        </h3>
                        <div className="mt-4 space-y-4">
                            {[
                                { day: "Montag", start: startMonday, end: endMonday, setStart: setStartMonday, setEnd: setEndMonday },
                                { day: "Dienstag", start: startTuesday, end: endTuesday, setStart: setStartTuesday, setEnd: setEndTuesday },
                                { day: "Mittwoch", start: startWednesday, end: endWednesday, setStart: setStartWednesday, setEnd: setEndWednesday },
                                { day: "Donnerstag", start: startThursday, end: endThursday, setStart: setStartThursday, setEnd: setEndThursday },
                                { day: "Freitag", start: startFriday, end: endFriday, setStart: setStartFriday, setEnd: setEndFriday },
                                { day: "Samstag", start: startSaturday, end: endSaturday, setStart: setStartSaturday, setEnd: setEndSaturday },
                                { day: "Sonntag", start: startSunday, end: endSunday, setStart: setStartSunday, setEnd: setEndSunday }
                            ].map(({ day, start, end, setStart, setEnd }) => (
                                <div key={day} className="flex flex-col space-y-2 p-3 rounded-md bg-[#1a1a25] border border-indigo-900/30">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-200">{day}</span>
                                        <div className="flex items-center gap-x-2">
                                            <Input 
                                                className="bg-[#1a1a25] border-indigo-900/30 text-gray-200 placeholder:text-gray-200/40
                                                    focus:border-indigo-400/30 transition-all duration-300 w-[120px]" 
                                                type="time" 
                                                step="0"
                                                onChange={(e) => setStart(e.target.value)}
                                                value={start}
                                                placeholder="9:00"
                                            />
                                            <span className="text-gray-200/60">-</span>
                                            <Input 
                                                className="bg-[#1a1a25] border-indigo-900/30 text-gray-200 placeholder:text-gray-200/40
                                                    focus:border-indigo-400/30 transition-all duration-300 w-[120px]" 
                                                type="time" 
                                                step="0"
                                                onChange={(e) => setEnd(e.target.value)}
                                                value={end}
                                                placeholder="20:00"
                                            />
                                            <span className="text-gray-200/60">Uhr</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <Checkbox
                                            className="border-indigo-900/30 data-[state=checked]:bg-indigo-600"
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    onClosed(day.toLowerCase());
                                                }
                                            }}
                                        />
                                        <Label className="text-gray-200/80 text-sm">Geschlossen</Label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <DialogTrigger asChild>
                                <Button 
                                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white
                                        transition-all duration-300 hover:shadow-indigo-900/20"
                                    size="sm" 
                                    onClick={onSubmit}
                                    disabled={isLoading}
                                >
                                    Speichern
                                </Button>
                            </DialogTrigger>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditOpenhours;