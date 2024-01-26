import { Milestone, Signal } from "lucide-react";
import OwnContent from "./own-content";

import { Inserat, Images } from "@prisma/client";

interface RightSideProfileProps {
    inserate : Inserat[] & { images : Images[] }[]
}

const RightSideProfile: React.FC<RightSideProfileProps> = ({
    inserate
}) => {
    return ( 
        <div className="">
            <h3 className=" flex justify-center p-4 text-3xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] items-center">
               <Milestone className="mr-2"/> Meine Inhalte
            </h3>
            <div className="flex justify-center">
                <OwnContent
                inserate={inserate}
                />
            </div>
        </div>
     );
}
 
export default RightSideProfile;