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
    const priceNumber = parseInt(currentChanges['price']);

    console.log(currentChanges['description'])
    

    const changedTitle = currentChanges['title']?.trim() !== thisInserat?.title && currentChanges['title'] ? true : false;
    const changedDescription = currentChanges['description']?.trim() !== thisInserat?.description && currentChanges['description']  ? true : false;
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
                    title : currentChanges['title']
                },
                ...(changedDescription) && {
                    description : currentChanges['description']
                },
                ...(changedPrice) && {
                    price : currentChanges['price']
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
    console.log(currentChanges['description'])
    return ( 
        <div className="w-full ml-auto">
            <Button className="dark:bg-[#0F0F0F] hover:bg-[#1c1c1c] text-gray-200 text-sm" 
            disabled={!changedTitle && !changedDescription && !changedPrice} onClick={onSave}>
                Änderungen speichern
            </Button>
        </div>
     );
}
 
export default SaveChanges;