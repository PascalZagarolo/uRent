import { Purchase, Inserat, User } from "@prisma/client";

interface OrderColoumnsProps {
    purchase : Purchase & { inserat : Inserat & { user : User} }
}

const OrderColoumns: React.FC<OrderColoumnsProps> = ({
    purchase
}) => {

    const formatDate = (inputDate: Date): string => {
        const day = ('0' + inputDate.getDate()).slice(-2);
        const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
        const year = inputDate.getFullYear();
      
        return `${day}.${month}.${year}`;
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
                    <p>{formatDate(purchase.createdAt)}</p>
                </div>
                <div className="flex w-[100px]">
                    <p className="flex font-semibold">{purchase.inserat.title}</p>
                </div>
                <div className="flex w-[100px]">
                    <p className="flex font-semibold">{purchase.inserat.user.name}</p>
                </div>
                <div className="flex w-[40px]">
                    <p className="flex font-semibold">{purchase.inserat.price}€</p>
                </div>
                <div className="flex w-[240px] justify-center">
                    <p className="flex font-semibold mr-2">{formatPeriod(purchase.inserat.begin)}</p>
                    bis
                    <p className="flex font-semibold ml-2">{formatDate(purchase.inserat.end)}</p>
                </div>
            </div>
        </div>
     );
}
 
export default OrderColoumns;