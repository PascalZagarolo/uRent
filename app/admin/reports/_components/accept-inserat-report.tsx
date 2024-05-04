'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { report } from "@/db/schema";
import axios from "axios";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";


interface AcceptInseratReportProps {
    thisReport : typeof report.$inferSelect
}

const AcceptInseratReport : React.FC<AcceptInseratReportProps> = ({
    thisReport
}) => {

    const[isLoading, setIsLoading] = useState(false);
    const[actionType, setActionType] = useState<"private" | "delete">(null);

    const router = useRouter();

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const values = {
                actionType : actionType,
                reportId : thisReport.id
            }
            await axios.patch(`/api/report/action/inserat/${thisReport?.inseratId}`, values)
                .then(() => {
                    toast.success("Report erfolgreich bearbeitet")
                    router.refresh();
                })
        } catch(error : any) {
            console.log(error);
            toast.error("Fehler beim bearbeiten des Reports")
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <Dialog>
            <DialogTrigger asChild>
            <Button className="bg-emerald-800 hover:bg-emerald-900 hover:text-gray-300" size="sm">
                        <CheckIcon className="w-4 h-4 text-gray-200" />
                    </Button>
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                <div>
                    <h1 className="text-md font-semibold">
                        Verwaltungsoptionen
                    </h1>
                    <p className="text-xs dark:text-gray-200/60">
                        ReportId : {thisReport.id}
                    </p>
                </div>
                <div className="mt-4 ">
                    <div className="text-sm">
                        Gemeldetes Inserat
                    </div>
                    <div className=" text-rose-600 font-bold">
                    {// @ts-ignore
                    thisReport?.inserat?.title}
                    </div>
                </div>
                <div className="mt-4 ">
                    <div className="text-sm">
                        Grund
                    </div>
                    <div className=" text-rose-600 font-bold">
                    {thisReport?.reportType}
                    </div>
                </div>
                <div className="mt-4 ">
                    <Label className="text-sm font-medium">
                        Aktion
                    </Label>
                    <div  className="flex items-center text-sm mt-2">
                        <Checkbox 
                        onCheckedChange={(e) => setActionType("private")}
                        checked={actionType === "private"}
                        />
                        <div className="ml-2 hover:cursor-pointer" onClick={() => {setActionType("private")}}>
                            Inserat privat schalten
                        </div>
                    </div>
                    <div className="mt-2  flex items-center text-sm"  >
                        <Checkbox 
                        onCheckedChange={(e) => setActionType("delete")}
                        checked={actionType === "delete"}
                        />
                        <div className="ml-2 w-content hover:cursor-pointer" onClick={() => {setActionType("delete")}}>
                            Inserat löschen
                        </div>
                    </div>
                </div>
                <div className="mt-2 w-full  flex justify-end"> 
                    <DialogTrigger asChild>
                    <Button className="bg-rose-600 hover:bg-rose-700 text-gray-200 font-semibold hover:text-gray-300" 
                    size="sm"
                    onClick={onSubmit}
                    disabled={isLoading || !actionType} 
                    >
                        Bestätigen
                    </Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                    <Button className="" variant="ghost" size="sm">
                        Abbrechen
                    </Button>
                    </DialogTrigger>
                </div>
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default AcceptInseratReport;