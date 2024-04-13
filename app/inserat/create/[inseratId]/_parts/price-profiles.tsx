'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PlusSquareIcon } from "lucide-react";
import AddPriceProfile from "./price-profiles/add-price-profile";

const PriceProfiles = () => {
    return (
        <div>
            <div className="flex justify-evenly items-center">
                <Separator
                    className="w-1/3 h-[0.5px] dark:bg-gray-100/20"
                />
                <h1 className="flex justify-center text-lg font-semibold">
                    Weitere Preisprofile
                </h1>
                <Separator
                    className="w-1/3 h-[0.5px] dark:bg-gray-100/20"
                />
            </div>
            <AddPriceProfile />
        </div>
    );
}

export default PriceProfiles;