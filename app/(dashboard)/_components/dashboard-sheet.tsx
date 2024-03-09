'use client'

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CircuitBoard, TrendingUpIcon, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface DashboardSheetProps {
    currentUserId : string;
}

const DashboardSheet: React.FC<DashboardSheetProps> = ({
    currentUserId
}) => {

    
    const router = useRouter();
    const pathname = usePathname();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/dashboard/" + currentUserId;

    return ( 
        <Sheet>
            <SheetTrigger className="flex items-center sm:bg-[#1C1E2C] p-2 rounded-md">
                <TrendingUpIcon className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent className="dark:bg-[#141414]" side="left">
            <div className="p-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <CircuitBoard className="w-4 h-4 mr-2"/>  Dashboard
                    </h3>
                </div>
                <div className="p-2">
                    <Button className="dark:bg-[#1C1C1C]  hover:bg-[#191919] w-full  dark:text-gray-100 flex " onClick={() => {router.push(baseUrl)}}>
                       <X className={cn("w-4 h-4 mr-2 text-blue-800 hidden", (!pathname.includes("bookings") && !pathname.includes("inserate")) && "block")} /> Übersicht
                    </Button>
                    <Button className="dark:bg-[#1C1C1C] hover:bg-[#191919] w-full  dark:text-gray-100 flex mt-2" onClick={() => {router.push(baseUrl + "/inserate")}}>
                    <X className={cn("w-4 h-4 mr-2 text-blue-800 hidden", (pathname.includes("inserate")) && "block" )} />  Meine Inhalte
                    </Button>
                    <Button className="dark:bg-[#1C1C1C] hover:bg-[#191919] w-full truncate dark:text-gray-100 flex mt-2" onClick={() => {router.push(baseUrl + "/bookings")}}>
                    <X className={cn("w-4 h-4 mr-2 text-blue-800 hidden", (pathname.includes("bookings")) && "block" )} />   Favouriten & <br/> Buchungen 
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
     );
}
 
export default DashboardSheet;