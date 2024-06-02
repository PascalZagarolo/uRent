
import ProfileHeader from "./_components/profile-header";
import getCurrentUser from "@/actions/getCurrentUser";

import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import { Contact2Icon, TruckIcon, UsersIcon } from "lucide-react";
import OwnContentSlide from "./_components/own-content-slide";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";
import db from "@/db/drizzle";
import { and, eq, sql } from "drizzle-orm";
import { businessImages, contactOptions, inserat, notification,  userTable } from "@/db/schema";
import RegisterBusiness from "./_components/register-business";
import { FaBuilding, FaKey } from "react-icons/fa6";
import Openhours from "./_components/openhours";
import MessageButton from "./_components/message-button";

import { Metadata, ResolvingMetadata } from "next";
import AddImpressum from "./_components/add-impressum";
import { FaCarCrash } from "react-icons/fa";
import Footer from "@/app/(dashboard)/_components/footer";
import ChangeAccountType from "./_components/change-account-type";
import getCurrentUserWithFavourites from "@/actions/getCurrentUserWithFavourites";




type Props = {
    params: { profileId: string }

}

export async function generateMetadata({ params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    try {
        const res = await db.query.userTable.findFirst({
            where: eq(userTable.id, params.profileId),
            with: {
                business: true
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

    const currentUser = await getCurrentUserWithFavourites();

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


    const thisUser = await db.query.userTable.findFirst({
        where: eq(userTable.id, pageOwnerId),
        with: {
            business: {
                with: {
                    businessAddresses: true,
                    businessImages: true,
                    openingTimes: true
                }
            }
        }
    })



    const thisBusinessImages = await db.query.businessImages.findMany({
        where: (
            eq(businessImages.businessId, thisUser?.business?.id)
        ),
        orderBy: (position, { asc }) => [asc(businessImages.position)]

    })

    const ownProfile = currentUser?.id === thisUser?.id ? true : false;






    return (
        <>
            <head>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9497499351411762"//@ts-ignore
                    crossorigin="anonymous"></script>
            </head>
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
                            {thisUser ? (
                                <>
                                    <div className="sm:p-4 p2">
                                        <div>
                                            {
                                                thisUser.isBusiness ? (
                                                    <h3 className="text-2xl flex font-bold p-2">
                                                        <FaBuilding className="mr-2" />  Geschäftsprofil
                                                        {!ownProfile && (
                                                            <div className="ml-auto">
                                                            <MessageButton />
                                                        </div>
                                                        )}
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
                                        <div className="mt-4 items-center p-2">
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
                                            thisImages={thisBusinessImages}

                                        />
                                        {thisUser.isBusiness && (
                                            <div className="sm:p-4">
                                                <Openhours
                                                    ownProfile={ownProfile}
                                                    thisBusiness={thisUser.business}
                                                />
                                            </div>
                                        )}
                                        {thisUser.isBusiness && (
                                            <div className="sm:px-4">
                                                <AddImpressum
                                                    ownProfile={ownProfile}
                                                    user={thisUser}
                                                />
                                            </div>
                                        )}
                                        <div>
                                            
                                        </div>
                                    </div>

                                   
                                    <div>
                                        
                                    <OwnContentSlide
                                            foundInserate={foundInserate}
                                            currentUser={currentUser}
                                        />
                                    </div>
                                    


                                </>
                            ) : (
                                <div className="w-full min-h-screen flex justify-center items-center">
                                    <h3 className="flex text-xl font-semibold gap-x-4">
                                        <FaCarCrash className="w-6 h-6" />    Dieser Nutzer scheint nicht zu existieren..
                                    </h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default ProfilePage;