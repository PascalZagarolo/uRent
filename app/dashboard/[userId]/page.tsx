import { TrendingUp } from "lucide-react";
import Logo from "../../profile/[profileId]/_components/u-rent-logo";
import DashboardLayout from '../../(dashboard)/layout';
import { User } from "@prisma/client";
import { db } from "@/app/utils/db";
import Drafts from "./_components/drafts-user";



const DashboardPage = async ({
    params
}: { params: { userId: string } }) => {

    const findUser = await db.user.findUnique({
        where: {
            id: params.userId
        }
    })

    return (
        <div>

            <h1 className="mt-4 flex justify-center text-3xl font-semibold items-center">
                <TrendingUp className="text-emerald-600 mr-4 h-8 w-8" /> Dashboard
            </h1>
            <h2 className="text-lg flex justify-center text-gray-800/80 font-bold"> von
                <p className="ml-2 font-bold text-black"> {findUser.name.toUpperCase()}</p>
            </h2>


            <div className="mt-16">
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    <div className="bg-blue-200">dd</div>
                    <div className="">
                        <Drafts/>
                    </div>
                    <div className="bg-yellow-200">dd</div>
                    <div className="bg-red-200">dd</div>
                </div>

            </div>
        </div>
    );
}

export default DashboardPage;