
import ProfileHeader from "./_components/profile-header";
import getCurrentUser from "@/actions/getCurrentUser";

import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import { Contact2Icon, TruckIcon, UsersIcon } from "lucide-react";
import OwnContentSlide from "./_components/own-content-slide";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";
import db from "@/db/drizzle";
import { and, eq, sql } from "drizzle-orm";
import { businessImages, contactOptions, inserat, notification, rezension, users } from "@/db/schema";
import RegisterBusiness from "./_components/register-business";
import { FaBuilding, FaKey } from "react-icons/fa6";
import Openhours from "./_components/openhours";
import MessageButton from "./_components/message-button";
import { business, openingTimes } from '../../../db/schema';
import { Metadata, ResolvingMetadata } from "next";
import AddImpressum from "./_components/add-impressum";



type Props = {
    params: { profileId: string }

}

export async function generateMetadata({ params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    try {
        const res = await db.query.users.findFirst({
            where: eq(users.id, params.profileId),
            with : {
                business : true
            }
            
        })
        return {
            title: res.name,
            openGraph: {
                description: res.business?.description,
            },
        }
    } catch (error) {
        return {
            title: "Mieten auf uRent",
            description: "Vermiete dein Fahrzeug auf uRent und verdiene Geld damit."
        }
    }
}


const ProfilePage = async ({ params }: { params: { profileId: string } }) => {

    const pageOwnerId = params.profileId;

    const currentUser = await getCurrentUser();

    const foundNotifications = await db.query.notification.findMany({
        where: (
            eq(notification.userId, currentUser?.id)
        )
    })

    const foundInserate = await db.query.inserat.findMany({
        where: (
            and(
                eq(inserat.userId, params.profileId),
                eq(inserat.isPublished, true)
            )
        ), with: {
            images: true,
            user: true,
            address: true
        }
    })

    const thisContactoptions = await db.query.contactOptions.findFirst({
        where: (
            eq(contactOptions.userId, pageOwnerId)
        ), with: {
            userAddress: true
        }
    })


    const thisUser = await db.query.users.findFirst({
        where: eq(users.id, pageOwnerId),
        with : {
            business : {
                with : {
                    businessAddresses : true,
                    businessImages : true,
                    openingTimes : true
                }
            }
        }
    })

    const ownProfile = currentUser?.id === thisUser?.id ? true : false;

    const rezensionen = await db.query.rezension.findMany({
        where: (
            eq(rezension.receiverId, pageOwnerId)
        )
    })

    


    return (
        <div className="dark:bg-[#141414] w-full">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    foundNotifications={foundNotifications}
                />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                    currentUser={currentUser}
                    foundNotifications={foundNotifications}
                />
            </div>
            <div className="flex justify-center lg:p-8 bg-[#404040]/10 h-full">
                <div className="md:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white pb-4 ">
                    <div className="min-h-screen">
                        <div className="sm:p-4 p-2">
                            <div>
                                {
                                    thisUser.isBusiness ? (
                                        <h3 className="text-2xl flex font-bold ">
                                            <FaBuilding className="mr-2" />  Geschäftsprofil
                                            <div className="ml-auto">
                                            <MessageButton />
                                            </div>
                                        </h3>
                                    ) : (
                                        <h3 className="text-2xl flex font-bold ">
                                            <UsersIcon className="mr-2" />  Profilübersicht 
                                            
                                        </h3>
                                    )
                                }
                            </div>
                            {(ownProfile && !thisUser.isBusiness) && (
                                <RegisterBusiness />
                            )}
                            <div className="mt-4 items-center">
                                {thisUser.isBusiness ? (
                                    <h1 className="text-lg font-semibold flex items-center">
                                        <FaKey className="w-4 h-4 mr-2" />Vermieterdetails
                                    </h1>
                                ) : (
                                    <h1 className="text-lg font-semibold flex">
                                        <Contact2Icon className="mr-2" />Profildetails
                                    </h1>
                                )}
                            </div>

                            <ProfileHeader
                                user={thisUser}
                                currentUser={currentUser}
                                thisContactOptions={thisContactoptions}

                            />
                            {thisUser.isBusiness && (
                                <div className="p-4">
                                <Openhours
                                thisBusiness={thisUser.business}
                                />
                            </div>
                            )}
                            {thisUser.isBusiness && (
                                <div className="p-4">
                                <AddImpressum
                                ownProfile={ownProfile}
                                user={thisUser}
                                />
                            </div>
                            )}
                            <div>
                                <div className="mt-8 px-4">
                                    <h1 className="text-md font-semibold flex items-center">
                                        <TruckIcon className="mr-2 w-4 h-4" />Weitere Inhalte <p className=" ml-2 text-sm">{foundInserate.length}</p>
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