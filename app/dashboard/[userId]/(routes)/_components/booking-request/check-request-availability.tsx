'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { booking } from '../../../../../../db/schema';
import { inserat } from "@/drizzle/schema";
import { checkAvailability } from "@/actions/check-availability";
import { ClipLoader } from "react-spinners";
import { CheckIcon, X } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import ConflictDialog from "../../manage/_components/conflict-dialog.tsx/conflict-dialog";
import ConflictDialogRequest from "../../manage/_components/conflict-dialog.tsx/conflict-dialog-request";



interface CheckAvailabilityProps {
    pInserat: typeof inserat.$inferSelect | any;
    periodBegin: Date;
    periodEnd: Date;
    startTime: string;
    endTime: string;
    bookingId: string;
}

const CheckAvailability = ({
    pInserat,
    periodBegin,
    periodEnd,
    startTime,
    endTime,
    bookingId
}: CheckAvailabilityProps) => {

    const [isAvailable, setIsAvailable] = useState(null);
    const [conflictedBooking, setConflictedBooking] = useState<typeof booking.$inferSelect | null>(null);
    const [showConflictedBooking, setShowConflictedBooking] = useState(false);
    const [showConflict, setShowConflict] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    

    const checkAvailabilityFunction = async () => {
        try {
            setIsLoading(true);

            const isAvailable: {
                isConflict?: boolean,
                booking?: any
            } = checkAvailability(
                pInserat,
                periodBegin,
                periodEnd,
                startTime,
                endTime,

            )

            if (isAvailable.isConflict) {
                setConflictedBooking(isAvailable.booking)
                setShowConflict(true);
                setIsAvailable(false);
                setIsLoading(false);
            } else {
                setShowConflict(false);
                setIsAvailable(true);
                setIsAvailable(true);
            }

        } catch (e: any) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    if (showConflict) {

        return (
            <ConflictDialogRequest
                title={pInserat?.title}
                reqStartDate={periodBegin}
                reqEndDate={periodEnd}
                reqStartPeriod={startTime}
                reqEndPeriod={endTime}
                conflictedBooking={conflictedBooking}
                setShowConflict={setShowConflict}
                onShowConflictConfirm={() => {}}
            />
        )
    }

    return (
        <Button className={cn(
            "bg-[#222222] shadow-lg hover:bg-[#242424] hover:text-gray-300 text-gray-200 w-full",
            isLoading && "opacity-50 cursor-not-allowed",
            (isAvailable === false && isAvailable !== null) && "bg-red-500 hover:bg-red-600",
            (isAvailable === true && isAvailable !== null) && "bg-emerald-600 hover:bg-emerald-700"
        )}
            onClick={checkAvailabilityFunction}
        >
            {(isAvailable === false && isAvailable !== null) && (
                <X className="w-4 h-4 mr-2" />
            )}

            {(isAvailable === true && isAvailable !== null) && (
                <CheckIcon className="w-4 h-4 mr-2" />
            )}

            {(isAvailable === null && (
                <ReloadIcon className="w-4 h-4 mr-2" />
            ))}


            {isLoading ? (
                <ClipLoader size={20} color="#fffff" />
            ) : (
                isAvailable === null ? (
                    "Verfügbarkeit prüfen"
                ) : (
                    isAvailable ? (
                        "Verfügbar"
                    ) : (
                        `Zeitraum ist nicht verfügbar`
                    )
                )
            )}
        </Button>
    );
}

export default CheckAvailability;