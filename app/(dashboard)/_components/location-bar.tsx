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

            <Map
                className="mt-2 ml-2 h-6 w-6 text-white flex items-center"
            />

            
        </div>
    );
}

export default LocationBar;