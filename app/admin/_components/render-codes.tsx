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

interface RenderCodesProps {
    existingCodes: typeof giftCode.$inferSelect[]
}


const RenderCodes: React.FC<RenderCodesProps> = ({
    existingCodes
}) => {
    return (
        <div>
            <div>
                <h3 className="font-semibold text-md flex items-center">
                   <CiGift /> Verfügbare Codes
                </h3>
            </div>
            <Table>
                <TableCaption>Auflistung verfügbarer Codes.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[160px]">Name</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Anzahl Inserate</TableHead>
                        <TableHead>Ablauf Datum</TableHead>
                        <TableHead className="text-right">Anzahl Nutzer</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {existingCodes.map((code) =>(
                        <TableRow>
                        <TableCell className="font-medium">{code?.name}</TableCell>
                        <TableCell>{code?.plan}</TableCell>
                        <TableCell>{code?.inseratAmount}</TableCell>
                        <TableCell>{format(code?.expirationDate, "dd.MM.yyyy", { locale : de })}</TableCell>
                        <TableCell className="text-right">{code?.userAmount} ({code?.availableAmount})</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default RenderCodes;