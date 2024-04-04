'use client'

import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { Calendar } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Checkbox } from "@radix-ui/react-checkbox";

const ToggleDarkMode = () => {

    const { theme, setTheme } = useTheme()

    console.log(theme)

    return ( 
        <div>
            <h3 className="font-semibold">
                Themes
            </h3>
            <div className="flex space-x-4">
                <div className={cn("w-1/4 rounded-md", theme === "light" && "border-gray-900 border")} onClick={() => {setTheme("light")}}>
                <div className="bg-gray-300 p-2 space-y-2 hover:cursor-pointer">
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

                <div className={cn("w-1/4 rounded-md", theme === "dark" && "")}>
                <div className="bg-[#121212] p-2 space-y-2 hover:cursor-pointer" onClick={() => {setTheme("dark")}}>
                    <div className="bg-[#191919] rounded-md p-4 space-y-1">
                        <Skeleton className="w-1/2 h-[12px] bg-[#222222]" />
                        <Skeleton className="w-2/3 h-[12px] bg-[#222222]" />
                    </div>
                    <div className="bg-[#191919] rounded-md p-2 space-y-1 flex item-center gap-x-2">
                        <Skeleton className="w-4 h-4 rounded-full bg-[#191919]" />
                        <Skeleton className="w-1/3 h-[12px] bg-[#222222]" />
                    </div>
                </div>
                <Label className="flex justify-center p-2 bg-[#121212]  text-gray-200">
                    Darkmode
                </Label>
                
                </div>


            </div>
        </div>
     );
}
 
export default ToggleDarkMode;