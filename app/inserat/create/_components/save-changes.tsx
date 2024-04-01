'use client'

import { Button } from "@/components/ui/button";
import { inserat } from "@/db/schema";
import { useUnsavedChanges } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SaveChangesProps {
    thisInserat : typeof inserat.$inferSelect;
}

const SaveChanges: React.FC<SaveChangesProps> = ({
    thisInserat
}) => {

    //TODO : Dialog + Apply Changes...

    

    const currentChanges = useUnsavedChanges((state) => state.currentChanges);
    const router = useRouter();

    console.log(currentChanges['title'])

    const changedTitle = currentChanges['title']?.trim() === thisInserat?.title ? false : true;
    const changedDescription = currentChanges['description'] === thisInserat?.description ? false : true;

    const onSave = async () => {
        
        try {
            const values = {
                ...(changedTitle) && {
                    title : currentChanges['title']
                },
                ...(changedDescription) && {
                    description : currentChanges['description']
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
            <Button className="dark:bg-[#0F0F0F] hover:bg-[#1c1c1c] text-gray-200 text-sm" 
            disabled={!changedTitle && !changedDescription} onClick={onSave}>
                Änderungen speichern
            </Button>
        </div>
     );
}
 
export default SaveChanges;