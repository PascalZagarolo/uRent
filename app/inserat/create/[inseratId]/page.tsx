





import HeaderLogo from "@/app/(dashboard)/_components/header-logo";

import Footer from "@/app/(dashboard)/_components/footer";

import db from "@/db/drizzle";
import { and, count, eq, sql } from "drizzle-orm";
import {
    inserat,

} from "@/db/schema";

import { redirect } from "next/navigation";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";
import SelectMinTime from "../_components/input-fields/select-min-time";

import getCurrentUserInseratPage from "@/actions/inserat/getCurrentUserInseratPage";
import SectionTabs from "./sections/section-tabs";





const InseratCreation = async ({
    params
}: { params: { inseratId: string } }) => {

    const currentUser = await getCurrentUserInseratPage();

    if (!currentUser) {
        redirect("/")
    }







    const countInserate = await db.select({ count: count() })
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
            user: {
                with: {
                    business: {
                        with: {
                            businessAddresses: true
                        }
                    },
                    userContactprofiles: true,
                    subscription: true
                },

            },
            pkwAttribute: true,
            lkwAttribute: true,
            trailerAttribute: true,
            transportAttribute: true,
            priceprofiles: true,


        },
        where: eq(inserat.id, sql.placeholder("inseratId"))
    }).prepare("findInserat");



    const thisInserat = await findInserat.execute({ inseratId: params.inseratId })



    if (currentUser?.id !== thisInserat?.userId || !thisInserat) {
        redirect("/")
    }







    const isPublishable = {
        title: thisInserat.title.length > 0,
        description: thisInserat.description?.length > 0 || false,
        price: thisInserat.price !== 0 && thisInserat.price,
        images: thisInserat.images?.length > 0,
        postalCode: thisInserat.address?.postalCode != null,
        location: thisInserat.address?.locationString != null,

    };





    return (
        <>
            <head>
                <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_CLOUD_SECRET}&libraries=places&callback=initMap`} async>
                </script>
            </head>
            <div className="dark:bg-[#141414]">
                <div className="relative top-0 w-full z-50">
                    <HeaderLogo
                        currentUser={currentUser}
                        foundNotifications={currentUser?.notifications}
                    />
                </div>
                <div className="sm:hidden">
                    <MobileHeader
                        currentUser={currentUser}
                        foundNotifications={currentUser?.notifications}
                    />
                </div>
                <div className="flex justify-center sm:p-8 bg-[#404040]/10 sm:min-h-screen ">
                    <div className="sm:w-[1044px] w-full  rounded-md ">
                        <div className="dark:bg-[#1c1c1c]">
                            <SectionTabs
                                thisInserat={thisInserat}
                                currentUser={currentUser}
                                thisAddressComponent={thisInserat?.address}
                                publishedLength={countInserate[0].count}
                                isPublishable={isPublishable}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-auto">
                    <Footer />
                </div>
            </div>
        </>



    );
}

export default InseratCreation;