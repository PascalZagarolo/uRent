
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



    const ownProfile = currentUser?.id === thisUser?.id ? true : false;






    return (
        <>
<head>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9497499351411762" //@ts-ignore
     crossorigin="anonymous"></script>
</head>
        <div className="dark:bg-[#141414] w-full min-h-screen flex flex-col">
            {/* Header */}
            <div className="relative top-0 w-full z-50">
                <HeaderLogo currentUser={currentUser} foundNotifications={currentUser?.notifications} />
            </div>
            <div className="sm:hidden">
                <MobileHeader currentUser={currentUser} foundNotifications={currentUser?.notifications} />
            </div>

            {/* Main Section */}
            <div className="flex flex-row justify-center h-full w-full lg:p-8 bg-[#404040]/10 flex-grow space-x-8">
                {/* Left Sidebar */}
                

                {/* <div className=" h-screen w-2/12 flex flex-col justify-evenly items-start space-y-8">
                    
                    <div className="h-full w-full">
                    <AdsComponent dataAdSlot="3797720061" />
                    </div>
                    <div className="h-full w-full"> 
                    <AdsComponent dataAdSlot="3797720061" />
                    </div>
                    <div className="h-full w-full">
                    <AdsComponent dataAdSlot="3797720061" />
                    </div>
                </div> */}

                {/* Main Content */}
                <div className="xl:w-[1044px] w-full max-w-[1044px] dark:bg-[#1c1c1c] h-full bg-white rounded-md">
                    <div className="min-h-screen">
                        {thisUser ? (
                            thisUser?.isBusiness ? (
                                <div>
                                    <BusinessRender 
                                    thisUser={thisUser}
                                    ownProfile={ownProfile}
                                    currentUser = {currentUser}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <ProfileRender 
                                    thisUser={thisUser}
                                    ownProfile={ownProfile}
                                    currentUserId={currentUser.id}
                                    />
                                </div>
                            )
                        ) : (
                            <div className="w-full min-h-screen flex justify-center items-center">
                                <h3 className="flex text-xl font-semibold gap-x-4">
                                    <FaCarCrash className="w-6 h-6" /> Dieser Nutzer scheint nicht zu existieren..
                                </h3>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar */}
                

                {/* <div className=" h-screen w-2/12 flex flex-col items-end justify-evenly space-y-8">
                <div className="h-full w-full">
                    <AdsComponent dataAdSlot="3797720061" />
                    </div>
                    <div className="h-full w-full">
                    <AdsComponent dataAdSlot="3797720061" />
                    </div>
                    <div className="h-full w-full">
                    <AdsComponent dataAdSlot="3797720061" />
                    </div>
                </div> */}
            </div>

            {/* Footer */}
            <div>
                <Footer />
            </div>
        </div>
        </>

    );
}

export default ProfilePage;