'use client'

import { giftCode } from "@/db/schema";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { CiGift } from "react-icons/ci";
import { format } from "date-fns";
import { de } from "date-fns/locale";

import DeleteCode from "./delete-code";
import EditCode from "./edit-code";
import { useEffect, useState } from "react";



interface RenderCodesProps {
    existingCodes: typeof giftCode.$inferSelect[]
}


const RenderCodes: React.FC<RenderCodesProps> = ({
    existingCodes
}) => {

    

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    },[])
    
    if(!isMounted){
        return null
    }

    return (
        <div>
            <div>
                <h3 className="font-semibold text-md flex items-center">
                   <CiGift className="w-4 h-4 mr-2"/> Verfügbare Codes
                </h3>
            </div>
            <Table>
                <TableCaption>Auflistung verfügbarer Codes.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Name</TableHead>
                        <TableHead></TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Anz. Inserate</TableHead>
                        <TableHead>Dauer</TableHead>
                        <TableHead>Ablauf Datum</TableHead>
                        <TableHead className="text-right">Anzahl Nutzer</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {existingCodes.map((code) =>(
                        <TableRow key={code.id}>
                        <TableCell className="font-medium">{code?.name}</TableCell>
                        <TableCell className="font-medium">{code?.code}</TableCell>
                        <TableCell>{code?.plan}</TableCell>
                        <TableCell>{code?.inseratAmount}</TableCell>
                        <TableCell>{code?.months} {code?.months === 1 ? "Monat" : "Monate"}</TableCell>
                        <TableCell>{format(code?.expirationDate, "dd.MM.yyyy", { locale : de })}</TableCell>
                        <TableCell className="text-right">{code?.userAmount} ({code?.availableAmount})</TableCell>
                        <div className="flex items-center mt-4 gap-x-2 px-2">
                            <EditCode 
                            thisCode = {code}
                            />
                            <div>
                                <DeleteCode
                                
                                codeId={code.id}
                                />
                            </div>
                        </div>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default RenderCodes;