import ToggleDarkMode from "../(routes)/view/_components/toggle-dark-mode";
import { Eye } from "lucide-react";

const ViewTab = () => {
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-4">
                    <Eye className="w-5 h-5 mr-2" />
                    Ansicht / Design
                </h2>
                
                <div className="bg-white dark:bg-[#252525] rounded-lg shadow-sm p-6">
                    <div className="max-w-xl">
                        <ToggleDarkMode />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewTab;