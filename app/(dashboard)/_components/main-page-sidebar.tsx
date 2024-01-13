'use client';

import { AlignCenter, CarFront, CaravanIcon, ConstructionIcon, TractorIcon, Truck } from "lucide-react";

const MainPageSideBar = () => {
    return ( 
        <div className="h-screen w-[240px]  hidden sm:block bg-[#3d4469] border border-black">
            <h3 className="text-bold text-2xl mt-4 flex justify-center text-gray-100 items-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              <AlignCenter className="mr-4"/> Suchfilter
            </h3>
            <div className="mt-4 ">
                <h3 className="text-gray-100 font-semibold border-2 rounded-md border-black p-2 flex justify-center">
                    Fahrzeugkategorie
                </h3>

                <div className="flex justify-between ml-12 mr-12 mt-8 ]">
                    <p className="p-4 rounded-md bg-white border-2 border-[#212539]">
                        <CarFront/>
                    </p>
                    <p className="p-4 rounded-md bg-white border-2 border-[#212539]">
                        <Truck/>
                    </p>
                </div>

                <div className="flex justify-between ml-12 mr-12 mt-8 ">
                    <p className="p-4 rounded-md bg-white border-2 border-[#212539]">
                        <TractorIcon/>
                    </p>
                    <p className="p-4 rounded-md bg-white border-2 border-[#212539]">
                        <ConstructionIcon/>
                    </p>
                </div>

                <div className="flex justify-between ml-12 mr-12 mt-8 ">
                    <p className="p-4 rounded-md bg-white border-2 border-[#212539] w-[180px] flex justify-center">
                        <CaravanIcon className=""/>
                    </p>
                    
                </div>
            </div>
        </div>
     );
}
 
export default MainPageSideBar;