'use client'

import { format } from "date-fns";
import { User2Icon } from "lucide-react";

interface DisplayBusinessNamesProps {
    name: string;
    sharesRealName : boolean;
    firstName : string;
    lastName : string;
    joinedAt : Date;
}


const DisplayBusinessNames = ({ name, sharesRealName, firstName, lastName, joinedAt }: DisplayBusinessNamesProps) => {
    return (
        <div className="mt-12 px-8">
            <div>
                <p className="text-gray-200 text-2xl font-semibold">{name}</p>
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