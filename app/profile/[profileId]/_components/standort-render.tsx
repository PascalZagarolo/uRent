'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon, MapPinIcon, MapPinOffIcon, PlusSquareIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiLandscape } from "react-icons/bi";

interface StandortRenderProps {
    ownProfile: boolean
}

const StandortRender: React.FC<StandortRenderProps> = ({
    ownProfile
}) => {

    const [currentLocation, setCurrentLocation] = useState("");
    const [value, setValue] = useState("");

    

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    

    return (
        <Dialog>
            <div>
                <div className="dark:bg-[#191919] p-4">
                    <h1 className="text-md font-semibold flex items-center">
                        <BiLandscape className="w-4 h-4 mr-2" />  Standort
                        {ownProfile && (
                            <div className="ml-auto">
                                <DialogTrigger asChild>
                                    <Button className="text-xs hover:underline" variant="ghost" size="sm">
                                        <PlusSquareIcon className="w-4 h-4 mr-2" />   Standort hinzufügen
                                    </Button>
                                </DialogTrigger>
                            </div>
                        )}
                    </h1>
                </div>
                <div className="dark:bg-[#191919]  rounded-t-md ">
                    <div className="gap-4 flex p-4 mt-4">
                        <MapPinIcon className="h-4 w-4" />
                        <div className="text-sm font-semibold">
                            Mittestraße 12, 42659 Solingen, Deutschland
                        </div>
                    </div>
                    <div className="w-full h-[100px] px-2 pb-2">
                        <Image
                            alt="map"
                            src="/example.jpg"
                            width={500}
                            height={300}
                            className="w-full object-cover h-[100px]"
                        />
                    </div>
                </div>
            </div>
            <DialogContent className="dark:bg-[#191919] dark:border-none">
                <div>
                    <h1 className="font-semibold">
                        Standort hinzufügen
                    </h1>
                    <div className="mt-4">
                        <div>
                            <Label className="flex gap-x-2">
                              <ImageIcon className="w-4 h-4" />  Foto
                            </Label>
                            <p className="text-xs dark:text-gray-200/70">
                                Lade, falls gewünscht ein Bild von deinem Standort hoch
                            </p>
                            <div className="p-16 mt-2 dark:bg-[#1C1C1C] border border-dashed
                             dark:text-gray-200/90 items-center text-xs flex w-full justify-center">
                                
                                Bild hochladen..
                                
                            </div>
                        </div>

                        <div className="mt-4">
                            <Label className="font-semibold text-sm flex gap-x-2 items-center">
                               <MapPinIcon className="w-4 h-4" /> Addresse
                            </Label>
                            <div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default StandortRender;