import { db } from "@/utils/db";
import ProfileHeader from "./_components/profile-header";
import getCurrentUser from "@/actions/getCurrentUser";
import { Rezension, User } from "@prisma/client";
import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import { Contact2Icon, TruckIcon, UsersIcon } from "lucide-react";
import OwnContentSlide from "./_components/own-content-slide";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";





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
        <div className="dark:bg-[#141414] w-full">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    notifications={notifications} />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                    currentUser={currentUser}
                    notifications={notifications}
                />
            </div>
            <div className="flex justify-center lg:p-8 bg-[#404040]/10 h-full">
                <div className="md:w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white pb-4 ">
                    <div className="min-h-screen">
                        <div className="sm:p-4 p-2">
                            <div>
                                <h3 className="text-2xl flex font-bold ">
                                    <UsersIcon className="mr-2" />  Profilübersicht
                                </h3>
                            </div>

                            <div className="mt-8">
                                <h1 className="text-lg font-semibold flex">
                                    <Contact2Icon className="mr-2" />Profildetails
                                </h1>
                            </div>
                            <ProfileHeader
                                user={user}
                                currentUser={currentUser}

                            />
                            <div>
                                <div className="mt-8 px-4">
                                    <h1 className="text-lg font-semibold flex items-center">
                                        <TruckIcon className="mr-2" />Weitere Inhalte <p className=" ml-2 text-sm">{inserate.length}</p>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                        <OwnContentSlide
                            inserat={inserate}
                            currentUser={currentUser}
                        />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;