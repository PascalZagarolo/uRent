import { Purchase, Inserat, User, Favourite } from "@prisma/client";
import { format } from "date-fns";

interface OrderColoumnsProps {
    favourite : Favourite & { inserat : Inserat & { user : User} }
}

const OrderColoumns: React.FC<OrderColoumnsProps> = ({
    favourite
}) => {

    const formatDate = (inputDate: Date): string => {
        const returnDate =  format(new Date(2014, 1, 11), "yyyy-MM-dd")
      
        return returnDate;
      };

      const formatPeriod = (inputDate: Date): string => {
        const day = ('0' + inputDate.getDate()).slice(-2);
        const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
        const year = inputDate.getFullYear();
      
        return `${day}.${month}`;
      };

    return ( 
        <div className="mt-4 bg-white border-2 border-gray-300 p-4 rounded-lg mr-32">
            <div className="flex gap-x-4">
                <div className="flex w-[100px]">
                    
                </div>
                <div className="flex w-[100px]">
                    <p className="flex font-semibold">{favourite.inserat.title}</p>
                </div>
                <div className="flex w-[100px]">
                    <p className="flex font-semibold">{favourite.inserat.user.name}</p>
                </div>
                <div className="flex w-[40px]">
                    <p className="flex font-semibold">{favourite.inserat.price}€</p>
                </div>
                <div className="flex w-[240px] justify-center">
                    <p className="flex font-semibold mr-2">{formatPeriod(favourite.inserat.begin)}</p>
                    bis
                    <p className="flex font-semibold ml-2">{formatDate(favourite.inserat.end)}</p>
                </div>
            </div>
        </div>
     );
}
 
export default OrderColoumns;