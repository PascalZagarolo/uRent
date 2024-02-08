

import { getUserByName } from "@/actions/getUserForBooking";
import { Input } from "@/components/ui/input";
import { UserCheck } from "lucide-react";
import { useState } from "react";

const SearchRent =  () => {

    const [currentValue, setCurrentValue] = useState<string>("");

    const onChange = (value) => {
        setCurrentValue(value);
        fetchData(value);
    }

    const fetchData = async (value) => {
        await getUserByName(value).then((data) => {
            console.log(data)
        })
        
    }

    return (  
        <div>
            <p className="flex"> <UserCheck className="w-4 h-4 mr-2"/> Mieter </p>
            <div className="w-full flex">
                <Input
                className="border border-gray-400 bg-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mt-2"
                onChange={(e) => {onChange(e.target.value)}}
                />
            </div>
            {currentValue}
        </div>
    );
}
 
export default SearchRent;