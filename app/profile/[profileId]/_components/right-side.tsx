import { Milestone, Signal } from "lucide-react";
import OwnContent from "./own-content";

import { Inserat, Images } from "@prisma/client";
import Rezensionen from "./rezensionen";
import { Separator } from "@/components/ui/separator";
import AddRezension from "./add-rezension";

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
            <h3 className="flex justify-center font-semibold text-2xl items-center">
               <Separator className="w-1/3 bg-gray-500 mr-8 "/> Rezensionen <Separator className="w-1/3 bg-gray-500 ml-8 "/>
            </h3>
            <div className="flex ml-auto">
                <AddRezension/>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
                <Rezensionen/>
                <Rezensionen/>
                <Rezensionen/>
                <Rezensionen/>
            </div>
        </div>
     );
}
 
export default RightSideProfile;