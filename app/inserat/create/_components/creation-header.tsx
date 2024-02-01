import { db } from "@/utils/db";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Inserat } from "@prisma/client";
import PublishInserat from "./publish-inserat";

interface CreationHeaderProps {
    inserat : Inserat;
}

const CreationHeader: React.FC<CreationHeaderProps> = async ({
    inserat
}) => {
    
    const images = await db.images.findMany({
        where : {
            inseratId : inserat.id
        }
    })

    const isPublishable = (inserat.title && inserat.description && inserat.price && inserat.category && inserat.begin && inserat.end && images.length > 0) ? true : false;

    return ( 
        <div className="w-full">
            <div className="">
            <h3 className="text-3xl font-semibold flex justify-center rounded-md border-2 text-gray-200 border-gray-400 p-4 bg-[#1f2332] mr-16 ml-16
            drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)]
            "> Anzeige bearbeiten </h3>
            { inserat.isPublished ? (
                <p className="flex justify-center text-base border-2 border-gray-200 mt-2 font-bold rounded-md ml-32
                 mr-32 p-2 bg-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">  veröffentlicht </p>
            ) : (
                <p className="flex justify-center text-base border-2 border-gray-200 mt-2 font-bold rounded-md ml-32
                mr-32 p-2 bg-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] "> noch nicht veröffentlicht </p>
            )}
            <p className={cn("text-sm  text-gray-800/50 flex justify-center mt-2 font-semibold ", isPublishable ? "text-emerald-600" : "text-rose-600")}>
                {isPublishable ? ("zur veröffentlichung bereit") : ("noch nicht zur veröffentlichung bereit")}
            </p>
            
            </div>
            
            <div className="flex justify-end mr-8 w-full">
                <PublishInserat
                isPublishable={isPublishable}
                inserat={inserat}
                />
            </div>
        </div>
     );
}
 
export default CreationHeader;