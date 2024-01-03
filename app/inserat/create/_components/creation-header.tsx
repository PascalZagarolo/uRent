import { db } from "@/app/utils/db";
import { cn } from "@/lib/utils";
import { Inserat } from "@prisma/client";

interface CreationHeaderProps {
    inserat : Inserat;
}

const CreationHeader: React.FC<CreationHeaderProps> = async ({
    inserat
}) => {
    
    const images = await db.image.findMany({
        where :{
            inseratId : inserat.id
        }
    })

    const isPublishable = (inserat.title && inserat.description && inserat.price && inserat.category && images.length > 0) ? true : false;

    return ( 
        <div>
            <h3 className="text-3xl font-semibold"> Anzeige bearbeiten </h3>
            { inserat.isPublished ? (
                <p className=" flex justify-center text-base outline outline-offset-2 outline-2 mt-2 font-bold rounded-md">  veröffentlicht </p>
            ) : (
                <p className=" flex justify-center text-base outline outline-offset-2 outline-2 mt-2 font-bold rounded-md"> noch nicht veröffentlicht </p>
            )}
            <p className={cn("text-xs text-gray-800/50 flex justify-center mt-2 font-semibold", isPublishable ? "text-emerald-600" : "text-rose-600")}>
                {isPublishable ? ("zur veröffentlichung bereit") : ("noch nicht zur veröffentlichung bereit")}
            </p>
        </div>
     );
}
 
export default CreationHeader;