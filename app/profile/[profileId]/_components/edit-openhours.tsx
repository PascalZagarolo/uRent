'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const values = {
                monday : startMonday + " - " + endMonday,
                tuesday : startTuesday + " - " + endTuesday,
                wednesday : startWednesday + " - " + endWednesday,
                thursday : startThursday + " - "  + endThursday,
                friday : startFriday + " - " + endFriday,
                saturday : startSaturday + " - " + endSaturday
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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto text-xs" size="sm" variant="ghost">
                    <Clock7Icon className="w-4 h-4 mr-2" /> Öffnungszeiten bearbeiten
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-[#191919] dark:border-none dark:text-gray-200">
                <div>
                    <h1 className="flex font-semibold">
                        <Clock7Icon className="w-4 h-4 mr-2" /> Öffnungszeiten bearbeiten
                    </h1>
                    <div className="mt-4">
                        <h3 className="font-semibold">
                            Wochentage
                        </h3>
                        <div className="mt-2 space-y-2 text-sm">

                            <div className="flex items-center gap-x-2 w-full font-medium">
                                Montag
                                <div className="flex justify-end w-full items-center gap-x-2">
                                    <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]" type="time" step="0"
                                        onChange={(e) => {
                                            setStartMonday(e.target.value)
                                            console.log(e.target.value)
                                        }}
                                        placeholder="9:00"
                                        value={startMonday}
                                    />
                                    -
                                    <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]" type="time" step="0"
                                        onChange={(e) => {
                                            setEndMonday(e.target.value)
                                        }}
                                        value={endMonday}
                                        placeholder="20:00" />
                                    Uhr
                                </div>
                            </div>

                            <div className="flex items-center gap-x-2 w-full font-semibold">
                                Dienstag
                                <div className="flex ml-auto justify-end w-full items-center gap-x-2">
                                    <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]" type="time" step="0"
                                        onChange={(e) => {
                                            setStartTuesday(e.target.value)
                                        }}
                                        value={startTuesday}
                                        placeholder="9:00"
                                    />
                                    -
                                    <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]" type="time" step="0"
                                        onChange={(e) => {
                                            setEndTuesday(e.target.value)
                                        }}
                                        value={endTuesday}
                                        placeholder="20:00" />
                                    Uhr
                                </div>
                            </div>

                            <div className="flex items-center gap-x-2 w-full font-medium">
                                Mittwoch
                                <div className="flex ml-auto justify-end w-full items-center gap-x-2">
                                    <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]" type="time" step="0"
                                        onChange={(e) => {
                                            setStartWednesday(e.target.value)
                                        }}
                                        value={startWednesday}
                                        placeholder="9:00"
                                    />
                                    -
                                    <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]" type="time" step="0"
                                        onChange={(e) => {
                                            setEndWednesday(e.target.value)
                                        }}
                                        value={endWednesday}
                                        placeholder="20:00" />
                                    Uhr
                                </div>
                            </div>

                            <div className="flex items-center gap-x-2 w-full font-medium">
                                Donnerstag
                                <div className="flex ml-auto justify-end w-full items-center gap-x-2">
                                    <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]" type="time" step="0"
                                        onChange={(e) => {
                                            setStartThursday(e.target.value)
                                        }}
                                        value={startThursday}
                                        placeholder="9:00"
                                    />
                                    -
                                    <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]" type="time" step="0"
                                        onChange={(e) => {
                                            setEndThursday(e.target.value)
                                        }}
                                        value={endThursday}
                                        placeholder="20:00" />
                                    Uhr
                                </div>
                            </div>

                            <div className="flex items-center gap-x-2 w-full font-medium">
                                Freitag
                                <div className="flex ml-auto justify-end w-full items-center gap-x-2">
                                    <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]" type="time" step="0"
                                        onChange={(e) => {
                                            setStartFriday(e.target.value)
                                        }}
                                        value={startFriday}
                                        placeholder="9:00"
                                    />
                                    -
                                    <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]" type="time" step="0"
                                        onChange={(e) => {
                                            setEndFriday(e.target.value)
                                        }}
                                        value={endFriday}
                                        placeholder="20:00" />
                                    Uhr
                                </div>
                            </div>

                            <div className="flex items-center gap-x-2 w-full font-medium">
                                Samstag
                                <div className="flex ml-auto justify-end w-full items-center gap-x-2">
                                    <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]" type="time" step="0"
                                        onChange={(e) => {
                                            setStartSaturday(e.target.value)
                                        }}
                                        value={startSaturday}
                                        placeholder="9:00"
                                    />
                                    -
                                    <Input className=" dark:bg-[#1C1C1C] border-none w-[100px]" type="time" step="0"
                                        onChange={(e) => {
                                            setEndSaturday(e.target.value)
                                        }}
                                        value={endSaturday}
                                        placeholder="20:00" />
                                    Uhr
                                </div>
                            </div>




                        </div>
                        <div className="mt-4">
                            <DialogTrigger asChild>
                            <Button className="w-full dark:bg-[#1C1C1C]" variant="ghost" size="sm" onClick={onSubmit}>
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