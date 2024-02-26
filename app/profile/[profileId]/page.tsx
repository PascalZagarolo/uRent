import { db } from "@/utils/db";
import ProfileHeader from "./_components/profile-header";
import ProfileBody from "./_components/profile-body";
import getCurrentUser from "@/actions/getCurrentUser";
import ProfileFooter from "./_components/profile-footer";
import RightSideProfile from "./_components/right-side";
import { Rezension, User } from "@prisma/client";
import ReturnHomePage from "./_components/return-homepage";
import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import { Contact2Icon, TruckIcon, UserX2Icon, UsersIcon } from "lucide-react";

import OwnContentSlide from "./_components/own-content-slide";


type RezensionWithSender = Rezension & {
    sender: User;
};

const ProfilePage = async ({ params }: { params: { profileId: string } }) => {

    const user = await db.user.findUnique({
        where: {
            id: params.profileId
        }
    })

    const currentUser = await getCurrentUser();

    const ownProfile = currentUser?.id === user.id ? true : false;

    const inserate = await db.inserat.findMany({
        where: {
            userId: params.profileId,
            isPublished: true
        }, include: {
            images: true,
            user: true,

        }
    })

    const notifications = await db.notification.findMany({
        where: {
            userId: currentUser?.id
        }
    })

    const rezensionen: RezensionWithSender[] = await db.rezension.findMany({
        where: {
            receiverId: params.profileId
        }, include: {
            sender: true

        }
    })



    return (
        <div className="dark:bg-[#141414]">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    notifications={notifications} />
            </div>
            <div className="flex justify-center p-8 bg-[#404040]/10 h-full">
                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="min-h-screen">
                        <div className="p-4">
                            <div>
                                <h3 className="text-2xl flex font-bold">
                                    <UsersIcon className="mr-2" />  Profilübersicht
                                </h3>
                            </div>
                            
                            <div className="mt-8">
                                <h1 className="text-lg font-semibold flex">
                                    <Contact2Icon className="mr-2"/>Profildetails
                                </h1>
                            </div>
                            <ProfileHeader
                               user={user}
                               currentUser={currentUser}    
                               
                               />
                               <div>
                        <div className="mt-8">
                                <h1 className="text-lg font-semibold flex">
                                    <TruckIcon className="mr-2"/>Weitere Inhalte
                                </h1>
                            </div>
                            <OwnContentSlide 
                                inserat={inserate}
                                currentUser = {currentUser}
                                />
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;