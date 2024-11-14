import { Separator } from "@/components/ui/separator";
import PublishInserat from "../../_components/publish-inserat";
import ContactInformation from "../_parts/contact-information";
import SelectMinTime from "../../_components/input-fields/select-min-time";

import ConditionsInformation from "../_parts/conditions-information";
import CategoryInformation from "../_parts/category-information";
import PriceProfiles from "../_parts/price-profiles";
import BasicInformation from "../_parts/basic-information";
import { FloatingNav } from "@/components/following-navbar";
import { MdPostAdd } from "react-icons/md";
import SaveChanges from "../../_components/save-changes";
import { inserat, userTable } from "@/db/schema";
import SwitchCreation from "./_components/switch-creation";
import Warning from "../../_components/warning";
import WeightInformation from "../_parts/weight-information";


interface WholeRenderProps {
    thisInserat : typeof inserat.$inferSelect | any;
    currentUser : typeof userTable.$inferSelect | any;
    thisAddressComponent : any;
    publishedLength : number;
    isPublishable : object
}

const WholeRender = ({ thisInserat, currentUser, thisAddressComponent, publishedLength, isPublishable } : WholeRenderProps) => {
    return (
        <div>
            <div className="min-h-screen">
                <div className="p-4 ">

                    <div className="flex items-center w-full">

                        <div className="w-full">
                            <div className="w-full flex justify-end ml-auto">
                                <SwitchCreation />
                            </div>
                            <div className="mt-8">
                                <Warning />
                            </div>
                            <h3 className="sm:text-2xl text-md font-bold flex items-center w-full mt-8">
                                <MdPostAdd className="mr-2" />  Inserat bearbeiten
                                {/* <div className="ml-auto">
                                    <SaveChanges
                                        thisInserat={thisInserat as any}
                                    />
                                </div> */}
                            </h3>
                            <p className="text-xs dark:text-gray-100/70 mt-2">
                                Gebe Informationen zu deinem Inserat an - desto genauer du bist, desto eher finden dich potientielle Kunden.
                            </p>
                        </div>

                    </div>
                    <FloatingNav
                        thisInserat={thisInserat}
                    />
                    <div className="mt-8">
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
                            <div className="mt-8">

                                <BasicInformation
                                    thisInserat={thisInserat}
                                    thisImages={thisInserat?.images}
                                    currentUser={currentUser}
                                />

                            </div>
                            <div className="mt-8">
                                <PriceProfiles
                                    thisInserat={thisInserat}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                            <WeightInformation 
                            thisInserat={thisInserat}
                            />
                    </div>
                    <div className="mt-8">
                                <CategoryInformation
                                    thisInserat={thisInserat}
                                /> 
                    </div>
                    <div className="mt-8">
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
                    <div className="mt-8">
                        <div>
                            <div className="flex  justify-evenly items-center">
                                <Separator
                                    className="sm:w-1/3 sm:block hidden h-[0.5px] dark:bg-gray-100/20"
                                />
                                <h1 className="flex justify-center text-lg font-semibold">
                                    Zeitraum
                                </h1>
                                <Separator
                                    className="sm:w-1/3 sm:block hidden h-[0.5px] dark:bg-gray-100/20"
                                />
                            </div>
                            <p className="text-xs dark:text-gray-200/60 flex justify-center">
                                Du kannst nach dem Veröffentlichen die Verfügbarkeit deines Inserats jederzeit in deinem Dashboard anpassen.
                            </p>
                            <div className="mt-8">

                                {/* <RentPeriod
                                    thisInserat={thisInserat}
                                /> */}

                            </div>
                            <div className="mt-8">
                                <SelectMinTime
                                    thisInserat={thisInserat as any} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">

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
                            currentUserWithContactOptions={currentUser}
                        />

                    </div>
                    <div className="w-full mt-8  flex items-center">

                        <PublishInserat
                            isPublishable={isPublishable}
                            thisInserat={thisInserat}
                            publishedLength={publishedLength}
                            existingSubscription={currentUser.subscription}
                        />

                    </div>
                </div>
                <div className="text-xs text-gray-200/40 ml-auto flex justify-end ">
                            InseratId : {thisInserat?.id}
                        </div>
            </div>
        </div>
    );
}

export default WholeRender;