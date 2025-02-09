import { Label } from "@/components/ui/label";
import { CarIcon, TruckIcon } from "lucide-react";
import Image from "next/image";
import { FaUserCheck } from "react-icons/fa";
import { FaTruck } from "react-icons/fa6";
import { GiCarKey } from "react-icons/gi";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { PiVan } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";

const LoginWrapper = () => {
    return (
        <div className="p-4 h-full flex flex-col">
            <div className="flex flex-col items-center px-8 py-8">
                <div className="text-lg text-gray-200/80">
                    Willkommen zurück auf
                </div>
                <p className="text-gray-200 text-4xl font-semibold">
                    uRent!
                </p>
            </div>
            <div>
                {/* <p className="text-sm text-gray-200/60 font-medium">
                    Du bist auf dem richtigen Weg. <br/>
                    So einfach nutzt du uRent:
                </p> */}
            </div>
            <div className="flex flex-row space-x-4 h-full w-[400px]">
                




            </div>
            <div className="flex flex-row">
                <Image
                    width={200}
                    height={200}
                    alt="Logo"
                    className="w-16 h-16 shadow-lg rounded-md"
                    src={"/uRent.png"}
                />
                <div className="mt-auto ml-auto text-xs text-gray-200/80">
                    © 2025 uRent. All Rights reserved.
                </div>
            </div>
        </div>
    );
}

export default LoginWrapper;