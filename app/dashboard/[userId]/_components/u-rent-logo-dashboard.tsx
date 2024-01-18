'use client'

import { Truck } from "lucide-react";
import { useRouter } from "next/navigation";

const UrentDashboardLogoHeader = () => {

    const router = useRouter()

    return (
        <div className="flex justify-center ">
            <h3 className="flex justify-start items-center py-4 mt-2  text-3xl font-semibold text-white hover:cursor-pointer "
            onClick={() => {router.push(`/`)}}
            >
                <p className="text-sm"></p> <Truck className=" mr-2" />
                <div className="text-[#4e5889] font-font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">u</div>
                <p className="text-[#eaebf0] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)]">Rent</p>
            </h3>
        </div>
    );
}

export default UrentDashboardLogoHeader;