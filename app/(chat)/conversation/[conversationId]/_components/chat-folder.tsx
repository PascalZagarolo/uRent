import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const ChatFolder = () => {
    
    const createdFolder = [
        {
            title : "Wichtig",
            color : "blue",
            icon : "star"
        },
        {
            title : "gute Kunden",
            color : "red",
            icon : "thumbs-up"
        },
    ]
    
    const renderedFolder = (
        title,
        color, 
        icon
    ) => {
        return (
            <div className={`${colorResponse(color)} p-1 rounded-md px-2 mt-2`}>
                <div className="text-xs text-gray-200">
                    {title}
                </div>
            </div>
        )
    }

    const colorResponse = (color : string) => {
        switch (color) {
            case "blue":
                return "bg-blue-800";
            case "red":
                return "bg-red-800";
        }
    }

    return ( 
        <div className="">
    <div className="flex flex-row flex-wrap items-center  gap-x-2 ">
        {/** 
         * {createdFolder.map((folder) => (
            renderedFolder(folder.title, folder.color, folder.icon)
        ))}
         */}
       
            <button className="bg-[#191919]
             hover:bg-[#292929] hover:text-gray-200/60 p-1 px-4 rounded-md border border-dashed border-[#252525] 
             flex flex-row items-center gap-x-2 mt-2">
                <PlusIcon className="w-2 h-2" />
                <div className="text-xs">
                    Neuer Ordner
                </div>
            </button>
        
    </div>
</div>
     );
}
 
export default ChatFolder;