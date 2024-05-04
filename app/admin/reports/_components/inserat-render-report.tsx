'use client'

import { report } from "@/db/schema";

import { CheckIcon, UserIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FullInseratDialog from "./full-inserat-dialog";


interface InseratRenderReportProps {
    thisReport : typeof report.$inferSelect 
}


const InseratRenderReport : React.FC<InseratRenderReportProps> = ({
    thisReport
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);


   const onDelete = async () => {
    try {
        setIsLoading(true);
        await axios.delete(`/api/report/delete/${thisReport.id}`)
            .then(() => {
                toast.success("Report erfolgreich gelöscht")
                router.refresh();
            })

    } catch(error : any) {
        console.log(error);
        toast.error("Fehler beim löschen des Reports")
    } finally {
        setIsLoading(false);
    }
   }

    return ( 
        <div className="dark:bg-[#191919] p-4 rounded-md">
            <div className="flex items-center w-full gap-x-4">
                <div className="w-2/12 ">
                    <div className="text-sm font-medium">
                    Gemeldet von
                    </div>
                    <div className="text-xs font-semibold w-full break-all line-clamp-1 ">
                    {//@ts-ignore
                    thisReport?.user ? (
                        //@ts-ignore
                        thisReport?.user?.name
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
                        {thisReport.reportType}
                    </div>
                </div>
                
                
                <div className="w-2/12  ml-auto justify-end ">
                    <div className="w-full ml-auto flex justify-end">
                    <Button className="bg-emerald-800 hover:bg-emerald-900 hover:text-gray-300">
                        <CheckIcon className="w-4 h-4 text-gray-200" />
                    </Button>
                    <Button className="bg-rose-800 hover:bg-rose-900 hover:text-gray-300" onClick={onDelete}>
                        <X className="w-4 h-4 text-gray-200" />
                    </Button>
                    
                    </div>
                </div>
            </div>
            <div className="flex items-center mt-4 gap-x-4">
               
            <a className="text-sm hover:underline w-2/12 break-all line-clamp-1" href={`/inserat/${thisReport?.inseratId}`} target="_blank">
                    
                    <div className=" font-semibold dark:text-gray-200">
                    {//@ts-ignore
                    thisReport?.inserat?.title}
                    </div>
                </a>
                
                <a className="text-sm hover:underline w-4/12 break-all line-clamp-1" href={`/inserat/${//@ts-ignore
                    thisReport?.inserat?.user?.id}`} target="_blank">
                        
                    <div className="w-full flex font-semibold dark:text-gray-200  break-all line-clamp-1">
                    <UserIcon className="w-4 h-4 mr-2 " /><div className="w-full break-all line-clamp-1">
                    {//@ts-ignore
                    thisReport?.inserat?.user.name}
                    </div>
                    </div>
                </a>
                <div className="w-2/12  ml-auto justify-end ">
                    <div className="w-full ml-auto flex justify-end">
                    <FullInseratDialog 
                    thisReport = {thisReport}
                    />
                    
                    
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default InseratRenderReport;