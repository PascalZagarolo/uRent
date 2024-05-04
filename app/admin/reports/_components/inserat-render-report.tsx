'use client'

import { report } from "@/db/schema";
import Vorname from '../../../settings/_components/change-vorname';
import { CheckIcon, UserIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BsInfoSquareFill } from "react-icons/bs";
import { AiOutlineInfo } from "react-icons/ai";
import { PiInfoBold } from "react-icons/pi";

interface InseratRenderReportProps {
    thisReport : typeof report.$inferSelect
}


const InseratRenderReport : React.FC<InseratRenderReportProps> = ({
    thisReport
}) => {

   console.log(thisReport)

    return ( 
        <div className="dark:bg-[#191919] p-4 rounded-md">
            <div className="flex items-center w-full gap-x-4">
                <div className="w-2/12 ">
                    <div className="text-sm font-medium">
                    Gemeldet von
                    </div>
                    <div className="text-xs font-semibold w-full break-all line-clamp-1 ">
                    {thisReport[0].user ? (
                        thisReport[0].user.name
                    ) : (
                        "Nicht angemeldet"
                    )}
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="text-sm font-medium">
                        Grund
                    </div>
                    <div className="text-xs font-semibold  text-rose-600">
                        {thisReport[0].reportType}
                    </div>
                </div>
                
                
                <div className="w-2/12  ml-auto justify-end ">
                    <div className="w-full ml-auto flex justify-end">
                    <Button className="bg-emerald-800 hover:bg-emerald-900 hover:text-gray-300">
                        <CheckIcon className="w-4 h-4 text-gray-200" />
                    </Button>
                    <Button className="bg-rose-800 hover:bg-rose-900 hover:text-gray-300">
                        <X className="w-4 h-4 text-gray-200" />
                    </Button>
                    
                    </div>
                </div>
            </div>
            <div className="flex items-center mt-4 gap-x-4">
               
            <a className="text-sm hover:underline w-2/12 break-all line-clamp-1" href={`/inserat/${thisReport[0]?.inseratId}`} target="_blank">
                    
                    <div className=" font-semibold dark:text-gray-200">
                    {thisReport[0].inserat.title}
                    </div>
                </a>
                
                <a className="text-sm hover:underline w-4/12 break-all line-clamp-1" href={`/inserat/${thisReport[0].inserat.user.id}`} target="_blank">
                        
                    <div className="w-full flex font-semibold dark:text-gray-200  break-all line-clamp-1">
                    <UserIcon className="w-4 h-4 mr-2 " /><div className="w-full break-all line-clamp-1">
                    {thisReport[0].inserat.user.name}
                    </div>
                    </div>
                </a>
                <div className="w-2/12  ml-auto justify-end ">
                    <div className="w-full ml-auto flex justify-end">
                    <Button className="dark:bg-[#1C1C1C] text-xs dark:text-gray-200 dark:hover:bg-[#1D1D1D] hover:text-gray-300">
                        Weitere Informationen
                    </Button>
                    
                    
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default InseratRenderReport;