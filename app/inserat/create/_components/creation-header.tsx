import { Inserat } from "@prisma/client";

interface CreationHeaderProps {
    inserat : Inserat;
}

const CreationHeader: React.FC<CreationHeaderProps> = ({
    inserat
}) => {
    return ( 
        <div>
            <h3 className="text-3xl font-semibold"> Anzeige bearbeiten </h3>
            { inserat.isPublished ? (
                <p className=" flex justify-center text-base outline outline-offset-2 outline-2 mt-2 font-bold rounded-md">  veröffentlicht </p>
            ) : (
                <p className=" flex justify-center text-base outline outline-offset-2 outline-2 mt-2 font-bold rounded-md"> noch nicht veröffentlicht </p>
            )}
            
        </div>
     );
}
 
export default CreationHeader;