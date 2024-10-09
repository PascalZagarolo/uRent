





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
import {
    address, businessAddress, contactOptions, images, inserat, lkwAttribute, notification,
    pkwAttribute, priceprofile, trailerAttribute, transportAttribute, userAddress, userTable
} from "@/db/schema";
import { Progress } from "@/components/ui/progress";
import { FloatingNav } from "@/components/following-navbar";
import { Button } from "@/components/ui/button";
import SaveChanges from "../_components/save-changes";
import PriceProfiles from "./_parts/price-profiles";
import { redirect } from "next/navigation";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";
import SelectMinTime from "../_components/input-fields/select-min-time";
import { userContactprofiles } from '../../../../db/schema';
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
                    subscription : true
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
                    foundNotifications={currentUser?.notifications}
                />
            </div>
            <div className="sm:hidden">
                 <MobileHeader
                    currentUser={currentUser}
                    foundNotifications={currentUser?.notifications}
                /> 
            </div> 
            <div className="flex justify-center sm:p-8 bg-[#404040]/10 sm:min-h-screen">
                <div className="sm:w-[1044px] w-full dark:bg-[#191919] rounded-md ">
                    <div className="dark:bg-[#1c1c1c]">
                        <SectionTabs 
                        thisInserat={thisInserat}
                        currentUser={currentUser}
                        thisAddressComponent={thisAddressComponent}
                        publishedLength={countInserate.length}
                        isPublishable={isPublishable}
                        />
                    </div>
                </div>
            </div>
            <div className="">
                <Footer />
            </div>
        </div>




    );
}

export default InseratCreation;