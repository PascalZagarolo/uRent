import { Separator } from "@/components/ui/separator";

import { IoIosPaper } from "react-icons/io";
import OtherInserateRender from "./other-inserate-render";
import { inserat, userTable } from "@/db/schema";

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
            <h3 className=" flex gap-x-2 font-medium text-gray-200">
                <IoIosPaper className="w-4 h-4" />Weiteres von
                <div className="w-3/5 line-clamp-1 font-semibold">{thisUser?.name}</div>
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

                    <p className="text-gray-200/80 font-medium text-sm mt-2">
                        Noch keine weiteren Inserate vorhanden..
                    </p>
                </div>
            )}
        </div>
    );
}

export default OtherInserate;