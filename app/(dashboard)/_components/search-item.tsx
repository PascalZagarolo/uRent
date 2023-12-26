'use client'

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchItem = () => {
    return ( 
        <div className="flex items-center justify-start">
            <Input
                className="mt-2"
                placeholder="Ich suche nach..."
            />
            <Search
            className="mt-2 ml-2 text-white"
            />
        </div>
     );
}
 
export default SearchItem;