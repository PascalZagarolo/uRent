import { MdOutlineReportProblem } from "react-icons/md";
import BreadCrumpPage from "../_components/bread-crump-page";
import MenuBar from "../_components/menu-bar";
import { LuPanelTopOpen } from "react-icons/lu";
import TestPopups from "./_components/test-popups";

const PopupAdminPage = () => {
    return (
        <div className="flex justify-center sm:py-8  sm:px-4" >
            <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white" >
                <div className="min-h-screen" >
                    <div>
                        <MenuBar />
                        <div>
                            <BreadCrumpPage />
                        </div>
                    </div>
                    <div  className="p-8" >
                        <h3 className="text-md font-semibold flex items-center" >
                            <LuPanelTopOpen  className="text-indigo-600 w-4 h-4 mr-2" /> Popups
                        </h3>
                        <p className="text-gray-200/60 text-xs ">
                            Teste Popups sowie Benachrichtigungsvorschauungen.
                        </p>
                        <div className="mt-4">
                            <TestPopups />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PopupAdminPage;