'use client'

import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface GoToDashboardProps {
    userId : string,
    inseratId : string
}

const GoToDashboard: React.FC<GoToDashboardProps> = ({
    userId,
    inseratId
}) => {
    
    const router = useRouter();

    return (
        <div className="sm:w-[240px]">
            <Button className="w-full bg-[#20222F] text-gray-200 border-none border-gray-900 hover:bg-[#20222F]"
            onClick={() => {
                router.push(`/dashboard/${userId}/manage`);
            }}
            >
                <PlusSquare className="mr-2 h-4 w-4" /> Zum Dashboard
            </Button>
        </div>
    );
}

export default GoToDashboard;