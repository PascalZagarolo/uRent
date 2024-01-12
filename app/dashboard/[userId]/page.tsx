import { TrendingUp } from "lucide-react";
import Logo from "../../profile/[profileId]/_components/u-rent-logo";
import DashboardLayout from '../../(dashboard)/layout';
import { User } from "@prisma/client";
import { db } from "@/utils/db";
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
            
        </div>
    );
}

export default DashboardPage;