import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { CalendarRange } from "lucide-react";

const Bookings = () => {
    return ( 
        <Dialog>
            <DialogTrigger asChild className="p-2">
                <Button className="sm:w-[240px] w-full  border-2 border-gray-100 bg-white" variant="ghost">
                  <CalendarRange className="mr-2"/>  Buchungen verwalten
                </Button>
            </DialogTrigger>
        </Dialog>
     );
}
 
export default Bookings;