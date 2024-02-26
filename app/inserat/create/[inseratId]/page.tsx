
import CreationHeader from "../_components/creation-header";
import InseratBodyLeft from "../_components/inserat-body-left";
import { db } from "@/utils/db";
import InseratBodyRight from "../_components/input-fields/inserat-body-right";

import MoreDetails from "../_components/more-details";
import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";
import { ShellIcon, Signpost } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import BasicInformation from "./_parts/basic-information";
import ContactInformation from "./_parts/contact-information";
import PublishInserat from "../_components/publish-inserat";
import RentPeriod from "../_components/input-fields/rent-period";


const InseratCreation = async ({
    params
}: { params: { inseratId: string } }) => {

    const inserat = await db.inserat.findUnique({
        where: {
            id: params.inseratId
        }, include: {
            images: true,
            address: true,
            user: true
        }
    })

    const currentUser = await getCurrentUser();

    const notifications = await db.notification.findMany({
        where: {
            userId: currentUser.id
        }
    })

    const images = await db.images.findMany({
        where :{
            inseratId : inserat.id
        }
    })

    const addressComponent = await db.address.findUnique({
        where :{
            inseratId : inserat.id
        }
    })

    const isPublishable = {
        title : inserat.title.length > 0,
        description : inserat.description?.length > 0 || false,
        price : inserat.price !== 0,
        images : inserat.images.length > 0,
        date : (inserat.end && inserat.begin) !== null || inserat.annual,
        postalCode : inserat.address?.postalCode !== null,
        location : inserat.address?.locationString !== null,
    };

    let canPublish = true;
    
    for(let key in isPublishable) {
        if(!isPublishable[key]) {
            canPublish = false;
            break;
        }
    }

    return (
        <div className="dark:bg-[#141414]">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    notifications={notifications} />
            </div>
            <div className="flex justify-center p-8 bg-[#404040]/10 h-full">
                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="min-h-screen">
                        <div className="p-4">
                            <h3 className="text-2xl font-bold flex">
                              <Signpost className="mr-2"/>  Inserat bearbeiten
                            </h3>
                            <p className="text-sm dark:text-gray-100/70">
                                Gebe Informationen zu deinem Inserat an - desto genauer du bist, desto eher finden dich potientielle Kunden.
                            </p>

                            <div className="mt-4">
                                <div>
                                    <div className="flex justify-evenly items-center">
                                        <Separator 
                                        className="w-1/3 h-[0.5px] dark:bg-gray-100/20"
                                        />
                                        <h1 className="flex justify-center text-lg font-semibold">
                                            Grundlegende Angaben
                                        </h1>
                                        <Separator 
                                        className="w-1/3 h-[0.5px] dark:bg-gray-100/20"
                                        />
                                     </div>
                                     <div>
                                        <BasicInformation
                                        inserat={inserat}
                                        images = {images}
                                        />
                                     </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div>
                                    <div className="flex justify-evenly items-center">
                                        <Separator 
                                        className="w-1/3 h-[0.5px] dark:bg-gray-100/20"
                                        />
                                        <h1 className="flex justify-center text-lg font-semibold">
                                            Zeitraum
                                        </h1>
                                        <Separator 
                                        className="w-1/3 h-[0.5px] dark:bg-gray-100/20"
                                        />
                                     </div>
                                     <div className="mt-4">
                                        <RentPeriod
                                        inserat={inserat}
                                        />
                                     </div>
                                     
                                </div>
                            </div>

                            <div className="mt-4">
                                <div>
                                    <div className="flex justify-evenly items-center">
                                        <Separator 
                                        className="w-1/3 h-[0.5px] dark:bg-gray-100/20"
                                        />
                                        <h1 className="flex justify-center text-lg font-semibold">
                                            Kontaktinformationen
                                        </h1>
                                        <Separator 
                                        className="w-1/3 h-[0.5px] dark:bg-gray-100/20"
                                        />
                                     </div>
                                     <div>
                                        <ContactInformation
                                        inserat={inserat}
                                        addressComponent={addressComponent}
                                        />
                                     </div>
                                </div>
                            </div>

                                <div className="w-full mt-4  flex items-center">
                                    <PublishInserat
                                    isPublishable={isPublishable}
                                    inserat={inserat}
                                    />
                                </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>




    );
}

export default InseratCreation;