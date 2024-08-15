import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger  } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { CarFrontIcon, CheckIcon, PlusIcon, StarIcon, TruckIcon } from "lucide-react";

import { useState } from "react";
import { CheckmarkIcon } from "react-hot-toast";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";

const ChatFolder = () => {

    const createdFolder = [
        {
            title: "Wichtig",
            color: "blue",
            icon: "star"
        },
        {
            title: "gute Kunden",
            color: "red",
            icon: "thumbs-up"
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

    const colorResponse = (color: string) => {
        switch (color) {
            case "blue":
                return "bg-blue-800";
            case "red":
                return "bg-red-800";
        }
    }

    const selectableColors = [
        {
            key : "blue",
            value : "bg-blue-800"
        },
        {
            red : "red",
            value : "bg-red-800"
        },
        {
            key : "green",
            value : "bg-green-800"
        },
        {
            key : "yellow",
            value : "bg-yellow-800"
        },
        {
            key : "indigo",
            value : "bg-indigo-800"
        },
        {
            key : "white",
            value : "bg-white"
        },
        {
            key : "black",
            value : "bg-black"
        }
    ]

    const selectableIcons = [
        {
            key : "star",
            value : <StarIcon className="w-6 h-6" />
        },
        {
            key : "car",
            value : <CarFrontIcon className="w-6 h-6" />
        },
        {
            key : "truck",
            value : <TruckIcon className="w-6 h-6" />
        },
        {
            key : "trailer",
            value : <RiCaravanLine className="w-6 h-6" />
        },
        {
            key : "transport",
            value : <PiVanFill className="w-6 h-6" />
        }
    ]


    const [currentTitle, setCurrentTitle] = useState("");
    const [currentColor, setCurrentColor] = useState<string>(null)
    const [currentIcon, setCurrentIcon] = useState<string>(null);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="">
            <div className="flex flex-row flex-wrap items-center  gap-x-2 ">
                {/** 
         * {createdFolder.map((folder) => (
            renderedFolder(folder.title, folder.color, folder.icon)
        ))}
         */}

                <Dialog>
                    <DialogTrigger asChild>
                        <button className="bg-[#191919]
             hover:bg-[#292929] hover:text-gray-200/60 p-1 px-4 rounded-md border border-dashed border-[#252525] 
             flex flex-row items-center gap-x-2 mt-2">
                            <PlusIcon className="w-2 h-2" />
                            <div className="text-xs">
                                Neuer Ordner
                            </div>
                        </button>
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
                                        <div className="flex flex-row flex-wrap justify-between mt-2">
                                            {
                                                selectableColors.map((color) => (
                                                    <div 
                                                    key={color.key}
                                                    className={`${color.value}  p-4 rounded-md cursor-pointer`} 
                                                    onClick={() => {setCurrentColor(color.key)}}
                                                    >
                                                        {
                                                            currentColor === color.key ? (
                                                                currentColor === "white" ?  (
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
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Label className="text-sm font-semibold">
                                            Icon
                                        </Label>
                                        <div className="mt-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button className={
                                                        cn("w-full bg-[#131313] hover:bg-[#171717]", 
                                                        currentIcon ? "text-gray-200" : "text-gray-200/60 hover:text-gray-200/80")
                                                    }>
                                                        Icon auswählen..
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
                                                                    variant="ghost" 
                                                                    className="bg-[#191919] text-gray-200 flex justify-center p-2 rounded-md">
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
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
}

export default ChatFolder;