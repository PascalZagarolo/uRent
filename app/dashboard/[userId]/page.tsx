'use client'

import { TrendingUp } from "lucide-react";
import Logo from "../../profile/[profileId]/_components/u-rent-logo";
import DashboardLayout from '../../(dashboard)/layout';
import { User } from "@prisma/client";
import { db } from "@/utils/db";
import Drafts from "./_components/drafts-user";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";



const DashboardPage =  ({
    params
}: { params: { userId: string } }) => {

    

    const router = useRouter();

    useEffect(() => {
        router.push(`/dashboard/${params.userId}/inserate`)
    })
    

    return (
        <div className="flex justify-center items-center">
            <BeatLoader/>
        </div>
    );
}

export default DashboardPage;