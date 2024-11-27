'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";
import { CheckIcon, User2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import UserOptions from "./user-options";

interface DisplayBusinessNamesProps {
    name: string;
    sharesRealName: boolean;
    firstName: string;
    lastName: string;
    joinedAt: Date;
    ownProfile: boolean;
}


const DisplayBusinessNames = ({ name, sharesRealName, firstName, lastName, joinedAt, ownProfile }: DisplayBusinessNamesProps) => {

    const params = useParams().profileId;

    const uRent = params == "n6k2d5vokh971t5"

    return (
        <div className="mt-12 md:px-8 px-4">
            <div className="flex flex-row items-center">
                <p className="text-gray-200 text-2xl font-semibold break-all line-clamp-1">{name}</p> 
                {!ownProfile && (
                    <div className="ml-auto pl-4">
                        <UserOptions />
                    </div>
                )}
                {uRent &&
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <CheckIcon className="w-6 h-6 ml-2 text-indigo-800" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#222222] shadow-lg border-none ">
                                <div className="text-sm text-gray-200">
                                    <p>Offizieller Account</p>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                }
            </div>
            {sharesRealName && (firstName || lastName) && (
                <div className="flex flex-row items-center">
                    <span className="text-gray-200 flex flex-row items-center">
                        <User2Icon className="w-4 h-4 mr-2" />   {firstName} {lastName}
                    </span>
                </div>
            )}
            <div className=" text-gray-200/60 text-sm font-normal">
                Mitglied seit {format(joinedAt, "dd.MM.yyyy")}
            </div>
        </div>
    );
}

export default DisplayBusinessNames;