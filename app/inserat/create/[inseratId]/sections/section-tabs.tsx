'use client'

import { useSearchParams } from "next/navigation";
import WholeRender from "./whole-render";
import { inserat, userTable } from "@/db/schema";
import BasicDetails from "./section_1/basic-details";
import { MdPostAdd } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import BasicDetails2 from "./section_2/basic-details2";
import UploadImagesSection from "./section_3/upload-image-section";
import PriceSection from "./section_4/price-section";
import { category } from '../../../../../drizzle/schema';
import PkwSection from "./section_5/pkw/pkw-section";
import { pkwAttribute } from '../../../../../db/schema';

interface SectionTabsProps {
    thisInserat: typeof inserat.$inferSelect | any;
    currentUser: typeof userTable.$inferSelect | any;
    thisAddressComponent: any;
    publishedLength: number;
    isPublishable: object
}


const SectionTabs = ({ thisInserat, currentUser, thisAddressComponent, publishedLength, isPublishable }: SectionTabsProps) => {

    const sectionId = useSearchParams().get("sectionId");

    const changeSection = (value : number) => {
        const params = new URLSearchParams()
        params.set('sectionId', String(value))
        window.history.pushState(null, '', `?${params.toString()}`)
    }

    let firstSegment;
    let secondSegment;


        switch(thisInserat?.category) {
            case "PKW":
                firstSegment = <PkwSection pkwAttribute={thisInserat?.pkwAttributes} currentSection={Number(sectionId)} changeSection={changeSection} />;
                secondSegment = 2;
                break;
            case "LKW":
                firstSegment = 1;
                secondSegment = 2;
                break;
            case "Anhänger":
                firstSegment = 1;
                secondSegment = 2;
                break;
            case "TRAILER":
                firstSegment = 1;
                secondSegment = 2;
                break;
            default:
                firstSegment = 1;
                secondSegment = 2;
        }


    return (
        <div className="p-4">
            {
                sectionId ? (
                    <div>
                        <div className="w-full bg-[#171717] rounded-t-md shadow-lg p-4 ">
                            <h3 className="sm:text-2xl text-md font-bold flex items-center w-full">
                                <MdPostAdd className="mr-2" />  Inserat erstellen
                               
                            </h3>
                            <p className="text-xs dark:text-gray-100/70 mt-2">
                                Gebe Informationen zu deinem Inserat an - desto genauer du bist, desto eher finden dich potientielle Kunden.
                                Du kannst jederzeit deine Angaben bearbeiten.
                            </p>
                        </div>
                        
                        <div className="px-8 mt-4 min-h-[600px] flex flex-col">
                        {
                            {
                                1: <BasicDetails thisInserat={thisInserat} currentSection={Number(sectionId)} changeSection={changeSection} />,
                                2: <BasicDetails2 thisInserat={thisInserat} currentSection={Number(sectionId)} changeSection={changeSection} />,
                                3 : <UploadImagesSection thisInserat={thisInserat} currentSection={Number(sectionId)} changeSection={changeSection} />,
                                4 : <PriceSection thisInserat={thisInserat} currentSection={Number(sectionId)} changeSection={changeSection} />,
                                5 : firstSegment,
                                6 : secondSegment
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