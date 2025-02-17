


import type { Metadata, ResolvingMetadata } from 'next'
import ProfileView from "./_components/profile-view";
import InseratOptions from "./_components/inserat-options";

import InseratAttributes from "./_components/inserat-attributes";


import { FaCarCrash } from "react-icons/fa";
import OtherInserate from "./_components/other-inserate";
import db from "@/db/drizzle";
import { inserat,  } from '../../../../db/schema';
import { and, eq, sql } from "drizzle-orm";

import BreadCrumbs from "./bread-crumbs";


import InseratShow from "./_components/inserat-show";
import AdsComponent from '@/components/ad-component';
import Footer from '@/app/(dashboard)/_components/footer';
import MobileHeader from '@/app/(dashboard)/_components/mobile-header';
import HeaderLogo from '@/app/(dashboard)/_components/header-logo';

import getCurrentUserWithNotificationsAndFavourites from '@/actions/getCurrentUserWithNotificationsAndFavourites';




type Props = {
    params: { inseratId: string }

}

export async function generateMetadata({ params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    try {
        const findInserat = db.query.inserat.findFirst({
            where: eq(inserat.id, params.inseratId),
            with: {
                address: true
            }
        }).prepare("findInserat")

        const res = await findInserat.execute();


        return {
            title: res.title + ` - ${res?.address?.locationString},  ${res?.address?.postalCode}`,
            openGraph: {
                description: `${res?.address?.postalCode}, ${res?.address?.locationString} - ` + res?.description,
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



    const currentUser = await getCurrentUserWithNotificationsAndFavourites();


    const findInserat = db.query.inserat.findFirst({
        where: eq(inserat.id, sql.placeholder("inseratId")),
        with: {
            address: true,
            images: {
                orderBy: (images, { asc }) => [asc(images.position)]
            },
            user: {
                with: {
                    contactOptions: true,
                    subscription: true,
                    business: {
                        with: {
                            businessAddresses: true
                        }
                    }
                }
            },
            vehicles: {
                with: {
                    bookings: true
                }
            },
            bookings: true,
            pkwAttribute: true,
            lkwAttribute: true,
            trailerAttribute: true,
            transportAttribute: true,
            priceprofiles: true
        }
    }).prepare("findInserat")

    let thisInserat;

    try {
        thisInserat = await findInserat.execute({ inseratId: params?.inseratId })

        if (!thisInserat || !thisInserat.isPublished && thisInserat.userId !== currentUser?.id) {
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
                <script dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag() {
                        dataLayer.push(arguments);
                        }
                    gtag('js', new Date());

                    gtag('config', 'AW-16814367985');
                    `
                }} async>
                    
                </script>
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
                    <div className='md:flex md:flex-row justify-center w-full mt-8'>
                        <div className='h-screen xl:flex hidden items-center w-2/12 '>
                            <div className='w-full xl:block hidden '>
                                <AdsComponent dataAdSlot='3797720061' />
                            </div>
                        </div>
                        {/* Inserat side left */}
                        <div className='md:flex md:flex-row justify-center 3xl:w-6/12 w-full md:space-x-4'>
                            <div className='md:w-7/12 w-full  flex flex-col '>
                                <div>
                                    <BreadCrumbs
                                        thisCategory={thisInserat.category}
                                        thisTitle={thisInserat.title}
                                    />
                                </div>
                                <div>
                                    <InseratShow
                                        thisInserat={thisInserat}
                                        inseratBookings={inseratBookings}
                                        isOwner={thisInserat.user.id === currentUser?.id}
                                    />
                                </div>
                                <div>
                                    <InseratAttributes
                                        thisInserat={thisInserat}
                                    />
                                </div>
                            </div>
                            {/* Inserat side right */}
                            <div className='md:w-4/12 w-full flex flex-col '>
                                <div className='mt-10'>
                                    <InseratOptions
                                        inseratArray={inseratArray}
                                        thisUser={thisInserat.user}
                                        bookings={inseratBookings}
                                        ownUser={currentUser as any}
                                        contactOptions={thisInserat.user.contactOptions}
                                        thisInserat={thisInserat}
                                    />
                                </div>
                                <div className='mt-8'>
                                    <ProfileView
                                        thisUser={thisInserat.user}
                                        inseratArray={inseratArray.length}
                                        inseratOwner={thisInserat.user}
                                        thisBusiness={thisBusiness}
                                    />
                                </div>
                                <div className='mt-8'>
                                    <OtherInserate
                                        thisUser={thisInserat.user}
                                        inserateArray={inseratArray.filter((inserat) => inserat.id !== params.inseratId)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='h-screen xl:flex hidden items-center w-2/12 '>
                            <div className='w-full xl:block hidden '>
                                <AdsComponent dataAdSlot='3797720061' />
                            </div>
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

export default InseratAnzeige;