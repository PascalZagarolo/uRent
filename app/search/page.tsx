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
import TimespanSearchRender from "./_components/timespan-search-render";
import ResetFields from "./_components/reset-fields";
import BackToHome from "./_components/back-to-home";
import DynamicSearchRender from "./_components/dynamic-search-render";

const SearchPage = async () => {
    const currentUser = await getCurrentUser();

    const foundNotifications = await db.query.notification.findMany({
        where : (
            eq(notification.userId, currentUser?.id)
        )
    })

    return (
        <div className="bg-[#12121a] min-h-screen">
            <div className="relative top-0 w-full z-50 border-b border-indigo-800/20 bg-[#16161f]/95 backdrop-blur-sm">
                <HeaderLogo
                    currentUser={currentUser}
                    foundNotifications={foundNotifications}
                />
                <div className="sm:hidden">
                    <MobileHeader
                        currentUser={currentUser}
                        foundNotifications={foundNotifications}
                    />
                </div>
            </div>
            
            <div className="max-w-[1044px] mx-auto py-8 px-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <BackToHome />
                    </div>
                    <ResetFields />
                </div>
                
                <div className="bg-gradient-to-b from-[#16161f] to-[#1a1a24] rounded-xl overflow-hidden shadow-xl border border-indigo-900/30">
                    <div className="px-6 py-5 border-b border-indigo-950/30 bg-indigo-900/10">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                                <span className="bg-indigo-600/20 p-1.5 rounded-md">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-indigo-400" />
                                </span>
                                <span>Detail-Suche</span>
                            </h1>
                            <ResultsSearchPage />
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <div className="space-y-8">
                            <div className="p-5">
                                <BaseDataSearch />
                            </div>
                            
                            <div className="border-t border-indigo-900/20 pt-8 p-5">
                                <TimespanSearchRender />
                            </div>
                            
                            <div className="border-t border-indigo-900/20 pt-8 p-5">
                                <DynamicSearchRender />
                            </div>
                            
                            <div className="border-t border-indigo-900/20 pt-8 p-5">
                                <ConditionsSearch />
                            </div>
                            
                            <div className="border-t border-indigo-900/20 pt-8 p-5">
                                <CategorySearch />
                            </div>
                            
                            <div className="border-t border-indigo-900/20 pt-8 p-5">
                                <CategorySearchRender />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
