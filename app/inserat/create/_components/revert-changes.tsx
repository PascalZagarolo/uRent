import { MdPublishedWithChanges } from "react-icons/md";

interface RevertChangesProps {
    hasChanged: boolean;
    onRevert : () => void;
}

const RevertChanges = ({
    hasChanged,
    onRevert
}) => {

    if(!hasChanged) return null;

    return ( 
        
            <div className="flex flex-row items-center hover:underline py-2 text-gray-200/60 text-xs hover:cursor-pointer w-min"
            onClick={onRevert}
            >
                <MdPublishedWithChanges 
                className="w-4 h-4 mr-2"
                />
                <p className="w-full whitespace-nowrap">
                Änderungen zurücksetzen
                </p>
            </div>
        
     );
}
 
export default RevertChanges;