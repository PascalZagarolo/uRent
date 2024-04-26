import { TruckIcon } from "lucide-react";
import Image from "next/image";
import { FaRegWindowMinimize } from "react-icons/fa";
import { PiCursorClickLight } from "react-icons/pi";

const BasicUrentBanner = () => {
    return (
        <div className="w-full">
            <div className="text-4xl w-full">

                <div className="grid grid-cols-2 cols-reverse gap-4 w-full">
                    <div className="p-4 font-semibold">
        	            <div>
                            Pkw
                        </div>
                        <div>
                            Lkw
                        </div>
                        <div>
                            Anhänger
                        </div>
                        <div>
                            Transporter
                        </div>
                        <p className="text-sm flex items-center"> 
                            nur ein paar Klicks entfernt! <PiCursorClickLight className="w-6 h-6 ml-2" />
                        </p>
                        <div className="flex items-center">
                            
                        <FaRegWindowMinimize 
                        className="w-24 h-24"
                        />
                        <FaRegWindowMinimize 
                        className="w-24 h-24"
                        />
                            <TruckIcon
                             className="w-24 h-24"
                            />
                        </div>
                    </div>
                    <div className=" p-4 w-full flex justify-start h-full">
                    <div className="w-full h-full">
                    <div className="">
                    Mieten?
                </div>
                <div className="">
                    Vermieten?
                </div>
                <div className="w-full h-full">
                    <img
                        src={'/uRent.png'}
                        className="w-[200px] h-[200px]"
                        alt="uRent"
                        
                    />
                </div>
                    </div>
                    </div>
                </div>


                


            </div>
        </div>
    );
}

export default BasicUrentBanner;