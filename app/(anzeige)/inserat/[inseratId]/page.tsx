


import type { Metadata, ResolvingMetadata } from 'next'
import ProfileView from "./_components/profile-view";
import InseratOptions from "./_components/inserat-options";
import getCurrentUser from "@/actions/getCurrentUser";

import { lazy } from "react";
import InseratAttributes from "./_components/inserat-attributes";


import { FaCarCrash } from "react-icons/fa";
import OtherInserate from "./_components/other-inserate";
import db from "@/db/drizzle";
import { booking, inserat, business, CategoryEnumRender, userSubscription } from '../../../../db/schema';
import { and, eq, sql } from "drizzle-orm";

import BreadCrumbs from "./bread-crumbs";


import InseratShow from "./_components/inserat-show";
import AdsComponent from '@/components/ad-component';
import Footer from '@/app/(dashboard)/_components/footer';
import MobileHeader from '@/app/(dashboard)/_components/mobile-header';
import HeaderLogo from '@/app/(dashboard)/_components/header-logo';
import { getCurrentUserWithNotifications } from '@/actions/getCurrentUserWithNotifications';




type Props = {
    params: { inseratId: string }

}

export async function generateMetadata({ params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    try {
        const findInserat = db.query.inserat.findFirst({
            where: eq(inserat.id, params.inseratId),
            with : {
                address : true
            }
        }).prepare("findInserat")

        const res = await findInserat.execute();

        const usedAddress = res?.address?.locationString ? res?.address?.locationString + ", " : ""


        return {
            title: res.title,
            openGraph: {
                description: res?.address?.locationString + " " + res?.description,
            },
        }
    } catch (error) {
        return {
            title: "Mieten auf uRent",
            description: "Vermiete dein Fahrzeug auf uRent und verdiene Geld damit."
        }
    }
}



const InseratAnzeige = async ({
    params
}: { params: { inseratId: string } }) => {


    
    const currentUser = await getCurrentUserWithNotifications();


    const findInserat = db.query.inserat.findFirst({
        where: eq(inserat.id, sql.placeholder("inseratId")),
        with: {
            address: true,
            images: true,
            user: {
                with: {
                    contactOptions: true,
                    subscription : true,
                    business : {
                        with : {
                            businessAddresses : true
                        }
                    }
                }
            },
            bookings : true,
            pkwAttribute: true,
            lkwAttribute: true,
            trailerAttribute: true,
            transportAttribute: true,
            priceprofiles : true
        }
    }).prepare("findInserat")

    let thisInserat;

    try {
        thisInserat = await findInserat.execute({ inseratId: params?.inseratId })

        if (!thisInserat) {
            return (
                <div className="w-full h-dvh flex justify-center items-center">
                    <h1 className="text-2xl dark:text-gray-200 font-semibold">
                        <FaCarCrash
                            className="w-8 h-8"
                        />
                        Error 404 - Inserat nicht gefunden
                        <p className="flex justify-center items-center font-medium text-sm">
                            Das gesuchte Inserat konnte nicht gefunden werden.
                            Entweder wurde es gelöscht, privat gestellt oder hat nie existiert.
                        </p>
                    </h1>

                </div>
            )
        }
    } catch {
        return (
            <div className="w-full h-dvh flex justify-center items-center">
                <h1 className="text-2xl dark:text-gray-200 font-semibold">
                    <FaCarCrash
                        className="w-8 h-8"
                    />
                    Error 404 - Inserat nicht gefunden
                    <p className="flex justify-center items-center font-medium text-sm">
                        Das gesuchte Inserat konnte nicht gefunden werden.
                        Entweder wurde es gelöscht, privat gestellt oder hat nie existiert.
                    </p>
                </h1>

            </div>
        )
    }

    if (!thisInserat) {
        return (
            <div className="w-full flex justify-center items-center">
                <h1 className="text-2xl dark:text-gray-200 font-semibold">
                    Error 404 - Inserat nicht gefunden
                </h1>
            </div>
        )
    }

    const inseratOwnerId = thisInserat.user.id

    const findInseratArray = db.query.inserat.findMany({
        where: (
            and(
                eq(inserat.userId, sql.placeholder("inseratOwnerId")),
                eq(inserat.isPublished, true)
            )
        ), with: {
            images: true
        }
    }).prepare("findInseratArray")

    const inseratArray = await findInseratArray.execute({ inseratOwnerId: inseratOwnerId })

    
    const thisBusiness = thisInserat?.user?.business
    

    const inseratBookings = thisInserat.bookings

    

    

    





    return (
        <>
            <head>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9497499351411762"
                    crossOrigin="anonymous"></script>
            </head>
            <div className=" bg-[#404040]/10 dark:bg-[#0F0F0F] min-h-screen">
            <HeaderLogo 
            currentUser={currentUser} 
            foundNotifications={currentUser?.notifications}
            />
            <div className="sm:hidden">
                <MobileHeader
                currentUser={currentUser}
                foundNotifications={currentUser?.notifications}
                />  
             </div>

            <div className="h-full w-full">
            <div className='sm:flex w-full justify-center'>

{/*
        <div className='h-screen sm:flex hidden items-center w-2/12'>
            <div className='w-full sm:block hidden '>
                <AdsComponent dataAdSlot='3797720061' />
            </div>
        </div>
*/}
        <div className="xl:w-6/12 w-full xl:flex  justify-center   xl:mt-12 h-max">

            <div className="h-full sm:p-4 w-full flex justify-end">
                <div className='xl:w-12/12 w-full'>
                    <div className="w-full   p-2 sm:p-0">
                        <BreadCrumbs
                            thisCategory={thisInserat.category}
                            thisTitle={thisInserat.title}
                        />
                    </div>
                    <div className="">
                        <InseratShow
                            thisInserat={thisInserat}
                            inseratBookings={inseratBookings}
                        />
                    </div>
                    <div className="flex justify-start  mt-2">


                        <InseratAttributes
                            thisInserat={thisInserat}
                        />


                    </div>
                </div>
            </div>

            <div>
                <div className='xl:flex justify-start xl:w-2/4 w-full'>

                    <div className=" sm:p-2 xl:mt-8  justify-center xl:block">

                        <div className="xl:hidden  sm:block ">

                            <ProfileView
                                thisUser={thisInserat.user}
                                inseratArray={inseratArray.length}
                                inseratOwner={thisInserat.user}
                                thisBusiness={thisBusiness}
                            />

                        </div>
                        <div className="xl:ml-0 flex sm:block justify-center w-full">

                            <InseratOptions
                                thisUser={thisInserat.user}
                                bookings={inseratBookings}
                                ownUser={currentUser}
                                contactOptions={thisInserat.user.contactOptions}
                                thisInserat={thisInserat}
                            />

                        </div>
                        <div className="hidden xl:mt-8 xl:block w-full xl:w-2/4">

                            <ProfileView
                                thisUser={thisInserat.user}
                                inseratArray={inseratArray.length}
                                inseratOwner={thisInserat.user}
                                thisBusiness={thisBusiness}
                            />

                        </div>
                        <div className="py-8 w-full xl:w-2/4">

                            <OtherInserate
                                thisUser={thisInserat.user}
                                inserateArray={inseratArray.filter((inserat) => inserat.id !== params.inseratId)}
                            />

                        </div>
                    </div>

                </div>
            </div>



        </div>
         {/*
        <div className='h-screen sm:flex hidden items-center w-2/12'>
            <div className='w-full sm:block hidden '>
                <AdsComponent dataAdSlot='3797720061' />
            </div>
        </div>
*/}
    </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
            
        </>
    );
}

export default InseratAnzeige;