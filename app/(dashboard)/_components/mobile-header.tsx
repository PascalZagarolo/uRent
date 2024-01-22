'use client'

import { Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchItem from "./search-item";

const MobileHeader = () => {

    const router = useRouter();

    return ( 
        <div className="bg-[#1f2332] h-[80px] border-2 border-black">
            <div className="flex items-center">
            <h3 className="flex justify-start items-center py-6 ml-4 text-3xl font-semibold text-white hover:cursor-pointer" onClick={() => {
                    router.push('/')
                }}>
                    <Truck className="ml-1 mr-2"/>
                    <div className="text-[#4e5889] font-font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">u</div>
                    <p className="text-[#eaebf0] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)]">Rent</p>
                </h3>
                <div className="flex justify-center ml-4 p-2">
                    <SearchItem/>
                </div>
            </div>
        </div>
     );
}
 
export default MobileHeader;