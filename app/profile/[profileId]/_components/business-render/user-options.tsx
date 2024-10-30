'use client'


import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { BsThreeDotsVertical } from "react-icons/bs";
import ReportUser from "./user-options/report-user";
import { useState } from "react";

const UserOptions = () => {

    const [open, setIsOpen] = useState(false);


    return (
        <div>
            <Popover 
            onOpenChange={(e) => {setIsOpen(e)}}
            open={open}
            >
                
                    <PopoverTrigger asChild>
                        
                            <div>
                            <BsThreeDotsVertical className="w-4 h-4 text-gray-200 hover:text-gray-300 hover:cursor-pointer" />
                            </div>
                        
                    </PopoverTrigger>
                    <PopoverContent className="bg-[#191919] border-black rounded-lg p-0" side="right">
                        <div className="flex flex-col rounded-lg">
                            <ReportUser 
                            onClose={() => setIsOpen(false)}
                            />
                        </div>
                    </PopoverContent>
                
            </Popover>
        </div>
    );
}

export default UserOptions;