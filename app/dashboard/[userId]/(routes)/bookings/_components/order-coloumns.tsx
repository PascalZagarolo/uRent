import { Purchase, Inserat, User,  Booking, Images } from "@prisma/client";
import { format } from "date-fns";

interface OrderColoumnsProps {
    booking : Booking & { inserat : Inserat & { images : Images[] }, user : User }
}

const OrderColoumns: React.FC<OrderColoumnsProps> = ({
    booking
}) => {

    const today = new Date();

    const formatDate = (inputDate: Date): string => {
        const returnDate =  format(new Date(inputDate), "dd.MM.yy")
      
        return returnDate;
      };

      const formatPeriod = (inputDate: Date): string => {
        const day = ('0' + inputDate?.getDate()).slice(-2);
        const month = ('0' + (inputDate?.getMonth() + 1)).slice(-2);
        const year = inputDate?.getFullYear();
      
        return `${day}.${month}`;
      };

    return (  
        <div className="mt-4 bg-white dark:bg-[#0F0F0F] border-2 border-gray-300 p-4 rounded-lg 2xl:mr-8  items-center ">
            <div className="flex gap-x-4 items-center">
                <div className="md:flex md:w-[100px] hidden">
                    <img 
                    src={booking.inserat.images[0].url}
                    />
                </div>
                <div className="flex justify-center w-1/4 overflow-hidden">
                    <p className="flex font-semibold truncate text-sm justify-center">{booking.inserat.title}</p>
                </div>
                <div className="flex w-1/8 md:w-2/8">
                    <p className="flex font-semibold truncate">{booking.user.name}</p>
                </div>
                <div className="md:flex w-1/8 justify-center hidden ">
                    <div className="flex font-semibold justify-center truncate">{booking.inserat.price}€ {booking.inserat.annual && "/ Tag"}</div>
                </div>
                <div className="flex w-1/4 justify-center">
                    <p className="flex font-semibold mr-2">{formatPeriod(booking.startDate)}</p>
                    bis
                    <p className="flex font-semibold ml-2">{formatDate(booking.endDate)}</p>
                </div>
                <div className="hidden md:flex">
                    {booking.endDate < today ? (
                        <p className="flex font-semibold text-red-500">Abgelaufen</p>
                    ) : (
                        <p className="flex font-semibold text-green-500">Aktiv</p>
                    
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default OrderColoumns;