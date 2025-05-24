'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { booking } from "@/db/schema";
import { useEffect, useState, useCallback, useRef } from "react";
import { SearchIcon, X, Calendar, Clock, User, Car, Check } from "lucide-react";
import EditBooking from "./edit-booking";
import DeleteBooking from "./delete-booking";
import useOnclickOutside from "react-cool-onclickoutside";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";

interface SearchBookingInputProps {
    foundBooking: any[];
    foundInserate: any[];
}

const SearchBookingInput: React.FC<SearchBookingInputProps> = ({
    foundBooking,
    foundInserate
}) => {
    const [showDialog, setShowDialog] = useState(false);
    const [renderedBookings, setRenderedBookings] = useState([]);
    const [term, setTerm] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const ref = useOnclickOutside(() => {
        setShowDialog(false);
    });

    // Clear search input
    const clearSearch = useCallback(() => {
        setTerm("");
        setShowDialog(false);
        inputRef.current?.focus();
    }, []);

    // Search function
    useEffect(() => {
        if (term.length > 0) {
            setShowDialog(true);

            const searchTermLower = term.toLowerCase();
            const filteredResults = foundBooking.filter((pBooking) => {
                const nameMatch = pBooking?.name?.toLowerCase().includes(searchTermLower);
                const numberMatch = pBooking?.buchungsnummer?.toLowerCase().includes(searchTermLower);
                const inseratMatch = pBooking?.inserat?.title?.toLowerCase().includes(searchTermLower);
                
                return nameMatch || numberMatch || inseratMatch;
            });

            setRenderedBookings(filteredResults);
        } else {
            setShowDialog(false);
            setRenderedBookings([]);
        }
    }, [term, foundBooking]);

    // Format time from minutes
    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    };

    return (
        <div className="w-full">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium flex items-center gap-1.5">
                        <SearchIcon size={14} />
                        Buchungssuche
                    </Label>
                    {term && (
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-2 text-xs text-muted-foreground"
                            onClick={clearSearch}
                        >
                            Zurücksetzen
                        </Button>
                    )}
                </div>
                
                <div className="relative" ref={ref}>
                    <div className="relative">
                        <Input
                            ref={inputRef}
                            className="pl-9 pr-9 bg-[#0F0F0F] dark:border-gray-800 focus-visible:ring-1 focus-visible:ring-offset-0 placeholder:text-gray-500"
                            placeholder="Name, Buchungsnummer oder Inserat..."
                            value={term}
                            onChange={(e) => setTerm(e.currentTarget.value)}
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <SearchIcon size={16} />
                        </div>
                        {term && (
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-gray-400"
                                onClick={clearSearch}
                            >
                                <X size={14} />
                            </Button>
                        )}
                    </div>
                    
                    <AnimatePresence>
                        {showDialog && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute z-50 mt-1 w-full rounded-md border border-gray-800 bg-[#0F0F0F] shadow-lg"
                            >
                                <ScrollArea className="max-h-[320px] p-2">
                                    {renderedBookings.length > 0 ? (
                                        <div className="space-y-1.5">
                                            <div className="px-2 py-1 text-xs text-gray-400">
                                                {renderedBookings.length} Ergebnis{renderedBookings.length !== 1 ? 'se' : ''} gefunden
                                            </div>
                                            
                                            {renderedBookings.map((pBooking) => (
                                                <div 
                                                    key={pBooking.id} 
                                                    className="rounded-md border border-gray-800 hover:bg-gray-900/40 transition-colors p-2.5"
                                                >
                                                    <div className="flex justify-between items-start gap-3">
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant={pBooking.isAvailability ? "destructive" : "default"} className="h-6">
                                                                    {pBooking.isAvailability ? 'Nicht verfügbar' : 'Buchung'}
                                                                </Badge>
                                                                {pBooking.buchungsnummer && (
                                                                    <span className="text-xs text-gray-400">#{pBooking.buchungsnummer}</span>
                                                                )}
                                                            </div>
                                                            
                                                            <div className="mt-1.5 font-medium text-sm line-clamp-1">
                                                                {pBooking.name || 'Ohne Name'}
                                                            </div>
                                                            
                                                            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
                                                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                                    <Car size={12} className="shrink-0" />
                                                                    <span className="truncate">{pBooking.inserat?.title || 'Unbekanntes Inserat'}</span>
                                                                </div>
                                                                
                                                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                                    <Calendar size={12} className="shrink-0" />
                                                                    <span>
                                                                        {format(new Date(pBooking.startDate), "dd.MM.yyyy")}
                                                                        {' – '}
                                                                        {format(new Date(pBooking.endDate), "dd.MM.yyyy")}
                                                                    </span>
                                                                </div>
                                                                
                                                                {pBooking.vehicle?.title && (
                                                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                                        <Car size={12} className="shrink-0" />
                                                                        <span className="truncate">{pBooking.vehicle.title}</span>
                                                                    </div>
                                                                )}
                                                                
                                                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                                    <Clock size={12} className="shrink-0" />
                                                                    <span>
                                                                        {formatTime(Number(pBooking.startPeriod))}
                                                                        {' – '}
                                                                        {formatTime(Number(pBooking.endPeriod))}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex gap-1 shrink-0">
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
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-6 text-center">
                                            <div className="h-12 w-12 rounded-full bg-gray-800/50 flex items-center justify-center mb-3">
                                                <SearchIcon size={20} className="text-gray-400" />
                                            </div>
                                            <p className="text-sm text-gray-400 font-medium">Keine Ergebnisse gefunden</p>
                                            <p className="text-xs text-gray-500 mt-1 max-w-[260px]">
                                                Versuche andere Suchbegriffe oder überprüfe die Schreibweise.
                                            </p>
                                        </div>
                                    )}
                                </ScrollArea>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default SearchBookingInput;