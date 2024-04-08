import { inserat } from "@/db/schema";

interface RevenuePreviewProps {
    thisInserat : typeof inserat.$inferSelect;
}

const RevenuePreview : React.FC<RevenuePreviewProps> = ({
    thisInserat
}) => {
    
    const estimatedRevenue = thisInserat.dailyPrice ? thisInserat.price * 30 : 0;

    function formatIntegerWithDot(num: number): string {
        const numString = num.toString();
        const length = numString.length;
    
        if (length <= 3) {
            return numString;
        }
    
        const dotPosition = length % 3;
        let result = '';
    
        if (dotPosition !== 0) {
            result += numString.slice(0, dotPosition) + '.';
        }
    
        for (let i = dotPosition; i < length; i += 3) {
            result += numString.slice(i, i + 3);
            if (i + 3 < length) {
                result += '.';
            }
        }
    
        return result;
    }

    return ( 
        <div>
            <div className="dark:bg-[#232323] p-16 rounded-md">
                <h1 className="flex text-sm dark:text-gray-200/70 items-center space-x-2">
                    <div className="mt-auto">
                    fange noch heute an und verdiene bis zu
                    </div> 
                    <div className="text-4xl px-2 text-gray-200 font-semibold">
                        {formatIntegerWithDot(Math.round(estimatedRevenue))} € 
                    </div>
                    <div className="text-sm mb-auto">
                        /Monat *
                    </div>
                    
                </h1>
            </div>
            <div>
                <p className="text-xs dark:text-gray-200/70 mt-1 h-[32px]">
                    *Basierend auf einer durchschnittlichen Auslastung von 30 Tagen im Monat.
                </p>
            </div>
        </div>
     );
}
 
export default RevenuePreview;