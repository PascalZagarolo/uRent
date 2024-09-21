import { inserat } from "@/db/schema";
import { format } from "date-fns";
import { useState } from "react";

interface LatestInserateProps {
    foundInserate: typeof inserat.$inferSelect[] | any[];
}


const LatestInserate = ({ foundInserate }: LatestInserateProps) => {

    const [latestInserate, setLatestInserate] = useState(
        foundInserate?.sort((a, b) => {
            return new Date(b.firstRelease).getTime() - new Date(a.firstRelease).getTime();
        }).slice(0, 3)
    );

    const renderLatest = (thisInserat: typeof inserat.$inferSelect) => {
        return (
            <div className="bg-[#141414] p-2 rounded-md">
                <div className="text-sm text-gray-200/60">
                    {format(new Date(thisInserat?.firstRelease), "dd.MM.yyyy")}
                </div>
                <div className="flex flex-row items-center">   
                    <div className="w-1/4 text-sm font-semibold">
                        {
                            {
                                "PKW" : "(PKW)",
                                "LKW" : "(LKW)",
                                "TRANSPORT" : "(Transporter)",
                                "TRAILER" : "(Anhänger)"
                            }[thisInserat?.category]
                        }
                    </div>
                    <a className="text-sm w-3/4 line-clamp-1 break-all hover:underline text-gray-200/90" 
                    href={`/inserat/${thisInserat?.id}`}
                    target="_blank" rel="noreferrer"
                    >
                        {thisInserat?.title}
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <div>
                <h2 className="text-lg font-semibold">
                    Deine letzten Veröffentlichungen
                </h2>
            </div>
            <div className="space-y-4">
                {
                    latestInserate?.length > 0 ? (
                        latestInserate?.map((inserat) => (
                            renderLatest(inserat)
                        ))
                    ) : (
                        <div className="text-sm text-gray-200/60">
                            Noch keine Inserate veröffentlicht..
                        </div>
                    )

                }
            </div>
        </div>
    );
}

export default LatestInserate;