import { MdOutlineReportProblem } from "react-icons/md";
import BreadCrumpPage from "../_components/bread-crump-page";
import MenuBar from "../_components/menu-bar";
import { MailIcon } from "lucide-react";
import SearchUser from "./_components/search-user";

const ChangeMailAdminPage = () => {
    return ( 
        <div className="flex justify-center sm:py-8  sm:px-4">
            <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                <div className="min-h-screen">
                    <div>
                        <MenuBar />
                        <div>
                            <BreadCrumpPage />
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-base font-semibold flex items-center">
                            <MailIcon 
                            className="w-4 h-4 mr-4"
                            />
                          Email ändern
                        </h3>
                        <div className="mt-4 space-y-4">
                            <SearchUser />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ChangeMailAdminPage;