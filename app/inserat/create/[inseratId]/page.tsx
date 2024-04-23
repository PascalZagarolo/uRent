





import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";

import { Separator } from "@/components/ui/separator";
import BasicInformation from "./_parts/basic-information";
import ContactInformation from "./_parts/contact-information";
import PublishInserat from "../_components/publish-inserat";
import RentPeriod from "../_components/input-fields/rent-period";
import Footer from "@/app/(dashboard)/_components/footer";
import CategoryInformation from "./_parts/category-information";
import ConditionsInformation from "./_parts/conditions-information";
import { MdPostAdd } from "react-icons/md";
import db from "@/db/drizzle";
import { and, count, eq, sql } from "drizzle-orm";
import { address, contactOptions, images, inserat, lkwAttribute, notification, 
    pkwAttribute, trailerAttribute, transportAttribute, userAddress, userTable } from "@/db/schema";
import { Progress } from "@/components/ui/progress";
import { FloatingNav } from "@/components/following-navbar";
import { Button } from "@/components/ui/button";
import SaveChanges from "../_components/save-changes";
import PriceProfiles from "./_parts/price-profiles";
import { redirect } from "next/navigation";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";




const InseratCreation = async ({
    params
}: { params: { inseratId: string } }) => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        redirect("/")
    }

    const currentUserWithContactOptions = await db.query.userTable.findFirst({
        where : eq(userTable.id, currentUser?.id),
        with : {
            contactOptions: {
                with : {
                    userAddress : true
                }
            },
            subscription : true
        }
    })

    

    const foundNotifications = await db.query.notification.findMany({
        where: eq(notification.userId, currentUser?.id)
    
    })

    const countInserate = await db.select({ count : count()})
                            .from(inserat)
                            .where(
                                and(
                                    eq(inserat.userId, currentUser.id),
                                    eq(inserat.isPublished, true)
                                )
                            )

    const findInserat = db.query.inserat.findFirst({
        with: {
            images: true,
            address: true,
            user : true,
            pkwAttribute: true,
            lkwAttribute: true,
            trailerAttribute: true,
            transportAttribute: true,
           
        },
        where: eq(inserat.id, sql.placeholder("inseratId"))
    }).prepare("findInserat");

    

    const thisInserat = await findInserat.execute({ inseratId: params.inseratId })

    if(currentUser?.id !== thisInserat?.userId || !thisInserat) {
        redirect("/")
    }

    const relatedImages = await db.query.images.findMany({
        where: eq(images.inseratId, thisInserat.id)
    })

    const onlyInserat = await db.query.inserat.findFirst({
        where: eq(inserat.id, params.inseratId)
    })

    const thisAddressComponent = await db.query.address.findFirst({
        where: eq(address.id, thisInserat.addressId),
    })

    const isPublishable = {
        title: thisInserat.title.length > 0,
        description: thisInserat.description?.length > 0 || false,
        price: thisInserat.price !== 0 && thisInserat.price,
        images: thisInserat.images?.length > 0,
        date: (thisInserat.end && thisInserat.begin) !== null || thisInserat.annual,
        postalCode: thisInserat.address?.postalCode != null,
        location: thisInserat.address?.locationString != null,
        state: thisInserat.address?.state != null,
    };



    let canPublish = true;

    for (let key in isPublishable) {

        //@ts-ignore
        if (!isPublishable[key]) {
            canPublish = false;
            break;
        }
    }

    return (
        <div className="dark:bg-[#141414]">
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
            <div className="flex justify-center sm:p-8 bg-[#404040]/10 h-full">
                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="min-h-screen">
                        <div className="p-4 ">

                            <div className="flex items-center w-full">

                                <div className="w-full">
                                    <h3 className="sm:text-2xl text-md font-bold flex items-center w-full">
                                        <MdPostAdd className="mr-2" />  Inserat bearbeiten
                                        <div className="ml-auto">
                                    <SaveChanges 
                                    thisInserat={thisInserat}
                                    />
                                </div>
                                    </h3>
                                    <p className="text-xs dark:text-gray-100/70 mt-2">
                                        Gebe Informationen zu deinem Inserat an - desto genauer du bist, desto eher finden dich potientielle Kunden.
                                    </p>
                                </div>
                                
                            </div>
                            <FloatingNav
                                thisInserat={thisInserat}
                            />
                            <div className="mt-4">
                                <div>
                                    <div className="flex justify-evenly items-center">
                                        <Separator
                                            className="sm:w-1/3 sm:block hidden h-[0.5px] dark:bg-gray-100/20"
                                        />
                                        <h1 className="flex justify-center text-lg font-semibold">
                                            Grundlegende Angaben
                                        </h1>
                                        <Separator
                                            className="sm:w-1/3 sm:block hidden h-[0.5px] dark:bg-gray-100/20"
                                        />
                                    </div>
                                    <div className="mt-4">

                                        <BasicInformation
                                            thisInserat={thisInserat}
                                            thisImages={relatedImages}
                                        />

                                    </div>
                                    <div className="mt-4">
                                        <PriceProfiles 
                                        thisInserat={thisInserat}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div>

                                    <div className="mt-4">
                                        <CategoryInformation
                                            thisInserat={thisInserat}
                                        />


                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <div className="flex justify-evenly items-center">
                                        <Separator
                                            className="sm:w-1/3 sm:block hidden h-[0.5px] dark:bg-gray-100/20"
                                        />
                                        <h1 className="flex justify-center text-lg font-semibold">
                                            Rahmenbedingungen
                                        </h1>
                                        <Separator
                                            className="sm:w-1/3 sm:block hidden h-[0.5px] dark:bg-gray-100/20"
                                        />
                                    </div>

                                    <div>

                                    <ConditionsInformation
                                            thisInserat={thisInserat}
                                            thisAddressComponent={thisAddressComponent}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <div className="flex  justify-evenly items-center">
                                        <Separator
                                            className="sm:w-1/3 sm:block hidden h-[0.5px] dark:bg-gray-100/20"
                                        />
                                        <h1 className="flex justify-center text-lg font-semibold">
                                            Zeitraum *
                                        </h1>
                                        <Separator
                                            className="sm:w-1/3 sm:block hidden h-[0.5px] dark:bg-gray-100/20"
                                        />
                                    </div>

                                    <div className="mt-4">

                                        <RentPeriod
                                            thisInserat={thisInserat}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">

                                <div className="flex justify-evenly items-center">
                                    <Separator
                                        className="sm:w-1/3 sm:block hidden h-[0.5px] dark:bg-gray-100/20"
                                    />
                                    <h1 className="flex justify-center text-lg font-semibold">
                                        Kontaktdaten
                                    </h1>
                                    <Separator
                                        className="sm:w-1/3 sm:block hidden h-[0.5px] dark:bg-gray-100/20"
                                    />
                                </div>
                                <p className="text-xs dark:text-gray-200/70 flex justify-center">
                                   * Angegebene Kontaktdaten werden öffentlich im Inserat angezeigt
                                </p>
                                <ContactInformation
                                    thisInserat={thisInserat}
                                    thisAddressComponent={thisAddressComponent}
                                    currentUserWithContactOptions={currentUserWithContactOptions}
                                />

                            </div>
                            <div className="w-full mt-4  flex items-center">

                                <PublishInserat
                                    isPublishable={isPublishable}
                                    thisInserat={thisInserat}
                                    publishedLength={countInserate[0].count}
                                    existingSubscription={currentUserWithContactOptions.subscription}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            <Footer />
            </div>
        </div>




    );
}

export default InseratCreation;