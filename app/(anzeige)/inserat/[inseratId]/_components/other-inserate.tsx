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
        <div className="w-full  bg-[#171923] px-4 py-4 rounded-md ">
            <h3 className="flex flex-col gap-1 text-gray-200 font-medium">
                <div className="flex items-center text-sm dark:text-gray-200/90">
                    
                    <span>Weitere Inserate von</span>
                </div>
                <div className="flex items-center font-semibold text-gray-100">
                    
                    <span className="line-clamp-1">{thisUser?.name}</span>
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