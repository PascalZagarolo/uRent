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
            <h1 className=" flex justify-center text-5xl font-semibold items-center">
                <TrendingUp className="text-emerald-600 mr-4 h-8 w-8" /> Dashboard
            </h1>
            <h2 className="text-base flex justify-center text-gray-800/50 font-bold"> von
                <p className="ml-2 font-bold  text-blue-800"> {findUser.name.toUpperCase()}</p>
            </h2>


            <div className="mt-16 flex">
                <div className="w-1/2">
            
                </div>
                <div className="w-1/2">
                    <h1 className="text-lg mb-2 font-bold justify-center flex">
                        Entwürfe
                    </h1>
                    <Drafts/>
                <div/>
            </div>
            </div>
        </div>
    );
}

export default DashboardPage;