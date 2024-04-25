'use client'

import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { BrushIcon, Calendar } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";



const ToggleDarkMode = () => {

    const { theme, setTheme } = useTheme()

    const darkChecked = theme === "dark";

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    },[])
    
    if(!isMounted){
        return null
    }

    

    return (
        <div>
            <h3 className="font-semibold flex items-center">
              <BrushIcon className="w-4 h-4 mr-2" />  Themes
            </h3>
            <div className="sm:flex space-x-4 mt-2 justify-between">
            {/*
            
            <div className={cn("w-1/4 rounded-md", theme === "light" && "")} onClick={() => { setTheme("light") }}>
                    <div>
                        <div className="bg-gray-300 p-2 space-y-2 hover:cursor-pointer rounded-t-md">
                            <div className="bg-gray-200 rounded-md p-4 space-y-1">
                                <Skeleton className="w-1/2 h-[12px] bg-gray-400" />
                                <Skeleton className="w-2/3 h-[12px] bg-gray-400" />
                            </div>
                            <div className="bg-gray-200 rounded-md p-2 space-y-1 flex item-center gap-x-2">
                                <Skeleton className="w-4 h-4 rounded-full bg-gray-400" />
                                <Skeleton className="w-1/3 h-[12px] bg-gray-400" />
                            </div>
                        </div>
                        <Label className="flex justify-center p-2 bg-gray-300 text-gray-800">
                            Whitemode
                        </Label>
                    </div>
                    <div className="flex justify-center mt-2">
                    <Checkbox onCheckedChange={(e) => {setTheme("light")}}
                    checked={theme === "light"}
                    />
                    </div>

                    
                </div>

            */ }

<div className={cn("sm:w-1/4 w-full rounded-md", theme === "dark" && "")}>
                    <div>
                    <div className="bg-[#121212] p-2 space-y-2 hover:cursor-pointer rounded-t-md" onClick={() => { setTheme("dark") }}>
                        <div className="bg-[#191919] rounded-md p-4 space-y-1">
                            <Skeleton className="w-1/2 h-[12px] bg-[#222222]" />
                            <Skeleton className="w-2/3 h-[12px] bg-[#222222]" />
                        </div>
                        <div className="bg-[#191919] rounded-md p-2 space-y-1 flex item-center gap-x-2">
                            <Skeleton className="w-4 h-4 rounded-full bg-[#222222]" />
                            <Skeleton className="w-1/3 h-[12px] bg-[#222222]" />
                        </div>
                    </div>
                    <Label className="flex justify-center p-2 bg-[#121212]  text-gray-200">
                        Darkmode
                    </Label>

                </div>
                <div className="flex justify-center mt-2">
                <div>
                <Checkbox onCheckedChange={(e) => {setTheme("dark")}}
                    checked={darkChecked}
                    /> <Label></Label>
                </div>
                    </div>
                    </div>


            </div>
        </div>
    );
}

export default ToggleDarkMode;