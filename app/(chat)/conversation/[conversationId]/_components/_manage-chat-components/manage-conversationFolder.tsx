import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { conversationFolder } from "@/db/schema";
import { cn } from "@/lib/utils";
import { CarFrontIcon, ChevronDownIcon, FolderIcon, PencilLineIcon, PlusIcon, StarIcon, TruckIcon } from "lucide-react";
import { useState } from "react";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";
import SelectManageConversation from "./select-manage-conversation";

interface ManageConversationFolderProps {
    foundFolders : typeof conversationFolder.$inferSelect[];
}

const ManageConversationFolder : React.FC<ManageConversationFolderProps>  = ({
    foundFolders
}) => {

    const colorResponse = (color: string) => {
        switch (color) {
            case "blue":
                return "bg-blue-800";
            case "red":
                return "bg-red-800";
            case "indigo":
                return "bg-indigo-800";
            case "green":
                return "bg-green-800";
            case "yellow":
                return "bg-yellow-800";
            case "white":
                return "bg-white";
            case "black":
                return "bg-black";
        }
    }

    const selectableColors = [
        {
            key: "blue",
            value: "bg-blue-800"
        },
        {
            red: "red",
            value: "bg-red-800"
        },
        {
            key: "green",
            value: "bg-green-800"
        },
        {
            key: "yellow",
            value: "bg-yellow-800"
        },
        {
            key: "indigo",
            value: "bg-indigo-800"
        },
        {
            key: "white",
            value: "bg-white"
        },
        {
            key: "black",
            value: "bg-black"
        }
    ]

    const selectableIcons = [
        {
            key: "star",
            value: <StarIcon className="w-6 h-6" />
        },
        {
            key: "car",
            value: <CarFrontIcon className="w-6 h-6" />
        },
        {
            key: "truck",
            value: <TruckIcon className="w-6 h-6" />
        },
        {
            key: "trailer",
            value: <RiCaravanLine className="w-6 h-6" />
        },
        {
            key: "transport",
            value: <PiVanFill className="w-6 h-6" />
        }
    ]


    const [currentTitle, setCurrentTitle] = useState("");
    const [currentColor, setCurrentColor] = useState<string>(null)
    const [currentIcon, setCurrentIcon] = useState<string>(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        try {

        } catch(e : any) {

        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-[#191919]
             hover:bg-[#292929] hover:text-gray-200/60 p-1 px-4 rounded-md border border-dashed border-[#252525] 
             flex flex-row items-center gap-x-2 mt-2">
                    <PencilLineIcon className="w-2 h-2" />
                    <div className="text-xs">
                        Ordner verwalten
                    </div>
                </button>
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                    <div>
                    <div className="text-lg font-semibold text-gray-200 flex flex-row items-center gap-x-2">
                        <FolderIcon className="w-4 h-4 " />
                        Ordner bearbeiten
                    </div>
                    <p className="text-xs dark:text-gray-200/60">
                        Klicke auf einen Ordner um ihn zu bearbeiten.
                    </p>
                    </div>
                    <div className="mt-4">
                        <div className="flex flex-col space-y-2">
                            {foundFolders.map((folder) => (
                                <SelectManageConversation key={folder.id} thisFolder={folder} />
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ManageConversationFolder;