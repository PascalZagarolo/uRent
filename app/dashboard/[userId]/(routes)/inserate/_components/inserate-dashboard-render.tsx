import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Images, Inserat } from "@prisma/client";
import { format } from "date-fns";
import { Edit3, Globe2Icon, Trash2 } from "lucide-react";
import Image from "next/image";

interface InserateDashboardRenderProps {
    inserat : Inserat & { images : Images[]};
}

const InserateDashboardRender: React.FC<InserateDashboardRenderProps> = ({
    inserat
}) => {
    return ( 
        <div className="w-full dark:bg-[#141414] p-4 mt-2">
            <div className="flex">
                <div className="w-[200px] h-[100px]">
                    {inserat.images.length > 0 ? (
                        <Image 
                        alt="Inserat-Bild"
                        src={inserat?.images[0]?.url}
                        width={200}
                        height={100}
                        className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex justify-center items-center dark:bg-[#0F0F0F] text-xs">
                            keine Fotos vorhanden
                        </div>
                    )}
                </div>
                <div className="w-1/4 truncate ml-4 text-sm font-base mr-2">
                    {inserat.title} 
                </div>
                <div className="w-1/6">
                    <p className={cn("text-sm flex items-center", inserat.isPublished ? "text-emerald-600 font-semibold" : "text-gray-100/40")}>
                        {inserat.isPublished ? <> <Globe2Icon className="mr-2 h-4 w-4 text-gray-100/80" /> Veröffentlicht </> : "Entwurf"}
                    </p>
                </div>
                <div className="w-2/6 text-sm text-gray-100/70 flex justify-center">
                        <div>
                        {format(new Date(inserat.createdAt), "dd.MM.yyyy")}
                        <p className="text-gray-100">
                            erstellt am
                        </p>
                        </div>
                </div>
                <div className="justify-center w-1/8 items-center h-full gap-y-2">
                    <Button className="dark:bg-[#1C1C1C] dark:hover:bg-[#252525] dark:text-gray-100 flex text-xs w-full ">
                      <Edit3 className="w-4 h-4 mr-2"/>  Inserat bearbeiten
                    </Button>
                    <Button className="dark:bg-[#1C1C1C] dark:hover:bg-[#252525] dark:text-gray-100 flex text-xs w-full mt-4">
                      <Trash2 className="w-4 h-4 mr-2 text-rose-600"/>  Inserat löschen
                    </Button>
                </div>
            </div>
        </div>
     );
}
 
export default InserateDashboardRender;