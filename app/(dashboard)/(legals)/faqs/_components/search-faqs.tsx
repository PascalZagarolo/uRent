'use client'

import { Input } from "@/components/ui/input";
import { useState } from "react";

const SearchFaqs = () => {

    const [title, setTitle] = useState("");

    return ( 
        <div>
            <div>
                Nach Hilfe suchen
            </div>
            <Input 
            className="bg-[#191919] border-none"
            placeholder="Ich brauche Hilfe bei.."
            />
        </div>
     );
}
 
export default SearchFaqs;