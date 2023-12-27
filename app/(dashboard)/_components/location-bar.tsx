'use client'

import { Input } from "@/components/ui/input";
import { Map } from "lucide-react";
import LocationPerimeter from "./location-perimeter";

const LocationBar = () => {
    return (
        <div className="ml-16 flex items-center justify-start position: static">
            <Input
                placeholder="Ich komme aus..."
                className="mt-2"
            />

            <Map
                className="mt-2 ml-2 h-10 w-10 text-white flex items-center"
            />

            <LocationPerimeter/>
        </div>
    );
}

export default LocationBar;