

import getCurrentUser from "@/actions/getCurrentUser";



import HeaderLogo from "../(dashboard)/_components/header-logo";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import CategorySearch from "./_components/category-search";
import BaseDataSearch from "./_components/base-data-search";
import ResultsSearchPage from "./_components/results-searchpage";
import ConditionsSearch from "./_components/conditions-search";
import CategorySearchRender from "./_components/category-search-render";
import db from "@/db/drizzle";

import { notification } from "@/db/schema";
import { eq } from "drizzle-orm";
import MobileHeader from "../(dashboard)/_components/mobile-header";

const SearchPage = async () => {

    const currentUser = await getCurrentUser();

    const foundNotifications = await db.query.notification.findMany({
        where : (
            eq(notification.userId, currentUser?.id)
        )
    })
    

    

    return (
        <div className="bg-[#404040]/10 dark:bg-[#0F0F0F]">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    foundNotifications={foundNotifications}
                    />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                    currentUser={currentUser}
                    foundNotifications={foundNotifications}
                />
            </div>
            <div className="flex justify-center p-8 bg-[#404040]/10">
                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">


                        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                <MagnifyingGlassIcon className="mr-4 h-6 w-6" /> Erweiterte Detail-Suche 
                                <div className="ml-auto">
                                <ResultsSearchPage 
                                   
                                   />
                                </div>
                            </h3>
                        </div>
                        <div className="p-8 text-sm dark:text-gray-300/90 space-y-4">
                        <BaseDataSearch />
                        <ConditionsSearch />
                        <CategorySearch />
                        <CategorySearchRender />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default SearchPage;