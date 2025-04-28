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
                onOpenChange={(e) => { setIsOpen(e) }}
                open={open}
            >
                <PopoverTrigger asChild>
                    <div className="p-2 rounded-full hover:bg-indigo-900/20 transition-all duration-200">
                        <BsThreeDotsVertical className="w-4 h-4 text-gray-200 hover:text-indigo-400 transition-colors duration-200" />
                    </div>
                </PopoverTrigger>
                <PopoverContent 
                    className="bg-[#16161f] border border-indigo-900/30 rounded-lg p-0 shadow-xl" 
                    side="right"
                >
                    <div className="flex flex-col rounded-lg overflow-hidden">
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