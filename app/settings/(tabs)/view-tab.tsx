

import ToggleDarkMode from "../(routes)/view/_components/toggle-dark-mode";
import { User2Icon } from "lucide-react";

const ViewTab = () => {

    return (



        <div>
            <div className="p-4 mt-4  rounded-lg ">
                <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                    <User2Icon className="mr-4" /> Ansicht / Design  <p className="ml-4 text-lg"> </p>
                    <div className="ml-auto">

                    </div>
                </h3>
                <div className="w-full p-4 mt-2 rounded-md">

                    <div>
                        <ToggleDarkMode />
                    </div>

                </div>
            </div>
            <div className="p-4 mt-4  rounded-lg ">

                <div className="w-full p-4 mt-2 rounded-md">

{/* 
                <div>
                        <Notificationpreferences />
                    </div> */}

                </div>
                <div>

                </div>
            </div>
        </div>



    );
}

export default ViewTab;