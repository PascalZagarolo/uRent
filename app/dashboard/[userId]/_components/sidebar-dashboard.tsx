'use client'


import { Button } from "@/components/ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";

const SidebarDashboard = () => {

    const router = useRouter();

    const pathname = usePathname();

    const params = useParams();


    const baseUrl = "/dashboard/" + params.userId;

    return ( 
        <div className=" dark:bg-[#1C1C1C] rounded-md w-[240px]">
                <div className="p-4">
                    <h3 className="text-lg font-semibold">
                        Dashboard
                    </h3>
                </div>
                <div className="mt-4 p-2">
                    <Button className="bg-[#141414] hover:bg-[#151515] w-full  dark:text-gray-100 flex" onClick={() => {router.push(baseUrl + "/inserate")}}>
                        Meine Inhalte
                    </Button>
                    <Button className="bg-[#141414] hover:bg-[#151515] w-full  dark:text-gray-100 flex mt-2" onClick={() => {router.push(baseUrl + "/bookings")}}>
                        Favouriten & Buchungen
                    </Button>
                </div>
            </div>
     );
}
 
export default SidebarDashboard;