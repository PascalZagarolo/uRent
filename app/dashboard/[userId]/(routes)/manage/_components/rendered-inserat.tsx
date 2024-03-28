import { inserat } from "@/db/schema";
import { format } from "date-fns";
import { CalendarCheck2Icon, CarFront, Truck } from "lucide-react";
import Image from "next/image";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";

interface RenderedInseratProps { 
    thisInserat : typeof inserat.$inferSelect
}

const RenderedInserat: React.FC<RenderedInseratProps> = ({
    thisInserat
}) => {
    return ( 
        <div className="w-full">
            <div className="p-4">
                <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-md bg-[#1C1C1C]">
                    {
                        {
                            'PKW': <CarFront className=" text-gray-100 h-4 w-4 " />,
                            'LKW': <Truck className=" text-gray-100 h-4 w-4 " />,
                            'TRANSPORT': <PiVanFill className=" text-gray-100 h-4 w-4 " />,
                            'TRAILER': <RiCaravanLine className="text-gray-100 w-4 h-4" />
                        }[thisInserat.category]
                    }
                    </div>
                <h3 className="text-sm font-semibold">
                    {thisInserat?.title}
                </h3>
                </div>
                <div className="mt-2">
                    <div className="w-full flex justify-center">
                        <Image
                        alt="preview image"
                        width={1000}
                        height={1000}
                        src={thisInserat?.images[0].url} 
                        className="w-full h-[200px] object-cover"
                        />
                    </div>
                    <div className="w-full mt-2 flex justify-start">
                        <CalendarCheck2Icon
                        className="w-4 h-4 mr-2"
                        />
                        {thisInserat?.annual ? (
                            <p className="text-sm">
                                Dauerhaftes Inserat
                            </p>
                        ) : (
                            <p className="text-sm">
                                {format(new Date(thisInserat?.begin), 'dd.MM.yyyy')} - {format(new Date(thisInserat?.end), 'dd.MM.yyyy')}
                            </p>
                        )}
                        <div className="ml-auto text-sm flex font-semibold">
                            {thisInserat?.price} € <p className="text-xs">{thisInserat?.annual ? "/Zeitraum" : "/Tag"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default RenderedInserat;