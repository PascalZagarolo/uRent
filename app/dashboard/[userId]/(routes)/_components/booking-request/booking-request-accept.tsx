import { checkAvailability } from "@/actions/check-availability";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ForwardIcon } from "lucide-react";
import { useState } from "react";


interface BookingRequestAcceptProps {
   pInserat: string;
   startTime: string;
   endTime: string;
   startDate: Date;
   endDate: Date;
   bookingId: string;
}





const BookingRequestAccept = ({
   pInserat,
   startTime,
   endTime,
   startDate,
   endDate,
   bookingId
}) => {

   const [showVehicle, setShowVehicle] = useState(false);
   const [showConflict, setShowConflict] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [isAvailable, setIsAvailable] = useState(null);
   const [conflictedBooking, setConflictedBooking] = useState(null);
   const [showBooking, setShowBooking] = useState(false);

   const onAccept = async (isAvailability : boolean) => {
      try {

         const isAvailable: {
            isConflict?: boolean,
            booking?: any
         } = checkAvailability(
            pInserat,
            startDate,
            endDate,
            startTime,
            endTime,

         )

         if (isAvailable.isConflict) {
            setConflictedBooking(isAvailable.booking)
            setShowConflict(true);
            setIsAvailable(false);
            setIsLoading(false);
         } else {
            //display showBookingEdit with prefilled values, set vehicles on multi inserate, that are not available as disabled,
            //after writing checkAvailability for multi inserate
         }

      } catch (e: any) {
         console.log(e);

      }
   }

   if (showBooking) {

   }

   return (
      <div className="space-y-2 mt-4">
         <Button className="bg-[#222222] hover:bg-[#242424] shadow-lg text-gray-200 hover:text-gray-300 w-full border border-indigo-800"
         onClick={() => onAccept(true)}
         >
            <ForwardIcon className="w-4 h-4 mr-2" /> Als Verfügbarkeit übernehmen
         </Button>
         <Button className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300 w-full"
         onClick={() => onAccept(false)}
         >
            <CalendarIcon className="w-4 h-4 mr-2" /> Als Buchung übernehmen
         </Button>
      </div>
   );
}

export default BookingRequestAccept;