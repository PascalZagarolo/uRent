import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import { BiLandscape } from "react-icons/bi";
import { RiMapPinUserLine } from "react-icons/ri";

const StandortRender = () => {
    return ( 
        <div>
            <div className="dark:bg-[#191919] p-4">
                <h1 className="text-md font-semibold flex">
                <BiLandscape className="w-4 h-4 mr-2"/>  Standort
                </h1>
            </div>
            <div className="dark:bg-[#191919]  rounded-t-md ">
                <div className="gap-4 flex p-4 mt-4">
                    <MapPinIcon className="h-4 w-4" />
                    <div className="text-sm font-semibold">
                        Mittestraße 12, 42659 Solingen, Deutschland
                    </div>
                </div>
                <div className="w-full h-[100px] px-2 pb-2">
                <Image 
                    alt="map"
                    src="/example.jpg"
                    width={500}
                    height={300}
                    className="w-full object-cover h-[100px]"
                    />
                </div>
            </div>
        </div>
     );
}
 
export default StandortRender;