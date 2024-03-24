
import ProfileHeader from "./_components/profile-header";
import getCurrentUser from "@/actions/getCurrentUser";

import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import { Contact2Icon, TruckIcon, UsersIcon } from "lucide-react";
import OwnContentSlide from "./_components/own-content-slide";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";
import db from "@/db/drizzle";
import { and, eq, sql } from "drizzle-orm";
import { inserat, rezension, users } from "@/db/schema";






const ProfilePage = async ({ params }: { params: { profileId: string } }) => {

    const pageOwnerId = params.profileId;

    const currentUser = await getCurrentUser();

    

    const foundInserate = await db.query.inserat.findMany({
        where : (
            and(
                eq(inserat.userId, params.profileId),
                eq(inserat.isPublished, true)
            )
        ), with : {
            images : true,
            user : true
        }
    })


    const thisUser = await db.query.users.findFirst({
        where : eq(users.id, foundInserate[0].userId)
    })
    
    const ownProfile = currentUser?.id === thisUser.id ? true : false;

    const rezensionen = await db.query.rezension.findMany({
        where : (
            eq(rezension.receiverId, pageOwnerId)
        )
    })



    return (
        <div className="dark:bg-[#141414] w-full">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                     />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                    currentUser={currentUser}
                />
            </div>
            <div className="flex justify-center lg:p-8 bg-[#404040]/10 h-full">
                <div className="md:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white pb-4 ">
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
                                user={thisUser}
                                currentUser={currentUser}

                            />
                            <div>
                                <div className="mt-8 px-4">
                                    <h1 className="text-lg font-semibold flex items-center">
                                        <TruckIcon className="mr-2" />Weitere Inhalte <p className=" ml-2 text-sm">{foundInserate.length}</p>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-2">
                        <OwnContentSlide
                            foundInserate={foundInserate}
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