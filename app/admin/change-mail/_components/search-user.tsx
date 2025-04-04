'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const SearchUser = () => {

    const [searchedUserName, setSearchedUsername] = useState();
    const [results, setResults] = useState([]);
    const onSearch = () => {
        try {
            
        } catch (e: any) {

        }
    }

    return (
        <div className="flex flex-col ">
            <div className="flex flex-row items-center w-full">
                <Input
                    className="bg-[#242424] shadow-lg border-none"
                    placeholder="Suche nach einem Nutzernamen.."
                />
                <Button className="bg-indigo-800 rounded-l-none hover:bg-indigo-900">
                    <MagnifyingGlassIcon
                        className="w-4 h-4 text-gray-200"
                    />
                </Button>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="flex flex-row items-center space-x-4">
                    <div>
                        <MagnifyingGlassIcon
                            className="w-4 h-4 text-gray-200/60"
                        />
                    </div>
                    <div className="text-gray-200/60">
                        {results.length} Ergebnisse gefunden..
                    </div>
                </div>

                <div>

                </div>
            </div>
        </div>
    );
}

export default SearchUser;