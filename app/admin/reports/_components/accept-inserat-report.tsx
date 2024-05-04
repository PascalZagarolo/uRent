'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { report } from "@/db/schema";
import { CheckIcon } from "lucide-react";
import React, { useState } from "react";


interface AcceptInseratReportProps {
    thisReport : typeof report.$inferSelect
}

const AcceptInseratReport : React.FC<AcceptInseratReportProps> = ({
    thisReport
}) => {

    const[isLoading, setIsLoading] = useState(false);
    const[actionType, setActionType] = useState<"private" | "delete">(null);

    const onSubmit = () => {
        try {

        } catch(error : any) {
            console.log(error);
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
                    {thisReport?.inserat?.title}
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
                    <Button className="bg-rose-600 hover:bg-rose-700 text-gray-200 font-semibold hover:text-gray-300" size="sm">
                        Bestätigen
                    </Button>
                    <Button className="" variant="ghost" size="sm">
                        Abbrechen
                    </Button>
                </div>
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default AcceptInseratReport;