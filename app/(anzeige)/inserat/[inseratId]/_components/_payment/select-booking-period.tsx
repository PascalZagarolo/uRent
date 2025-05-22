import BookingCalendarPayment from "./booking-period-components/booking-calendar-payment";
import { useState } from "react";

// You may want to type these props more strictly in a real app
const SelectBookingPeriod = ({ thisInserat, receivedBookings }: any) => {
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);

  // Handler to receive selection from calendar day detail
  const handleSelectRange = (start: Date | null, end: Date | null) => {
    setSelectedStart(start);
    setSelectedEnd(end);
  };

  return (
    <div className="space-y-6 bg-[#f4f6fa] dark:bg-[#181a22]/80 rounded-2xl p-6 shadow-md ">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-200 mb-1">Buchungszeit wählen</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Wähle den gewünschten Zeitraum für deine Buchung im Kalender aus.</p>
      </div>
      <div>
        <BookingCalendarPayment thisInserat={thisInserat} receivedBookings={receivedBookings} onSelectRange={handleSelectRange} />
      </div>
      <div className="mt-4">
        <div className="text-sm text-gray-700 dark:text-gray-200 bg-indigo-50/70 dark:bg-[#23263a]/60 rounded-lg px-4 py-2 font-medium shadow-sm border border-indigo-100 dark:border-indigo-800">
          {selectedStart && selectedEnd ? (
            <div className="flex flex-col gap-1">
              <span className="font-bold text-indigo-700 dark:text-indigo-200">Ausgewählter Zeitraum:</span>
              <span>Start: {selectedStart.toLocaleDateString()} {selectedStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span>Ende: {selectedEnd.toLocaleDateString()} {selectedEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          ) : (
            <span>Bitte wähle einen Start- und Endzeitpunkt aus.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectBookingPeriod;
