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
        <div className="p-6 bg-[#222222] rounded-lg shadow-sm border border-gray-800">
            <div className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <p className="text-gray-200 text-2xl font-semibold break-all line-clamp-1">{name}</p> 
                    {uRent && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20">
                                        <CheckIcon className="w-4 h-4 text-indigo-400" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#222222] shadow-lg border border-gray-800">
                                    <div className="text-sm text-gray-200">
                                        <p>Offizieller Account</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
                {!ownProfile && (
                    <div>
                        <UserOptions />
                    </div>
                )}
            </div>
            {sharesRealName && (firstName || lastName) && (
                <div className="flex flex-row items-center mt-3">
                    <span className="text-gray-200/80 flex flex-row items-center">
                        <User2Icon className="w-4 h-4 mr-2 text-indigo-400" /> {firstName} {lastName}
                    </span>
                </div>
            )}
            <div className="text-gray-200/60 text-sm font-normal mt-3">
                Mitglied seit {format(joinedAt, "dd.MM.yyyy")}
            </div>
        </div>
    );
}

export default DisplayBusinessNames;