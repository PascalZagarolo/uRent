import { checkAvailability } from "@/actions/check-availability";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ForwardIcon } from "lucide-react";
import { useState } from "react";
import AddAvailability from "../../manage/_components/add-availability";
import { inserat } from "@/db/schema";
import AddBooking from "../../manage/_components/add-bookings";



interface BookingRequestAcceptProps {
   pInserat: typeof inserat.$inferSelect;
   startTime: string;
   endTime: string;
   startDate: Date;
   endDate: Date;
   bookingId: string;
   title: string;
   content: string;
   onClose : () => void;
}





const BookingRequestAccept = ({
   pInserat,
   startTime,
   endTime,
   startDate,
   endDate,
   bookingId,
   title,
   content,
   onClose,
}) => {

   const [showDialog, setShowDialog] = useState<"AVAILABILITY" | "BOOKING" | null>(null);

   const onAccept = async (isAvailability: boolean) => {
      try {
         if (isAvailability) {
            setShowDialog("AVAILABILITY");
         } else {
            setShowDialog("BOOKING");
         }
      } catch (e: any) {
         console.log(e);

      }
   }

  

   if (showDialog === "AVAILABILITY") {
      return (
         <AddAvailability
            foundInserate={[pInserat]}
            open={true}
            onClose={() => setShowDialog(null)}
            usedInserat={pInserat}
            usedStart={startDate}
            usedEnd={endDate}
            usedStartTime={startTime}
            usedEndTime={endTime}
            usedContent={content}
            usedTitle={title}
            requestId={bookingId}
         />
      )
   } else if (showDialog === "BOOKING") {
      return (
         <AddBooking
            foundInserate={[pInserat]}
            open={true}
            onClose={() => setShowDialog(null)}
            usedInserat={pInserat}
            usedStart={startDate}
            usedEnd={endDate}
            usedStartTime={startTime}
            usedEndTime={endTime}
            usedContent={content}
            usedTitle={title}
            requestId={bookingId}
         />
      )
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