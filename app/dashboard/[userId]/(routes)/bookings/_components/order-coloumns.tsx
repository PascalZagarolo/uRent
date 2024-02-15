import { Purchase, Inserat, User,  Booking, Images } from "@prisma/client";
import { format } from "date-fns";

interface OrderColoumnsProps {
    booking : Booking & { inserat : Inserat & { images : Images[] }, user : User }
}

const OrderColoumns: React.FC<OrderColoumnsProps> = ({
    booking
}) => {

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
        <div className="mt-4 bg-white border-2 border-gray-300 p-4 rounded-lg mr-32 items-center">
            <div className="flex gap-x-4">
                <div className="flex w-[100px]">
                    <img 
                    src={booking.inserat.images[0].url}
                    />
                </div>
                <div className="flex w-[180px]">
                    <p className="flex font-semibold truncate text-sm">{booking.inserat.title}</p>
                </div>
                <div className="flex w-[100px]">
                    <p className="flex font-semibold">{booking.user.name}</p>
                </div>
                <div className="flex w-[40px]">
                    <p className="flex font-semibold">{booking.inserat.price}€</p>
                </div>
                <div className="flex w-[240px] justify-center">
                    <p className="flex font-semibold mr-2">{formatPeriod(booking.startDate)}</p>
                    bis
                    <p className="flex font-semibold ml-2">{formatDate(booking.endDate)}</p>
                </div>
            </div>
        </div>
     );
}
 
export default OrderColoumns;