import ProfileHeader from "./_components/profile-header";
import getCurrentUser from "@/actions/getCurrentUser";

import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import { Contact2Icon, TruckIcon, UsersIcon } from "lucide-react";
import OwnContentSlide from "./_components/own-content-slide";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";
import db from "@/db/drizzle";
import { and, eq, sql } from "drizzle-orm";
import { inserat, userTable } from "@/db/schema";
import RegisterBusiness from "./_components/register-business";
import { FaKey } from "react-icons/fa6";
import Openhours from "./_components/openhours";
import MessageButton from "./_components/message-button";

import { Metadata, ResolvingMetadata } from "next";
import AddImpressum from "./_components/add-impressum";
import { FaCarCrash } from "react-icons/fa";
import Footer from "@/app/(dashboard)/_components/footer";

import BusinessFaqs from "./_components/business-faqs";
import getCurrentUserWithNotificationsAndFavourites from "@/actions/getCurrentUserWithNotificationsAndFavourites";

import FeedbackModal from "@/components/feedback-modal";
import PaymentMethods from "./_components/payment-methods";
import AdsComponent from "@/components/ad-component";
import BusinessRender from "./_components/business-render/business-render";
import ProfileRender from "./_components/profile-render/profile-render";




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
                business: {
                    with: {
                        businessAddresses: true,
                    }
                },
            }

        })

        let usedDescription;

        let addedAddress = "";

        if (res?.business?.businessAddresses[0]?.postalCode && res?.business?.businessAddresses[0]?.city) {
            addedAddress = res?.business?.businessAddresses[0]?.postalCode + ", " + res?.business?.businessAddresses[0]?.city;
        }

        if (res?.business?.description || res?.description) {
            usedDescription = res?.business?.description ? addedAddress + res?.business?.description : addedAddress + res?.description
        } else {
            usedDescription = res?.name
        }



        return {
            title: res.name,
            openGraph: {
                description: usedDescription,
            },
        }
    } catch (error) {
        return {
            title: "Mieten auf uRent",
            description: "Mieten auf uRent"
        }
    }
}


const ProfilePage = async ({ params }: { params: { profileId: string } }) => {

    const pageOwnerId = params.profileId;

    const currentUser = await getCurrentUserWithNotificationsAndFavourites();



 




    const thisUser = await db.query.userTable.findFirst({
        where: eq(userTable.id, pageOwnerId),
        with: {
            contactOptions: {
                with: {
                    userAddress: true
                }
            },
            business: {
                with: {
                    businessAddresses: true,
                    businessImages: true,
                    faqs: true,
                    openingTimes: true
                }
            },
            paymentMethods: true,
            inserat : {
                with : {
                    images : true,
                    address : true
                }
            },            
        }
    })



    const thisBusinessImages = thisUser?.business?.businessImages.sort((a, b) => a.position - b.position)



    const ownProfile = currentUser?.id == thisUser?.id;


    



    return (
        <>
<head>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9497499351411762" //@ts-ignore
     crossorigin="anonymous"></script>
</head>
        <div className="dark:bg-[#141414] w-full min-h-screen flex flex-col">
            {/* Header */}
            <div className="relative top-0 w-full z-50 border-b border-gray-800">
                <HeaderLogo currentUser={currentUser} foundNotifications={currentUser?.notifications} />
            </div>
            <div className="sm:hidden border-b border-gray-800">
                <MobileHeader currentUser={currentUser} foundNotifications={currentUser?.notifications} />
            </div>

            {/* Main Section */}
            <div className="flex flex-row justify-center h-full w-full lg:p-8 bg-[#404040]/10 flex-grow">
                {/* Main Content */}
                <div className="xl:w-[1044px] w-full max-w-[1044px] dark:bg-[#1c1c1c] h-full bg-white rounded-xl shadow-xl">
                    <div className="min-h-screen">
                        {thisUser ? (
                            thisUser?.isBusiness ? (
                                <div className="p-4 md:p-8 space-y-8">
                                    <BusinessRender 
                                    thisUser={thisUser}
                                    ownProfile={ownProfile}
                                    currentUser={currentUser}
                                    />
                                </div>
                            ) : (
                                <div className="p-4 md:p-8 space-y-8">
                                    <ProfileRender 
                                    thisUser={thisUser}
                                    ownProfile={ownProfile}
                                    currentUser={currentUser}
                                    />
                                </div>
                            )
                        ) : (
                            <div className="w-full min-h-screen flex justify-center items-center">
                                <div className="flex flex-col items-center gap-y-4">
                                    <FaCarCrash className="w-12 h-12 text-gray-400" />
                                    <h3 className="text-xl font-semibold text-gray-200">
                                        Dieser Nutzer scheint nicht zu existieren..
                                    </h3>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 border-t border-gray-800">
                <Footer />
            </div>
        </div>
        </>

    );
}

export default ProfilePage;