'use client'

import { booking, inserat } from "@/db/schema";
import BookingDayDetails from "./booking-day-details";
import EventCalendar from "./calendar";
import { use, useEffect, useState, useCallback, useMemo } from "react";
import { IoCalendar } from "react-icons/io5";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import SearchBookingInput from "../manage/_components/search-booking";
import { Checkbox } from "@/components/ui/checkbox";
import { Car, Check } from "lucide-react";


interface CalendarAndDetailsProps {
    foundInserate: typeof inserat.$inferSelect[];
    involvedBookings: typeof booking.$inferSelect[];
}

const CalendarAndDetails: React.FC<CalendarAndDetailsProps> = ({
    foundInserate,
    involvedBookings
}) => {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [relevantBookings, setRelevantBookings] = useState([]);
    const [selectedInserat, setSelectedInserat] = useState(null);
    const [selectedInseratData, setSelectedInseratData] = useState<null | typeof inserat.$inferSelect>(null);
    const [showPastBookings, setShowPastBookings] = useState(false);
    const [filterStatus, setFilterStatus] = useState<string[]>(['booked', 'unavailable']);
    
    // Memoize rendered inserate based on selected inserat
    const renderedInserate = useMemo(() => {
        if (selectedInserat === null) {
            return foundInserate;
        }
        return foundInserate.filter(inserat => inserat.id === selectedInserat);
    }, [foundInserate, selectedInserat]);
    
    // Handle inserat selection
    const handleInseratChange = useCallback((value) => {
        setSelectedInserat(value);
        setSelectedInseratData(foundInserate.find(inserat => inserat.id === value) || null);
    }, [foundInserate]);

    // Filter bookings by selected date and inserat
    useEffect(() => {
        let filtered = [...involvedBookings];
        
        // Apply date filtering
        if (!showPastBookings) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            filtered = filtered.filter(booking => new Date(booking.endDate) >= today);
        }
        
        // Apply inserat filtering
        if (selectedInserat) {
            filtered = filtered.filter(booking => booking.inseratId === selectedInserat);
        }
        
        // Apply status filtering
        if (filterStatus.length > 0) {
            filtered = filtered.filter(booking => {
                // Map booking.isAvailability to status
                const status = booking.isAvailability ? 'unavailable' : 'booked';
                return filterStatus.includes(status);
            });
        }
        
        setRelevantBookings(filtered);
    }, [involvedBookings, selectedInserat, showPastBookings, filterStatus]);

    // Count bookings by status
    const countBookingsByStatus = (status: string) => {
        if (!involvedBookings) return 0;
        
        if (status === 'unavailable') {
            return involvedBookings.filter(booking => booking.isAvailability).length;
        } else if (status === 'booked') {
            return involvedBookings.filter(booking => !booking.isAvailability).length;
        }
        
        return 0;
    };

    return (
        <div>
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <IoCalendar className="w-5 h-5" /> 
                            Termine und Details
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                            Verwalte Buchungen und Verfügbarkeiten deiner Inserate
                        </p>
                    </div>
                    
                    <div className="flex gap-3 items-center">
                        <div className="relative w-full sm:w-[280px]">
                            <Select value={selectedInserat} onValueChange={handleInseratChange}>
                                <SelectTrigger className="dark:bg-[#191919] dark:border-gray-800 focus:ring-offset-0 focus:ring-1">
                                    <div className="flex items-center gap-2 truncate">
                                        <Car size={14} className="shrink-0 text-gray-400" />
                                        <SelectValue placeholder="Alle Inserate" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="dark:bg-[#191919] dark:border-gray-800 max-h-[320px]">
                                    <div className="py-1.5 px-2 mb-1 border-b dark:border-gray-800">
                                        <p className="text-xs font-medium text-gray-400">Inserat auswählen</p>
                                    </div>
                                    <SelectItem value={null} className="flex items-center gap-2">
                                        <span className="flex items-center gap-2">
                                            <Check size={14} className="opacity-70" />
                                            Alle Inserate ({foundInserate.length})
                                        </span>
                                    </SelectItem>
                                    
                                    {foundInserate.map((pInserat) => (
                                        <SelectItem value={pInserat.id} key={pInserat.id} className="flex items-center gap-2">
                                            <span className="flex items-center truncate">
                                                <Car size={14} className="mr-2 shrink-0 opacity-70" />
                                                {pInserat.title}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 ">
            {useMemo(() => (
                <SearchBookingInput
                    foundBooking={involvedBookings}
                    foundInserate={foundInserate}
                />
            ), [involvedBookings, foundInserate])}
            </div>
            <div className="w-full mt-4">
            {useMemo(() => (
                <EventCalendar
                    everyInserat={foundInserate}
                    setSelectedDateParent={setSelectedDate}
                    setRelevantBookingsParent={setRelevantBookings}
                    bookings={involvedBookings}
                    selectedInserat={selectedInserat}
                    selectedDate={selectedDate}
                />
            ), [foundInserate, involvedBookings, selectedInserat, selectedDate, setSelectedDate, setRelevantBookings])}
            </div>
            <div className="flex w-full items-center  gap-x-4 mt-4 ">
                <div className="flex items-center gap-x-2">
                    <div className="h-[12px] w-[12px]  bg-indigo-800"/>
                    <Label>
                        Buchungen
                    </Label>
                </div>
                <div className="flex items-center gap-x-2">
                    <div className="h-[12px] w-[12px]  bg-rose-800"/>
                    <Label>
                        Verfügbarkeiten
                    </Label>
                </div>
            </div>
            <div className="mt-4 w-full">
            {useMemo(() => (
                <BookingDayDetails
                foundInserate={foundInserate}
                selectedDate={selectedDate}
                relevantBookings={relevantBookings}
                selectedInserat={selectedInserat}
                selectedInseratData={selectedInseratData}
                renderedInserate={renderedInserate}
            />
            ), [foundInserate, selectedDate, relevantBookings, selectedInserat, selectedInseratData, renderedInserate])}
            </div>
           {/*
            <div>
                <h4 className="font-medium text-sm mb-2">Status</h4>
                <div className="space-y-2">
                    {['booked', 'unavailable'].map(status => (
                        <div key={status} className="flex items-center space-x-2">
                            <Checkbox 
                                id={`status-${status}`} 
                                checked={filterStatus.includes(status)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setFilterStatus(prev => [...prev, status]);
                                    } else {
                                        setFilterStatus(prev => prev.filter(s => s !== status));
                                    }
                                }}
                            />
                            <label htmlFor={`status-${status}`} className="text-sm cursor-pointer capitalize">
                                {status === 'booked' ? 'Buchungen' : 'Nicht verfügbar'}
                                <span className="ml-1 text-xs text-gray-500">
                                    ({countBookingsByStatus(status)})
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
           */}
        </div>
    );
}

export default CalendarAndDetails;