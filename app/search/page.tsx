import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";

import { TruckIcon } from "lucide-react";
import HeaderLogo from "../(dashboard)/_components/header-logo";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import CategorySearch from "./_components/category-search";

const Imprint = async () => {

    const currentUser = await getCurrentUser();

    const notifications = await db.notification.findMany({
        where: {
            userId: currentUser?.id
        }
    })

    return (
        <div className="bg-[#404040]/10 dark:bg-[#0F0F0F]">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    notifications={notifications} />
            </div>
            <div className="flex justify-center p-8 bg-[#404040]/10">
                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">


                        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                <MagnifyingGlassIcon className="mr-4 h-6 w-6" /> Erweiterte Detail-Suche
                            </h3>
                        </div>



                        <div className="p-8 text-sm dark:text-gray-300/90">
                            <CategorySearch />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Imprint;