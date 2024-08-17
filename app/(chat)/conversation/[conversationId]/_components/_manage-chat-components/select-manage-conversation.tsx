import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { conversationFolder } from "@/db/schema";
import { cn } from "@/lib/utils";
import { CarFrontIcon, ChevronDownIcon, PencilLineIcon, PlusIcon, StarIcon, TruckIcon } from "lucide-react";
import { useState } from "react";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";

interface SelectMangeConversationProps {
    thisFolder : typeof conversationFolder.$inferSelect;
}

const SelectManageConversation : React.FC<SelectMangeConversationProps> = ({
    thisFolder
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
            value: <StarIcon className="w-4 h-4" />
        },
        {
            key: "car",
            value: <CarFrontIcon className="w-4 h-4" />
        },
        {
            key: "truck",
            value: <TruckIcon className="w-4 h-4" />
        },
        {
            key: "trailer",
            value: <RiCaravanLine className="w-4 h-4" />
        },
        {
            key: "transport",
            value: <PiVanFill className="w-4 h-4" />
        }
    ]

    function getIconByKey(key) {
        const iconObject = selectableIcons.find(icon => icon.key === key);
        return iconObject ? iconObject.value : null;
    }


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
                <Button 
                variant="ghost"
                className={`
                    ${colorResponse(thisFolder.color)}
                    text-gray-200 font-semibold justify-start hover:text-gray-200/60
                `}>
                    <div className="mr-2">
                    {getIconByKey(thisFolder.icon)}
                    </div>
                    {thisFolder.title}
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#191919]">
                        <div className="w-full h-full">
                            <div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-200 flex items-center flex-row gap-x-2">
                                        <PlusIcon className="w-4 h-4" /> Neuen Ordner erstellen
                                    </h3>
                                    <p className="text-xs dark:text-gray-200/60">
                                        Erstelle einen neuen Ordner um deine Chats zu organisieren und Konversationen zu verschieben.
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <div>
                                        <Label className="text-sm font-semibold">
                                            Titel
                                        </Label>
                                        <div>
                                            <Input
                                                className="dark:bg-[#131313] dark:border-none"
                                                value={currentTitle}
                                                onChange={(e) => setCurrentTitle(e.target.value)}
                                                placeholder="Ordnername.."
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <Label className="text-sm font-semibold">
                                            Farbe
                                        </Label>
                                        <div className="flex flex-row flex-wrap justify-between">
                                            {
                                                selectableColors.map((color) => (
                                                    <div className="bg-[#131313] p-1 rounded-md"
                                                    key={color.key}
                                                    >
                                                        <div
                                                            key={color.key}
                                                            className={`${color.value}  p-3 rounded-md cursor-pointer`}
                                                            onClick={() => { setCurrentColor(color.key) }}
                                                        >
                                                            {
                                                                currentColor === color.key ? (
                                                                    currentColor === "white" ? (
                                                                        <div
                                                                            className="w-4 h-4 bg-gray-600/60 rounded-full flex items-center justify-center"
                                                                        />
                                                                    ) : (
                                                                        <div
                                                                            className="w-4 h-4 bg-gray-200/60 rounded-full flex items-center justify-center"
                                                                        />
                                                                    )

                                                                ) : (
                                                                    <div
                                                                        className={`${color.value} w-4 h-4  rounded-full flex items-center justify-center`}
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Label className="text-sm font-semibold">
                                            Icon

                                        </Label>
                                        <div className="">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button className={
                                                        cn("w-full bg-[#131313] hover:bg-[#171717]",
                                                            currentIcon ? "text-gray-200" : "text-gray-200/60 hover:text-gray-200/80")
                                                    }>
                                                        {
                                                            currentIcon ? (
                                                                selectableIcons.find((icon) => icon.key === currentIcon).value
                                                            ) : (
                                                                "Icon auswählen.."
                                                            )
                                                        }
                                                        <div className="ml-auto">
                                                            <ChevronDownIcon className="w-4 h-4" />
                                                        </div>
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="dark:border-none dark:bg-[#131313]"
                                                    side="top"
                                                >
                                                    <div>
                                                        <div className="grid grid-cols-5 grid-flow-dense gap-x-2">
                                                            {
                                                                selectableIcons.map((icon) => (

                                                                    <Button
                                                                        key={icon.key}
                                                                        onClick=
                                                                        {() => {
                                                                            currentIcon === icon.key ? setCurrentIcon(null) : setCurrentIcon(icon.key)
                                                                        }}

                                                                        variant="ghost"

                                                                        className={cn("bg-[#191919] text-gray-200 flex justify-center p-2 rounded-md",
                                                                            currentIcon === icon.key ? "border border-indigo-800" : "hover:bg-[#1C1C1C]")}

                                                                    >
                                                                        {icon.value}
                                                                    </Button>

                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <DialogTrigger asChild>
                                            <Button
                                                className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-400"
                                                onClick={onSubmit}
                                                disabled={isLoading || !currentTitle || !currentColor}
                                            >
                                                Ordner hinzufügen

                                            </Button>
                                        </DialogTrigger>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent><DialogContent className="dark:border-none dark:bg-[#191919]">
                        <div className="w-full h-full">
                            <div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-200 flex items-center flex-row gap-x-2">
                                        <PlusIcon className="w-4 h-4" /> Neuen Ordner erstellen
                                    </h3>
                                    <p className="text-xs dark:text-gray-200/60">
                                        Erstelle einen neuen Ordner um deine Chats zu organisieren und Konversationen zu verschieben.
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <div>
                                        <Label className="text-sm font-semibold">
                                            Titel
                                        </Label>
                                        <div>
                                            <Input
                                                className="dark:bg-[#131313] dark:border-none"
                                                value={currentTitle}
                                                onChange={(e) => setCurrentTitle(e.target.value)}
                                                placeholder="Ordnername.."
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <Label className="text-sm font-semibold">
                                            Farbe
                                        </Label>
                                        <div className="flex flex-row flex-wrap justify-between">
                                            {
                                                selectableColors.map((color) => (
                                                    <div className="bg-[#131313] p-1 rounded-md"
                                                    key={color.key}
                                                    >
                                                        <div
                                                            key={color.key}
                                                            className={`${color.value}  p-3 rounded-md cursor-pointer`}
                                                            onClick={() => { setCurrentColor(color.key) }}
                                                        >
                                                            {
                                                                currentColor === color.key ? (
                                                                    currentColor === "white" ? (
                                                                        <div
                                                                            className="w-4 h-4 bg-gray-600/60 rounded-full flex items-center justify-center"
                                                                        />
                                                                    ) : (
                                                                        <div
                                                                            className="w-4 h-4 bg-gray-200/60 rounded-full flex items-center justify-center"
                                                                        />
                                                                    )

                                                                ) : (
                                                                    <div
                                                                        className={`${color.value} w-4 h-4  rounded-full flex items-center justify-center`}
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Label className="text-sm font-semibold">
                                            Icon

                                        </Label>
                                        <div className="">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button className={
                                                        cn("w-full bg-[#131313] hover:bg-[#171717]",
                                                            currentIcon ? "text-gray-200" : "text-gray-200/60 hover:text-gray-200/80")
                                                    }>
                                                        {
                                                            currentIcon ? (
                                                                selectableIcons.find((icon) => icon.key === currentIcon).value
                                                            ) : (
                                                                "Icon auswählen.."
                                                            )
                                                        }
                                                        <div className="ml-auto">
                                                            <ChevronDownIcon className="w-4 h-4" />
                                                        </div>
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="dark:border-none dark:bg-[#131313]"
                                                    side="top"
                                                >
                                                    <div>
                                                        <div className="grid grid-cols-5 grid-flow-dense gap-x-2">
                                                            {
                                                                selectableIcons.map((icon) => (

                                                                    <Button
                                                                        key={icon.key}
                                                                        onClick=
                                                                        {() => {
                                                                            currentIcon === icon.key ? setCurrentIcon(null) : setCurrentIcon(icon.key)
                                                                        }}

                                                                        variant="ghost"

                                                                        className={cn("bg-[#191919] text-gray-200 flex justify-center p-2 rounded-md",
                                                                            currentIcon === icon.key ? "border border-indigo-800" : "hover:bg-[#1C1C1C]")}

                                                                    >
                                                                        {icon.value}
                                                                    </Button>

                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <DialogTrigger asChild>
                                            <Button
                                                className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-400"
                                                onClick={onSubmit}
                                                disabled={isLoading || !currentTitle || !currentColor}
                                            >
                                                Ordner hinzufügen

                                            </Button>
                                        </DialogTrigger>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
        </Dialog>
    );
}

export default SelectManageConversation;