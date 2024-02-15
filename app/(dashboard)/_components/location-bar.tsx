'use client'

import { Input } from "@/components/ui/input";
import { Map } from "lucide-react";
import LocationPerimeter from "./location-perimeter";

const LocationBar = () => {
    return (
        <div className=" xl:flex items-center justify-start position: static hidden mr-4">
            <Input
                placeholder="Ich komme aus..."
                className="mt-2"
            />
            <div className="bg-[#191d2e] p-2 border-2 border-black mt-2 rounded-md">
            <Map
                className="  h-6 w-6 text-white flex items-center"
            />
            </div>
            

            
        </div>
    );
}

export default LocationBar;