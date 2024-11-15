'use client'

import { useRouter, useSearchParams } from "next/navigation";
import WholeRender from "./whole-render";
import { inserat, userTable } from "@/db/schema";
import BasicDetails from "./section_1/basic-details";
import { MdPostAdd } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import BasicDetails2 from "./section_2/basic-details2";
import UploadImagesSection from "./section_3/upload-image-section";
import PriceSection from "./section_4/price-section";
import { category } from '../../../../../drizzle/schema';
import TransportSection3 from "./section_8/transport/transport-section-3";
import TransportSection2 from "./section_7/transport/transport-section-2";
import TransportSection from "./section_6/transport/transport-section";
import TrailerSection3 from "./section_8/trailer/trailer-section-3";
import TrailerSection2 from "./section_7/trailer/trailer-section-2";
import TrailerSection from "./section_6/trailer/trailer-section";
import LkwSection3 from "./section_8/lkw/lkw-section-3";
import LkwSection2 from "./section_7/lkw/lkw-section-2";
import LkwSection from "./section_6/lkw/lkw-section";
import PkwSection3 from "./section_8/pkw/pkw-section-3";
import PkwSection2 from "./section_7/pkw/pkw-section-2";
import PkwSection from "./section_6/pkw/pkw-section";
import RahmenSection from "./section_9/rahmen-section";
import TimeSection from "./section_10/time-section";
import ContactSection from "./section_11/contact-section";
import ReleaseSection from "./section_12/release-section";
import WeightSection from "./section_5/weight-section";



interface SectionTabsProps {
    thisInserat: typeof inserat.$inferSelect | any;
    currentUser: typeof userTable.$inferSelect | any;
    thisAddressComponent: any;
    publishedLength: number;
    isPublishable: object
}


const SectionTabs = ({ thisInserat, currentUser, thisAddressComponent, publishedLength, isPublishable }: SectionTabsProps) => {

    const sectionId = useSearchParams().get("sectionId");

    const changeSection = async (value : number) => {
        const params =  new URLSearchParams()
        params.set('sectionId', String(value))
        window.history.pushState(null, '', `?${params.toString()}`)
    }


    
    let firstSegment;
    let secondSegment;
    let thirdSegment


    

        switch(thisInserat?.category) {
            case "PKW":
                firstSegment = <PkwSection pkwAttribute={thisInserat?.pkwAttribute} currentSection={Number(sectionId)} changeSection={changeSection} />;
                secondSegment = <PkwSection2 pkwAttribute={thisInserat?.pkwAttribute} currentSection={Number(sectionId)} changeSection={changeSection} />;
                thirdSegment = <PkwSection3 pkwAttribute={thisInserat?.pkwAttribute} currentSection={Number(sectionId)} changeSection={changeSection} />;
                break;
            case "LKW":
                firstSegment = <LkwSection lkwAttribute={thisInserat?.lkwAttribute} currentSection={Number(sectionId)} changeSection={changeSection} />;
                secondSegment = <LkwSection2 lkwAttribute={thisInserat?.lkwAttribute} currentSection={Number(sectionId)} changeSection={changeSection} />;
                thirdSegment = <LkwSection3 lkwAttribute={thisInserat?.lkwAttribute} currentSection={Number(sectionId)} changeSection={changeSection} />;
                break;
            case "TRAILER":
                firstSegment = <TrailerSection trailerAttribute={thisInserat?.trailerAttribute} currentSection={Number(sectionId)} changeSection={changeSection} />;
                secondSegment = <TrailerSection2 trailerAttributes={thisInserat?.trailerAttribute} currentSection={Number(sectionId)} changeSection={changeSection} />;
                thirdSegment = <TrailerSection3 trailerAttribute={thisInserat?.trailerAttribute} currentSection={Number(sectionId)} changeSection={changeSection}/>;
                break;
            case "TRANSPORT":
                firstSegment = <TransportSection transportAttribute={thisInserat?.transportAttribute} currentSection={Number(sectionId)} changeSection={changeSection} />;
                secondSegment = <TransportSection2 transportAttribute={thisInserat?.transportAttribute} currentSection={Number(sectionId)} changeSection={changeSection} />;
                thirdSegment = <TransportSection3  transportAttribute={thisInserat?.transportAttribute} currentSection={Number(sectionId)} changeSection={changeSection}  />;
                break;
            default:
                firstSegment = 1;
                secondSegment = 2;
        }


    return (
        <div className="sm:p-4  sm:mt-0 mt-2  h-full">
            {
                sectionId ? (
                    <div>
                        <div className="w-full sm:bg-[#222222] px-4 rounded-lg shadow-lg sm:p-4 mt-4 sm:mb-2 sm:block hidden">
                            <h3 className="sm:text-2xl text-lg font-bold flex items-center w-full">
                                <MdPostAdd className="mr-2" />  Inserat erstellen
                               
                            </h3>
                            <p className="text-xs dark:text-gray-100/70 ">
                                Gebe Informationen zu deinem Inserat an - desto genauer du bist, desto eher finden dich potientielle Kunden.
                                Du kannst jederzeit deine Angaben bearbeiten.
                            </p>
                            
                        </div>
                        <div className="text-xs text-gray-200/40 ml-auto flex justify-end md:px-0 px-4">
                            InseratId : {thisInserat?.id}
                        </div>
                        <div className="sm:px-4 px-4 mt-4 min-h-[600px] flex flex-col h-full sm:pb-0 pb-4">
                        {
                            {
                                1: <BasicDetails thisInserat={thisInserat} currentSection={Number(sectionId)} changeSection={changeSection} />,
                                2: <BasicDetails2 thisInserat={thisInserat} currentSection={Number(sectionId)} changeSection={changeSection} />,
                                3 : <UploadImagesSection thisInserat={thisInserat} currentSection={Number(sectionId)} changeSection={changeSection} />,
                                4 : <PriceSection thisInserat={thisInserat} currentSection={Number(sectionId)} changeSection={changeSection} />,
                                5 : <WeightSection thisInserat={thisInserat} currentSection={Number(sectionId)} changeSection={changeSection} />,
                                6 : firstSegment,
                                7 : secondSegment,
                                8 : thirdSegment,
                                9 : <RahmenSection thisInserat={thisInserat} currentSection={Number(sectionId)} changeSection={changeSection} />,
                                10 : <TimeSection thisInserat={thisInserat} currentSection={Number(sectionId)} changeSection={changeSection} />,
                                11 : <ContactSection thisInserat={thisInserat} currentSection={Number(sectionId)} changeSection={changeSection} />,
                                12 : <ReleaseSection thisInserat={thisInserat} currentSection={Number(sectionId)} 
                                changeSection={changeSection} existingSubscription={currentUser?.subscription} publishedLength={publishedLength} />

                            }[sectionId]
                        }
                        </div>
                        
                    </div>
                ) : (
                    <div>
                        <WholeRender
                            thisInserat={thisInserat}
                            currentUser={currentUser}
                            thisAddressComponent={thisAddressComponent}
                            publishedLength={publishedLength}
                            isPublishable={isPublishable} />
                    </div>
                )
            }
        </div>
    );
}

export default SectionTabs;