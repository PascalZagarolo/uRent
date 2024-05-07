import { DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface CalenderDayDetailProps {
    numberDay: number;
}

const CalenderDayDetail : React.FC<CalenderDayDetailProps> = ({
    numberDay
}) => {
    return ( 
        <DialogContent>
            <DialogTrigger>
            </DialogTrigger>
        </DialogContent>
     );
}
 
export default CalenderDayDetail;