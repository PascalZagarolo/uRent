'use client'


import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircuitBoard, X } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

const SidebarDashboard = () => {

    const router = useRouter();

    const pathname = usePathname();

    const params = useParams();


    const baseUrl = "/dashboard/" + params.userId;

    return ( 
        <div className=" dark:bg-[#1C1C1C] bg-white rounded-md w-[280px] p-2">
                <div className="p-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <CircuitBoard className="w-4 h-4 mr-2"/>  Dashboard
                    </h3>
                </div>
                <div className="p-2">
                    <Button className="dark:bg-[#141414]  hover:bg-[#191919] w-full  dark:text-gray-100 flex " onClick={() => {router.push(baseUrl)}}>
                       <X className={cn("w-4 h-4 mr-2 text-blue-800 hidden", (!pathname.includes("bookings") && !pathname.includes("inserate")) && "block")} /> Übersicht
                    </Button>
                    <Button className="dark:bg-[#141414] hover:bg-[#191919] w-full  dark:text-gray-100 flex mt-2" onClick={() => {router.push(baseUrl + "/inserate")}}>
                    <X className={cn("w-4 h-4 mr-2 text-blue-800 hidden", (pathname.includes("inserate")) && "block" )} />  Meine Inhalte
                    </Button>
                    <Button className="dark:bg-[#141414] hover:bg-[#191919] w-full  dark:text-gray-100 flex mt-2" onClick={() => {router.push(baseUrl + "/bookings")}}>
                    <X className={cn("w-4 h-4 mr-2 text-blue-800 hidden", (pathname.includes("bookings")) && "block" )} />   Favouriten & Buchungen
                    </Button>
                </div>
            </div>
     );
}
 
export default SidebarDashboard;