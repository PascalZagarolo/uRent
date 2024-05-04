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
                </div>
                <div className="mt-4">
                    <div>
                        <Checkbox />
                        <Label className="ml-2">
                            Inserat privat schalten
                        </Label>
                    </div>
                    <div className="mt-2">
                        <Checkbox />
                        <Label className="ml-2">
                            Inserat löschen
                        </Label>
                    </div>
                </div>
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default AcceptInseratReport;