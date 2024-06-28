'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { booking } from "@/db/schema";
import { set } from 'date-fns';
import { useEffect, useMemo, useState } from "react";
import { vehicle } from '../../../../../../drizzle/schema';
import { PencilIcon, TrashIcon } from "lucide-react";
import EditBooking from "./edit-booking";
import EditBookingDialog from "@/app/(anzeige)/inserat/[inseratId]/_components/edit-booking-dialog";
import DeleteBooking from "./delete-booking";


interface SearchBookingInputProps {
    foundBooking: any[];
    foundInserate : any[];
}

const SearchBookingInput: React.FC<SearchBookingInputProps> = ({
    foundBooking,
    foundInserate
}) => {

    const [showDialog, setShowDialog] = useState(false);

    const [renderedBookings, setRenderedBookings] = useState(foundBooking);

    const [term, setTerm] = useState("");

    useMemo(() => {

        if (term.length > 0) {
            setShowDialog(true);

            const filteredP = foundBooking.filter((pBooking) => {
                return pBooking.name.includes(term)
            })

            setRenderedBookings(filteredP);
        } else {
            setShowDialog(false);
        }
    }, [term])

    return (
        <div className="w-full">
            <div className="w-full">
                <div>
                    <Label className="text-sm font-semibold">
                        Nach Buchungen suchen
                    </Label>
                </div>
                <div className="relative w-full">
                    <Input
                        className="w-full bg-[#0F0F0F] dark:border-none"
                        placeholder="Buchungsnr. , Name, Interne Buchungsnr..."
                        value={term}
                        onChange={(e) => { setTerm(e.currentTarget.value) }}
                    />
                    {showDialog && (
                        <div className="bg-[#0F0F0F] rounded-md p-4 mt-2">
                            {renderedBookings.length > 0 ? (
                                <div className="block space-y-2">
                                    {renderedBookings.map((pBooking) => (
                                        <div className="w-full">
                                            <div className="rounded-md text-gray-200 text-sm hover:text-gray-300 w-full justify-start flex">
                                                <div className="w-full flex items-center gap-x-1">
                                                    <div>
                                                        {pBooking.isAvailability ? (
                                                            <div className="py-1 px-2 bg-rose-800 rounded-md">
                                                                V
                                                            </div>
                                                        ) : (
                                                            <div className="py-1 px-2 bg-indigo-800 rounded-md">
                                                                B
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="w-1/4">
                                                        <div className="text-xs text-gray-200/80 w-full line-clamp-1 break-all break-words">
                                                            {pBooking.inserat.title}
                                                        </div>
                                                        <div className="text-xs text-gray-200/80 w-full line-clamp-1 break-all break-words">
                                                            {pBooking.vehicle?.title}
                                                        </div>
                                                    </div>
                                                    <div className="w-1/4 line-clamp-1 break-all font-semibold text-left">
                                                        {pBooking.name}
                                                    </div>
                                                    <div className="w-1/4 line-clamp-1 break-all font-semibold text-left">
                                                        {pBooking.buchungsnummer}
                                                    </div>
                                                    <div className="w-1/4 flex justify-end ">
                                                    
                                                        <EditBooking
                                                        thisBooking={pBooking}
                                                        foundInserate={foundInserate}
                                                        useHover={true}
                                                        />
                                                        
                                                        
                                                        <DeleteBooking 
                                                        bookingId={pBooking.id}
                                                        useHover={true}
                                                        />
                                                        

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center text-xs text-gray-200/60">
                                    Keine passenden Ergebnisse gefunden..
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchBookingInput;