'use client';

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { inserat } from "@/db/schema";

interface PublishInseratProps {
    
    
    isPublishable : object;
    thisInserat : typeof inserat.$inferSelect;
}

const PublishInserat: React.FC<PublishInseratProps> = ({
    isPublishable,
    thisInserat
}) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    

    const onPublish = () => {
        try {
            setIsLoading(true);
            axios.patch(`/api/inserat/${thisInserat.id}/publish` , { publish : true });
            toast.success("Anzeige erfolgreich veröffentlicht");
            router.push('/')
        } catch {
            toast.error("Etwas ist schief gelaufen...")
        } finally {
            setIsLoading(false);
        }
    }

    const onPrivate = () => {
        try {
            setIsLoading(true);
            axios.patch(`/api/inserat/${thisInserat.id}/publish` , { publish : false} );
            toast.success("Anzeige erfolgreich privat gestellt");
            setTimeout(() => {
                router.refresh();
            }, 500)
        } catch {
            toast.error("Etwas ist schief gelaufen...")
        } finally {
            setIsLoading(false);
        }
    }

    const firstUpdate = useRef(true);
    const firstUpdate2 = useRef(true);

    let canPublish = true;

    for (let key in isPublishable) {
        if (!isPublishable[key]) {
          canPublish = false;
          break;
        }
      }


    useEffect(() => {
        if(thisInserat.images.length === 0 && !firstUpdate.current && thisInserat.isPublished) {  
            onPrivate();
        }

        if(firstUpdate.current) {   
            firstUpdate.current = false;
        }
    },[thisInserat.images.length])

    useEffect(() => {
        for (let key in isPublishable) {
            if (!isPublishable[key]) {
              canPublish = false;
              break;
            }
          }

          if(!firstUpdate2.current) {
            setTimeout(() => {
                firstUpdate2.current = true;
            }, 100)
            router.refresh();
          }

          if(firstUpdate2.current) {
            
            firstUpdate2.current = false; 
        }

          
    }, [isPublishable])

    

    return ( 
        <div className="w-full mt-auto">
            <p className="flex justify-center text-xs dark:text-gray-100/80  text-gray-900/50"> Pflichtfelder sind mit einem  *  markiert.</p>
            {!thisInserat.isPublished   ? (
            <Button variant="ghost" size="sm" className="dark:bg-green-700 hover:dark:bg-green-600 w-full"disabled={!canPublish} onClick={onPublish}>
                Anzeige veröffentlichen
            </Button>
        ) : (
            <Button variant="ghost" size="sm" className="dark:bg-blue-800 hover:dark:bg-blue-700 w-full" onClick={onPrivate}>
                Anzeige privat schalten
            </Button>
        )}
        
        </div>
     );
}
 
export default PublishInserat;