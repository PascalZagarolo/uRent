'use client';

import InserateDashboardRender from "./inserate-dashboard-render";
import { useMemo, useState } from "react";
import { inserat } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { useDebounce } from "@/components/multiple-selector";
import { Label } from "@/components/ui/label";

interface InserateRenderListProps {
    inserateArray: typeof inserat.$inferSelect;
    
}

const InserateRenderList: React.FC<InserateRenderListProps> = ({
    inserateArray,
    
}) => {

    //use RenderAmount to render only 5 Inserate, if pressed "Mehr Anzeigen" => increase amount by 5 and so on...
    const [renderAmount, setRenderAmount] = useState(5);
    const [renderedInserate, setRenderedInserate] = useState(inserateArray);
    const [title, setTitle] = useState("");

    const debouncedValue = useDebounce(title, 500);

    
        useMemo(() => {
            if(!title) {
                setRenderedInserate(inserateArray)
            } else {
                //@ts-ignore
                const filteredInserate = inserateArray.filter((inserat) => {
                    return inserat.title.toLowerCase().includes(title.toLowerCase())
                
                })
                setRenderedInserate(filteredInserate)
            }
        }, [debouncedValue])
        
   

    return (
        <div>
            <div className="flex items-center w-full">
                <Input 
                onChange={(e) => setTitle(e.target.value)}
                 className="dark:border-none dark:bg-[#141414] w-1/3 rounded-r-none"
                 value={title}
                 placeholder="Suche nach Inseraten..."
                />
                <div className="dark:bg-[#141414] p-3 rounded-r-md dark:hover:bg-[#191919] hover:cursor-pointer"
                
                >
                    <SearchIcon className="w-4 h-4 " />
                </div>
                <div className="ml-auto">
                    <Label className="dark:text-gray-200/60 text-xs hover:underline hover:cursor-pointer flex items-center" 
                    onClick={() => {setTitle("")}}>
                      <X className="w-4 h-4 mr-2" />  Filter löschen
                    </Label>
                </div>
            </div>
            <div className="text-xs mt-2 dark:text-gray-200/60">
                {renderedInserate.length} {renderedInserate.length === 1 ? "Inserat" : "Inserate"} gefunden..
            </div>
            <div>
            {renderedInserate.slice(0, renderAmount).map((inserat : any) => (
                renderedInserate.length > 0 && (
                    
                        <InserateDashboardRender
                            thisInserat={inserat}
                            
                            key={inserat.id}
                        />
                    


                )
            ))}
            {renderedInserate.length === 0 && (
                <div className="mt-8 text-sm dark:text-gray-200/60 w-full flex justify-center">
                    Keine passenden Inserate vorhanden..
                </div>    
            )}
            {renderedInserate.length > 5 && (
                <p className="mt-2 text-xs  underline hover:cursor-pointer" onClick={() => { setRenderAmount(renderAmount + 5) }}>
                    Mehr anzeigen...
                </p>
            )}
            </div>
        </div>
    );
}

export default InserateRenderList;