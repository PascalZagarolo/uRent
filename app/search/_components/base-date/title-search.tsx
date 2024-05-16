import { useDebounce } from "@/components/multiple-selector";
import { Input } from "@/components/ui/input";
import { useSavedSearchParams } from "@/store";
import { useEffect, useState } from "react";
import { MdOutlineTitle } from "react-icons/md";

const TitleSearch = () => {

    const [value, setValue] = useState("");

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const debouncedValue = useDebounce(value, 500)

    

    useEffect(() => {
        if(value) {
            changeSearchParams("title", value);
        } else {
            deleteSearchParams("title");
        }
    }, [debouncedValue])

    

    return (
        <div className="items-center">
            <h3 className="font-semibold flex">
                <MdOutlineTitle className="w-4 h-4 mr-2" /> Titel
            </h3>
            <div className=" flex items-center mt-2 w-full flex-shrink">

                <Input

                    placeholder="Titel.."
                    className=" rounded-md input: text-sm input: justify-start dark:focus-visible:ring-0 dark:bg-[#141414] dark:border-none"
                    onChange={(e) => { setValue(e.target.value)}}
                    value={value}
                    
                />

            </div>

        </div>
    );
}

export default TitleSearch;