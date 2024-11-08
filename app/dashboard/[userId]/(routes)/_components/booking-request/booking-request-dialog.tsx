import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { bookingRequest, inserat } from "@/db/schema";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Image from "next/image";
import CheckAvailability from "./check-request-availability";
import BookingRequestAccept from "./booking-request-accept";



interface BookingRequestDialogProps {
    thisBooking: typeof bookingRequest.$inferSelect | any;
    thisInserat : typeof inserat.$inferSelect | any;
}

const BookingRequestDialog = ({ thisBooking, thisInserat }: BookingRequestDialogProps) => {

   

    function minutesToHours(minutes: number): string {
        // Calculate hours and minutes
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        // Format the result as hh:mm
        return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')} Uhr`;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-1/4 bg-indigo-700 hover:bg-indigo-800 text-white transition duration-150 ease-in-out" size="sm">
                    <InfoCircledIcon className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="border-none bg-[#191919] rounded-lg shadow-lg p-6 max-w-md">
                <div>


                    <div className="flex flex-col gap-2">
                        {/* Title and Image */}
                        <div className="space-y-2">
                            <div className="text-lg font-semibold text-gray-200">
                                {thisBooking?.inserat?.title || 'Titel des Inserats'}
                            </div>
                            <Image
                                className=" object-cover h-40 shadow-lg"
                                src={thisBooking?.inserat?.images[0]?.url || "/placeholder-image.jpg"}
                                alt="Inserat-Bild"
                                width={400}
                                height={200}
                            />
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center space-x-3">
                            <img
                                src={thisBooking?.user?.image || "/placeholder-person.jpg"}
                                alt="user"
                                className="w-8 h-8 rounded-full border border-gray-700"
                            />
                            <a className="text-base font-semibold text-gray-300 hover:underline"
                                href={`/profile/${thisBooking?.user?.id}`}
                                rel="noreferrer"
                                target="_blank"
                            >
                                {thisBooking?.user?.name || 'Benutzername'}
                            </a>
                        </div>

                        {/* Booking Dates */}
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-3">
                                <div className="text-gray-400 w-16">Von</div>
                                <div className="font-medium text-gray-200">
                                    {format(new Date(thisBooking?.createdAt), 'dd.MM.yyyy')}
                                </div>
                                <div className="text-gray-300">
                                    {minutesToHours(thisBooking?.startPeriod)}
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="text-gray-400 w-16">Bis</div>
                                <div className="font-medium text-gray-200">
                                    {format(new Date(thisBooking?.endDate), 'dd.MM.yyyy')}
                                </div>
                                <div className="text-gray-300">
                                    {minutesToHours(thisBooking?.endPeriod)}
                                </div>
                            </div>
                        </div>

                        {/* Additional Content */}
                        <div className="text-sm text-gray-400 mt-3">
                            {thisBooking?.content ? (
                                <span className="text-gray-300">
                                    {thisBooking?.content}
                                </span>
                            ) : (
                                <span>Keine Nachricht angegeben</span>
                            )}
                        </div>
                        <div>
                            <CheckAvailability 
                            pInserat={thisInserat}
                            periodBegin={new Date(thisBooking?.startDate)}
                            periodEnd={new Date(thisBooking?.endDate)}
                            startTime={thisBooking?.startPeriod}
                            endTime={thisBooking?.endPeriod}
                            bookingId={thisBooking?.id}
                            />
                        </div>
                        <div className="">
                        <BookingRequestAccept 
                        pInserat={thisInserat}
                        startTime={thisBooking?.startPeriod}
                        endTime={thisBooking?.endPeriod}
                        startDate={new Date(thisBooking?.startDate)}
                        endDate={new Date(thisBooking?.endDate)}
                        bookingId={thisBooking?.id}
                        title={thisBooking?.inserat?.title + " - " + thisBooking?.user?.name}
                        content={
                            "Buchung für: " + thisBooking?.inserat?.title + "\n" +
                            thisBooking?.user?.name + " möchte das Inserat buchen." + "\n" + "\n" +
                            "Von: " + format(new Date(thisBooking?.startDate), 'dd.MM.yyyy') + " " + minutesToHours(thisBooking?.startPeriod) + "\n" +
                            "Bis: " + format(new Date(thisBooking?.endDate), 'dd.MM.yyyy') + " " + minutesToHours(thisBooking?.endPeriod) + "\n" + "\n" +
                            "Nachricht des Mieters: " +
                            (thisBooking?.content ? thisBooking?.content : "Keine Nachricht angegeben")
                        }
                        />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
}

export default BookingRequestDialog;