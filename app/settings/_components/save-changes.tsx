'use client'


import { Button } from "@/components/ui/button";
import { users } from "@/db/schema";
import { useUnsavedChangesSettings } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";


interface SaveChangesSettingsProps {
    thisUser : typeof users.$inferSelect
}

const SaveChangesSettings: React.FC<SaveChangesSettingsProps> = ({
    thisUser
}) => {


    const currentChanges = useUnsavedChangesSettings((state) => state.currentChanges);
    const router = useRouter();
    
    

    console.log(currentChanges['username'])
    

    const changedUsername = currentChanges['username']?.trim() !== thisUser?.name && currentChanges['username'] ? true : false;
    

    const hasChanged = changedUsername;

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

    const onSubmit = async () => {
        try {
            const values = {
                ...(changedUsername) && {
                    name : currentChanges['username']
                }
                
            } 

            await axios.patch(`/api/profile/${thisUser.id}`, values)
                .then(() => {
                    toast.success("Änderungen erfolgreich gespeichert");
                    router.refresh();
                })
        } catch {
            toast.error("Fehler beim Speichern der Änderungen")
        }
    }

    return ( 
        <div className="">
            <Button className="text-xs dark:bg-[#141414] dark:hover:bg-[#1C1C1C] dark:text-gray-200"
            disabled={!hasChanged}
            onClick={onSubmit}
            >
                Änderungen speichern
            </Button>
        </div>
     );
}
 
export default SaveChangesSettings;