


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


type Props = {
    params: { inseratId: string }

}

export async function generateMetadata({ params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    try {
        const res = await db.query.inserat.findFirst({
            where: eq(inserat.id, params.inseratId),
        })
        return {
            title: res.title,
            openGraph: {
                description: res.description,
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



    const currentUser = await getCurrentUser();


    const findInserat = db.query.inserat.findFirst({
        where: eq(inserat.id, sql.placeholder("inseratId")),
        with: {
            address: true,
            images: true,
            user: {
                with: {
                    contactOptions: true,
                    subscription : true,
                }
            },
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

    const thisBusiness = await db.query.business.findFirst({
        where: (
            eq(business.userId, inseratOwnerId)
        ),
        with: {
            businessAddresses: true,
        }
    })



    const findInseratBookings = await db.query.booking.findMany({
        where: (
            eq(booking.inseratId, thisInserat.id)
        ),
        with: {
            user: true,

        }, orderBy: (booking, { asc }) => [asc(booking.startDate)]
    }).prepare("inseratBookings")

    const inseratBookings = await findInseratBookings.execute()

    const LazyInseratImageCarousel = lazy(() => import("./_components/inserat-image"));

    function ripOutToLongAddresses(input: string): string {
        const lastCommaIndex = input?.lastIndexOf(',');
        if (lastCommaIndex !== -1) { // Check if comma exists
            return input?.substring(0, lastCommaIndex).trim();
        } else {
            return input; // No comma found, return the original input
        }
    }

    const usedCategory: typeof CategoryEnumRender = thisInserat.category




    return (
        <>
            <head>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9497499351411762"
                    crossOrigin="anonymous"></script>
            </head>
            <div className='flex w-full '>


                <div className='h-screen sm:flex hidden items-center w-2/12'>
                    <div className='w-full sm:block hidden '>
                        <AdsComponent dataAdSlot='3797720061' />
                    </div>
                </div>


                <div className="xl:grid xl:grid-cols-2 sm:w-8/12 w-full  justify-center  xl:mt-12 h-max">

                    <div className="h-full sm:p-4 w-full">
                        <div className="w-full justify-end flex p-2 sm:p-0">
                            <BreadCrumbs
                                thisCategory={thisInserat.category}
                                thisTitle={thisInserat.title}
                            />
                        </div>
                        <div className="flex xl:justify-end justify-center w-full">
                            <InseratShow
                                thisInserat={thisInserat}
                                inseratBookings={inseratBookings}
                            />
                        </div>
                        <div className="flex sm:justify-center xl:justify-end">
                            <div className="flex justify-end xl:ml-auto w-full sm:mt-8">

                                <InseratAttributes
                                    thisInserat={thisInserat}
                                />

                            </div>
                        </div>
                    </div>



                    <div>

                        <div className=" sm:p-2 xl:mt-8  justify-center xl:block">

                            <div className="xl:hidden flex sm:block justify-center">

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
                            <div className="hidden xl:mt-8 xl:block">

                                <ProfileView
                                    thisUser={thisInserat.user}
                                    inseratArray={inseratArray.length}
                                    inseratOwner={thisInserat.user}
                                    thisBusiness={thisBusiness}
                                />

                            </div>
                            <div className="py-8">

                                <OtherInserate
                                    thisUser={thisInserat.user}
                                    inserateArray={inseratArray.filter((inserat) => inserat.id !== params.inseratId)}
                                />

                            </div>
                        </div>

                    </div>

                </div>
                <div className='h-screen sm:flex hidden items-center w-2/12'>
                    <div className=' w-full sm:block hidden'>
                        <AdsComponent dataAdSlot='3797720061' />
                    </div>
                </div>

            </div>
        </>

    );
}

export default InseratAnzeige;