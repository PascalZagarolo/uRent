'use client'

import qs from "query-string"
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FaUserTie } from "react-icons/fa6";


const SearchItem = () => {





    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentLocation = searchParams.get("location");
    const currentTitle = searchParams.get("title")

    const [value, setValue] = useState(currentTitle || "");
    const [foundProfiles, setFoundProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const params = getSearchParamsFunction("title");


    const debouncedValue = useDebounce(value);
    /*
    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: debouncedValue,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }, [debouncedValue, router, pathname, currentLocation])
    */

    useEffect(() => {

        const findUser = async () => {
            if (debouncedValue) {
                setIsLoading(true);
                await axios.patch(`/api/search/user/${debouncedValue}`).then((res) => {
                    console.log(res.data)
                    setFoundProfiles(res.data)
                }).then(() => {
                    setIsLoading(false)
                })

            } else {
                setFoundProfiles([])
            }
        }

        findUser();
    }, [debouncedValue])

    const onSearch = () => {
        const url = qs.stringifyUrl({
            url: "/",
            query: {
                title: value,
                location: currentLocation,
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="flex w-full items-center justify-start sm:position: static sm:mr-4 md:mr-4 2xl:mr-4 ">




<div className="w-full relative">
                <Input
                    className="2xl:w-[272px] w-full border-none rounded-none dark:focus:bring-0 dark:focus-visible:ring-0 focus:border-none bg-[#1B1F2C]"
                    placeholder="Ich suche nach..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setShowDropdown(false)}
                />
                {showDropdown && (
                    <div className="absolute w-full bg-[#141721]    rounded-b-md space-y-2 text-sm">
                        
                        <ul>
                            {foundProfiles.map((profile) => (
                                <li className="p-4 font-semibold flex gap-x-2" key={profile.id}>
                                  <FaUserTie className="w-4 h-4" />  {profile.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>


            <div className="px-2 py-2  rounded-none rounded-r-md bg-slate-800 dark:hover:bg-slate-700 hover: cursor-pointer lg:hidden xl:flex" onClick={onSearch}>
                <Search
                    className=" text-white h-6 w-6"
                />
            </div>
        </div>
    );
}

export default SearchItem;