'use client'

import { Truck } from "lucide-react";
import { useRouter } from "next/navigation";

const HeaderRedirect = () => {

    const router = useRouter();
    return ( 
        <h3 className="flex justify-start items-center py-6 mt-2 sm:mt-0 ml-8 sm:text-3xl text-2xl h-full font-semibold text-white hover:cursor-pointer"
        onClick={() => router.push("/")}
        >
               
                    <div className="text-[#4e5889]  font-font-black ">u</div>
                    <p className="text-[#eaebf0]  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)]">Rent</p>
                </h3>
     );
}
 
export default HeaderRedirect;