import type { Metadata, ResolvingMetadata } from 'next'
import { and, eq, sql } from "drizzle-orm";
import { FaCarCrash } from "react-icons/fa";

// Database
import db from "@/db/drizzle";
import { inserat } from '@/db/schema';

// Actions
import getCurrentUserWithNotificationsAndFavourites from '@/actions/getCurrentUserWithNotificationsAndFavourites';

// Components
import HeaderLogo from '@/app/(dashboard)/_components/header-logo';
import MobileHeader from '@/app/(dashboard)/_components/mobile-header';
import Footer from '@/app/(dashboard)/_components/footer';
import AdsComponent from '@/components/ad-component';
import BreadCrumbs from "./bread-crumbs";
import InseratShow from "./_components/inserat-show";
import InseratAttributes from "./_components/inserat-attributes";
import InseratOptions from "./_components/inserat-options";
import ProfileView from "./_components/profile-view";
import OtherInserate from "./_components/other-inserate";
import RecommendedInserate from './_components/recommended-inserate';

// Types
type Props = {
    params: { inseratId: string }
}

// Metadata Generation
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    try {
        const findInserat = db.query.inserat.findFirst({
            where: eq(inserat.id, params.inseratId),
            with: {
                address: true
            }
        }).prepare("findInserat")

        const res = await findInserat.execute();

        return {
            title: `${res.title} in ${res?.address?.locationString} mieten | Günstig & Verfügbar`,
            openGraph: {
                description: `Jetzt ${res.title} in ${res?.address?.postalCode} ${res?.address?.locationString} mieten. ${res?.description}`,
            },
        }
    } catch (error) {
        return {
            title: "Mieten auf uRent",
            description: "Günstig & schnell auf uRent Fahrzeuge mieten."
        }
    }
}

// Error Component
const NotFoundError = () => (
    <div className="w-full h-dvh flex justify-center items-center">
        <h1 className="text-2xl dark:text-gray-200 font-semibold">
            <FaCarCrash className="w-8 h-8" />
            Error 404 - Inserat nicht gefunden
            <p className="flex justify-center items-center font-medium text-sm">
                Das gesuchte Inserat konnte nicht gefunden werden.
                Entweder wurde es gelöscht, privat gestellt oder hat nie existiert.
            </p>
        </h1>
    </div>
);

// Main Component
const InseratAnzeige = async ({ params }: { params: { inseratId: string } }) => {
    // Fetch current user
    const currentUser = await getCurrentUserWithNotificationsAndFavourites();

    // Prepare DB query
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

    // Fetch inserat data
    let thisInserat;
    try {
        thisInserat = await findInserat.execute({ inseratId: params?.inseratId });

        // Check if inserat exists and is published or belongs to current user
        if (!thisInserat || (!thisInserat.isPublished && thisInserat.userId !== currentUser?.id)) {
            return <NotFoundError />;
        }
    } catch {
        return <NotFoundError />;
    }

    if (!thisInserat) {
        return <NotFoundError />;
    }

    // Fetch other inserate from same user
    const inseratOwnerId = thisInserat.user.id;
    const findInseratArray = db.query.inserat.findMany({
        where: (
            and(
                eq(inserat.userId, sql.placeholder("inseratOwnerId")),
                eq(inserat.isPublished, true)
            )
        ), 
        with: {
            images: true
        }
    }).prepare("findInseratArray");

    const inseratArray = await findInseratArray.execute({ inseratOwnerId });
    const thisBusiness = thisInserat?.user?.business;
    const inseratBookings = thisInserat.bookings;

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

            <div className="bg-[#404040]/10 dark:bg-[#0F0F0F] min-h-screen">
                {/* Header Components */}
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

                {/* Main Content - 4 Column Grid Layout */}
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-12 gap-6">
                        {/* Column 1: Left Ad Space */}
                        <div className="col-span-2 xl:block hidden">
                            <div className="sticky top-8">
                                <AdsComponent dataAdSlot='3797720061' />
                            </div>
                        </div>

                        {/* Column 2: Main Content */}
                        <div className="col-span-12 md:col-span-7 xl:col-span-5 flex flex-col">
                            <div className="mb-6">
                                <BreadCrumbs
                                    thisCategory={thisInserat.category}
                                    thisTitle={thisInserat.title}
                                    inseratId={params.inseratId}
                                />
                            </div>
                            <div className="mb-6">
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

                        {/* Column 3: Sidebar Content */}
                        <div className="col-span-12 md:col-span-5 xl:col-span-3 flex flex-col">
                            <div className="md:mb-2 md:h-[40px] hidden md:block">
                                {/* Empty space to align with breadcrumbs */}
                            </div>
                            <div className="mb-6">
                                <InseratOptions
                                    inseratArray={inseratArray}
                                    thisUser={thisInserat.user}
                                    bookings={inseratBookings}
                                    ownUser={currentUser as any}
                                    contactOptions={thisInserat.user.contactOptions}
                                    thisInserat={thisInserat}
                                />
                            </div>
                            <div className="mb-6">
                                <ProfileView
                                    thisUser={thisInserat.user}
                                    inseratArray={inseratArray.length}
                                    inseratOwner={thisInserat.user}
                                    thisBusiness={thisBusiness}
                                />
                            </div>
                            <div className="mb-6">
                                <OtherInserate
                                    thisUser={thisInserat.user}
                                    inserateArray={inseratArray.filter((inserat : any) => inserat.id !== params.inseratId)}
                                />
                            </div>
                        </div>
                        
                        {/* Column 4: Right Ad Space */}
                        <div className="col-span-2 xl:block hidden">
                            <div className="sticky top-8">
                                <AdsComponent dataAdSlot='3797720061' />
                            </div>
                        </div>

                        {/* Recommended Inserate - Stretched across columns */}
                        <div className="col-span-12 md:col-span-12 xl:col-span-8 xl:col-start-3">
                            <RecommendedInserate 
                                currentCategory={thisInserat.category}
                                currentInseratId={params.inseratId}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}

export default InseratAnzeige;