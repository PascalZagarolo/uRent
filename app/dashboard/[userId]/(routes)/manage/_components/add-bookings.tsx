import { MdAddCircleOutline } from "react-icons/md";

const AddBooking = () => {
    return ( 
        <div className="w-full bg-[#0F0F0F] p-4 rounded-md">
            <div className="flex items-center">
                <MdAddCircleOutline className="w-4 h-4 mr-2" /> <p className="text-sm font-semibold"> Neue Buchung hinzufügen </p>
            </div>
        </div>
     );
}
 
export default AddBooking;