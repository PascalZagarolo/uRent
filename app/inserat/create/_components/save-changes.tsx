'use client'

import { Button } from "@/components/ui/button";
import { inserat } from "@/db/schema";
import { useUnsavedChanges } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface SaveChangesProps {
    thisInserat : typeof inserat.$inferSelect;
}

const SaveChanges: React.FC<SaveChangesProps> = ({
    thisInserat
}) => {

    

    

    const currentChanges = useUnsavedChanges((state) => state.currentChanges);
    const router = useRouter();
    //@ts-ignore
    const priceNumber = parseInt(currentChanges['price']);
//@ts-ignore
    console.log(currentChanges['description'])
    
//@ts-ignore
    const changedTitle = currentChanges['title']?.trim() !== thisInserat?.title && currentChanges['title'] ? true : false;
    //@ts-ignore
    const changedDescription = currentChanges['description']?.trim() !== thisInserat?.description && currentChanges['description']  ? true : false;
    //@ts-ignore
    const changedPrice = currentChanges['price'] !== thisInserat?.price && currentChanges['price'] ? true : false;

    const hasChanged = changedTitle || changedDescription || changedPrice;
    

    useEffect(() => {
        if(!hasChanged) return
        function handleBeforeUnload(event : BeforeUnloadEvent) {
            event.preventDefault();
            return(event.returnValue = '');
        }
        window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });
        
        return() => {
            window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
        }
    },[hasChanged])

    const onSave = async () => {
        try {
            const values = {
                ...(changedTitle) && {
                    //@ts-ignore
                    title : currentChanges['title']?.trim()
                },
                ...(changedDescription) && {
                    //@ts-ignore
                    description : currentChanges['description']?.trim()
                },
                ...(changedPrice) && {
                    //@ts-ignore
                    price : currentChanges['price']?.trim()
                }
            }

            console.log(values)

            await axios.patch(`/api/inserat/${thisInserat.id}`, values)
                .then(() => {
                    toast.success("Änderungen gespeichert");
                    router.refresh();
                })
        } catch {
            console.log("Error");
        }

        
    }
    
    return ( 
        <div className="w-full ml-auto">
            <Button className="dark:bg-[#0F0F0F] hover:bg-[#1c1c1c] text-gray-200 text-xs sm:text-sm" 
            disabled={!changedTitle && !changedDescription && !changedPrice} onClick={onSave}>
                Änderungen speichern
            </Button>
        </div>
     );
}
 
export default SaveChanges;