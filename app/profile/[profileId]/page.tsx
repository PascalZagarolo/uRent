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
import Script from "next/script";




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
                inserat: {
                    take: 3,
                    with: {
                        images: {
                            take: 1
                        }
                    }
                }
            }
        });

        if (!res) {
            return {
                title: "Profil nicht gefunden",
                description: "Dieses Profil existiert nicht auf uRent, der Plattform für Fahrzeugvermietung.",
                robots: {
                    index: false,
                    follow: false,
                }
            };
        }

        // Format address properly
        let addressStr = "";
        if (res?.business?.businessAddresses[0]) {
            const address = res.business.businessAddresses[0];
            const addressParts = [
                address.postalCode,
                address.city
            ].filter(Boolean);
            
            if (addressParts.length > 0) {
                addressStr = addressParts.join(", ") + " | ";
            }
        }

        // Create a descriptive title
        const isBusiness = res.isBusiness;
        const siteTitle = res.name;
        
        // Create a rich description focused on vehicle rentals
        let description = "";
        if (isBusiness) {
            description = `Fahrzeuge mieten bei ${res.name} in ${res?.business?.businessAddresses[0]?.city || ''}. `;
            if (res.business?.description) {
                description += res.business.description;
            } else {
                description += `PKW, LKW, Transporter und Anhänger zu günstigen Preisen mieten. Jetzt auf uRent vergleichen und buchen!`;
            }
        } else {
            if (res.description) {
                description = `Fahrzeuge von ${res.name} mieten: ${res.description}`;
            } else {
                description = `Fahrzeuge von ${res.name} auf uRent mieten - Günstige Preise und flexible Mietdauer. Direkt von privat ohne Umwege!`;
            }
        }

        // Limit description length for SEO best practices
        const trimmedDescription = description.length > 160 
            ? description.substring(0, 157) + "..." 
            : description;

        // Get profile image if available
        let images = [];
        if (res.image) {
            images.push(res.image);
        } else if (res.inserat && res.inserat.length > 0 && res.inserat[0].images && res.inserat[0].images.length > 0) {
            images.push(res.inserat[0].images[0].url);
        }

        // Determine user type for keywords
        const userType = isBusiness ? "Autovermietung, Mietwagen, Fahrzeugverleih" : "Privatvermieter, Fahrzeugvermietung";
        const vehicleTypes = "PKW, LKW, Transporter, Anhänger, Mietwagen";
        const keywords = `${res.name}, ${userType}, ${vehicleTypes}, ${isBusiness && res.business?.businessAddresses[0]?.city ? res.business.businessAddresses[0].city : ""}, uRent`;

        return {
            title: siteTitle,
            description: trimmedDescription,
            keywords: keywords,
            openGraph: {
                title: siteTitle,
                description: trimmedDescription,
                type: isBusiness ? "website" : "profile",
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${params.profileId}`,
                images: images.length > 0 ? images : undefined,
            },
            twitter: {
                card: "summary_large_image",
                title: siteTitle,
                description: trimmedDescription,
                images: images.length > 0 ? images : undefined,
            },
            alternates: {
                canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${params.profileId}`,
            },
            robots: {
                index: true,
                follow: true,
            },
            other: {
                'application-name': 'uRent',
            }
        };
    } catch (error) {
        return {
            title: "uRent",
            description: "Mieten Sie Fahrzeuge oder vermieten Sie Ihre eigenen auf uRent - der Plattform für private und gewerbliche Fahrzeugvermietung.",
            robots: {
                index: false,
                follow: true,
            }
        };
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


    



    // Generate structured data for SEO
    const structuredData = thisUser ? {
        '@context': 'https://schema.org',
        '@type': thisUser.isBusiness ? 'AutoRental' : 'Person',
        name: thisUser.name,
        description: thisUser.isBusiness 
            ? `Fahrzeuge mieten bei ${thisUser.name} in ${thisUser.business?.businessAddresses[0]?.city || ''}. ${thisUser.business?.description || 'PKW, LKW, Transporter und Anhänger zu günstigen Preisen mieten.'}` 
            : `Fahrzeuge von ${thisUser.name} auf uRent mieten - ${thisUser.description || 'Günstige Preise und flexible Mietdauer. Direkt von privat ohne Umwege!'}`,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${params.profileId}`,
        ...(thisUser.image && { image: thisUser.image }),
        ...(thisUser.isBusiness && thisUser.business?.businessAddresses[0] && {
            address: {
                '@type': 'PostalAddress',
                streetAddress: thisUser.business.businessAddresses[0].street,
                postalCode: thisUser.business.businessAddresses[0].postalCode,
                addressLocality: thisUser.business.businessAddresses[0].city,
                addressCountry: 'DE'
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: thisUser.business.businessAddresses[0].latitude,
                longitude: thisUser.business.businessAddresses[0].longitude
            }
        }),
        ...(thisUser.isBusiness && { 
            priceRange: '€€',
            // Add business category
            '@id': `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${params.profileId}`,
            areaServed: thisUser.business?.businessAddresses[0]?.city || 'Deutschland',
            // Add business hours if available
            ...(thisUser.business?.openingTimes && thisUser.business.openingTimes.length > 0 && {
                openingHoursSpecification: thisUser.business.openingTimes.map(time => ({
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: time.day,
                    opens: time.openTime,
                    closes: time.closeTime
                }))
            }),
            // Add vehicle offerings based on inserate
            ...(thisUser.inserat && thisUser.inserat.length > 0 && {
                makesOffer: thisUser.inserat.map(item => ({
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Vehicle',
                        name: item.title,
                        description: item.description,
                        vehicleConfiguration: item.category || 'Fahrzeug',
                    },
                    ...(item.images && item.images.length > 0 && { image: item.images[0].url })
                }))
            })
        }),
        ...(thisUser.contactOptions && thisUser.contactOptions[0]?.phoneNumber && { 
            telephone: thisUser.contactOptions[0].phoneNumber 
        }),
        ...(thisUser.contactOptions && thisUser.contactOptions[0]?.email && { 
            email: thisUser.contactOptions[0].email 
        })
    } : null;


    return (
        <>
<head>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9497499351411762" //@ts-ignore
     crossorigin="anonymous"></script>
</head>
        <div className="bg-[#12121a] min-h-screen">
            {/* Header */}
            <div className="relative top-0 w-full z-50 border-b border-indigo-800/20 bg-[#16161f]/95 backdrop-blur-sm">
                <HeaderLogo currentUser={currentUser} foundNotifications={currentUser?.notifications} />
                <div className="sm:hidden">
                    <MobileHeader currentUser={currentUser} foundNotifications={currentUser?.notifications} />
                </div>
            </div>

            {/* Main Section */}
            <div className="max-w-[1044px] mx-auto py-8 px-4">
                <div className="bg-gradient-to-b from-[#16161f] to-[#1a1a24] rounded-xl overflow-hidden shadow-xl border border-indigo-900/30">
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
                                    <div className="bg-indigo-600/20 p-3 rounded-lg">
                                        <FaCarCrash className="w-8 h-8 text-indigo-400" />
                                    </div>
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
            <div className="mt-8 border-t border-indigo-800/20">
                <Footer />
            </div>

            {/* Add structured data JSON-LD */}
            {structuredData && (
                <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
                    {JSON.stringify(structuredData)}
                </Script>
            )}
        </div>
        </>

    );
}

export default ProfilePage;