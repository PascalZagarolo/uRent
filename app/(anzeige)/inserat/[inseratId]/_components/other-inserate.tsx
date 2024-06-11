import { Separator } from "@/components/ui/separator";

import { IoIosPaper } from "react-icons/io";
import OtherInserateRender from "./other-inserate-render";
import { inserat, userTable } from "@/db/schema";
import { UserIcon } from "lucide-react";

interface OtherInserateProps {
    thisUser: typeof userTable.$inferSelect,
    inserateArray: typeof inserat.$inferSelect[];
}


const OtherInserate: React.FC<OtherInserateProps> = ({
    thisUser,
    inserateArray
}) => {



    return (
        <div className="xl:w-3/5 xl:min-w-[360px] bg-[#171923] px-4 py-4 rounded-md ">
            <h3 className=" gap-x-2 font-medium text-gray-200">
                <div className="flex items-center text-medium dark:text-gray-200/90">
                <IoIosPaper className="w-4 h-4 mr-2" /> Weitere Inserate von
                </div>
                <div className="w-full line-clamp-1 flex items-center font-semibold">
                   <div>
                   <UserIcon className="w-4 h-4 mr-2.5" /> 
                   </div>
                   <div className="w-full line-clamp-1">
                   {thisUser?.name}
                   </div>
                   </div>
            </h3>
            <div className="px-2 mt-2">
                <Separator className="w-full bg-[#393c53] h-[0.5px]" />
            </div>
            {inserateArray.length > 0 ? (
                <div className="px-2 py-2 space-y-4 max-h-[400px] overflow-y-scroll no-scrollbar">
                    {inserateArray.map((pInserat) => (
                        <OtherInserateRender
                            key={pInserat.id}
                            thisInserat={pInserat}
                        />
                    ))}
                </div>
            ) : (
                <div className="px-2 max-h-[400px]">

                    <p className="text-gray-200/80 text-xs flex justify-center mt-4">
                        Noch keine weiteren Inserate vorhanden..
                    </p>
                </div>
            )}
        </div>
    );
}

export default OtherInserate;