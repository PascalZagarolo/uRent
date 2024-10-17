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
        <div className="w-full">
            <Button className="w-full bg-[#20222F]  text-gray-200 border-none border-gray-900 hover:bg-[#242635] shadow-lg"
            onClick={() => {
                router.push(`/dashboard/${userId}`);
            }}
            >
                <PlusSquare className="mr-2 h-4 w-4" /> Zum Dashboard
            </Button>
        </div>
    );
}

export default GoToDashboard;