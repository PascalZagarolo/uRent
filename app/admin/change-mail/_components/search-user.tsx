'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import RenderedUser from "./rendered-user";

const SearchUser = () => {

    const [searchedUserName, setSearchedUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const onSearch = async () => {
        try {
           setIsLoading(true)

            const res = await axios.post(`/api/admin-requests/get-corresponding-users/${searchedUserName}`)
            console.log(res.data)
            setResults(res.data)
        } catch (e: any) {
            console.log(e);
            
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col ">
            <div className="flex flex-row items-center w-full">
                <Input
                    className="bg-[#242424] shadow-lg border-none"
                    onChange={(e) => {
                        setSearchedUsername(e.target.value)
                    }}
                    placeholder="Suche nach einem Nutzernamen.."
                />
                <Button className="bg-indigo-800 rounded-l-none hover:bg-indigo-900"
                onClick={onSearch}
                >
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

                <div className="flex flex-col space-y-4 mt-8">
                    {results.length > 0 ? (
                        results?.map((thisResult) => (
                            <div key={thisResult.id}>
                                <RenderedUser 
                            thisUser={thisResult}
                            />
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-200/40">
                            Keine passenden Ergebnisse gefunden..
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchUser;