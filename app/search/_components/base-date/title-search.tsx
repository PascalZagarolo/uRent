import { useDebounce } from "@/components/multiple-selector";
import { Input } from "@/components/ui/input";
import { useSavedSearchParams } from "@/store";
import { useEffect, useState } from "react";
import { MdOutlineTitle } from "react-icons/md";

const TitleSearch = () => {
    const currentObject = useSavedSearchParams((state) => state.searchParams);
    const [value, setValue] = useState(currentObject["title"] ? currentObject["title"] : "");
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    
    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        if(value) {
            changeSearchParams("title", value);
        } else {
            deleteSearchParams("title");
        }
    }, [debouncedValue]);

    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <MdOutlineTitle className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Titel</h3>
            </div>
            
            <div className="w-full group">
                <Input
                    placeholder="Titel der Anzeige..."
                    className="h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] placeholder:text-gray-500 text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]"
                    onChange={(e) => { setValue(e.target.value) }}
                    value={value}
                    aria-label="Titel eingeben"
                />
                <div className="h-0.5 w-0 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 group-focus-within:w-full rounded-full mt-0.5 opacity-70"></div>
            </div>
        </div>
    );
}

export default TitleSearch;