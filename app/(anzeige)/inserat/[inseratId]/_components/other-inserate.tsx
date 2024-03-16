import { Separator } from "@/components/ui/separator";
import { Images, Inserat, User } from "@prisma/client";
import { IoIosPaper } from "react-icons/io";
import OtherInserateRender from "./other-inserate-render";

interface OtherInserateProps {
    user : User,
    inserate : Inserat[] & {images : Images[]}[];
}


const OtherInserate: React.FC<OtherInserateProps> = ({
    user,
    inserate
}) => {

    

    return ( 
        <div className="sm:w-2/5 xl:min-w-[360px] bg-[#171923] px-4 py-4 rounded-md ">
            <h3 className=" flex gap-x-2 font-medium">
            <IoIosPaper className = "w-4 h-4" />   Weiteres  von <div className="w-3/5 truncate  font-semibold">{user?.name}</div>
                
            </h3>
            <div className="px-2 mt-2">
            <Separator className="w-full bg-[#1D1F2B] h-[0.5px]" />
            </div>
            {inserate.length > 0 ? (
                <div className="px-2 py-2 space-y-4 max-h-[400px] overflow-y-scroll no-scrollbar">
                {inserate.map((inserat) => (
                    <OtherInserateRender 
                    key={inserat.id}
                    //@ts-ignore
                    inserat = {inserat}
                    />
                ))}
                {inserate.map((inserat) => (
                    <OtherInserateRender 
                    key={inserat.id}
                    //@ts-ignore
                    inserat = {inserat}
                    />
                ))}
                {inserate.map((inserat) => (
                    <OtherInserateRender 
                    key={inserat.id}
                    //@ts-ignore
                    inserat = {inserat}
                    />
                ))}
            </div>
            ) : (
                <div className="px-2 max-h-[400px]">
                
                <p className="text-gray-200/80 font-medium text-sm">
                    Noch keine weiteren Inserate vorhanden..
                </p>
                </div>
            )}
        </div>
     );
}
 
export default OtherInserate;