'use client'

import { useSearchParams } from "next/navigation";
import WholeRender from "./whole-render";
import { inserat, userTable } from "@/db/schema";
import BasicDetails from "./section_1/basic-details";
import { MdPostAdd } from "react-icons/md";
import { Separator } from "@/components/ui/separator";

interface SectionTabsProps {
    thisInserat: typeof inserat.$inferSelect | any;
    currentUser: typeof userTable.$inferSelect | any;
    thisAddressComponent: any;
    publishedLength: number;
    isPublishable: object
}


const SectionTabs = ({ thisInserat, currentUser, thisAddressComponent, publishedLength, isPublishable }: SectionTabsProps) => {

    const sectionId = useSearchParams().get("sectionId");

    return (
        <div className="p-4">
            {
                sectionId ? (
                    <div>
                        <div className="w-full bg-[#171717] rounded-t-md shadow-lg p-4">
                            <h3 className="sm:text-2xl text-md font-bold flex items-center w-full">
                                <MdPostAdd className="mr-2" />  Inserat erstellen
                               
                            </h3>
                            <p className="text-xs dark:text-gray-100/70 mt-2">
                                Gebe Informationen zu deinem Inserat an - desto genauer du bist, desto eher finden dich potientielle Kunden.
                                Du kannst jederzeit deine Angaben bearbeiten.
                            </p>
                        </div>
                        
                        <div className="px-8 mt-4">
                        {
                            {
                                1: <BasicDetails thisInserat={thisInserat}/>,
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