'use client';

import { Button } from "@/components/ui/button";
import { Inserat } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface PublishInseratProps {
    
    
    isPublishable : boolean;
    inserat : Inserat;
}

const PublishInserat: React.FC<PublishInseratProps> = ({
    isPublishable,
    inserat
}) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onPublish = () => {
        try {
            setIsLoading(true);
            axios.patch(`/api/inserat/${inserat.id}/publish` , { publish : true });
            toast.success("Anzeige erfolgreich veröffentlicht");
        } catch {
            toast.error("Etwas ist schief gelaufen...")
        } finally {
            setIsLoading(false);
        }
    }

    const onPrivate = () => {
        try {
            setIsLoading(true);
            axios.patch(`/api/inserat/${inserat.id}/publish` , { publish : false} );
            toast.success("Anzeige erfolgreich privat gestellt");
            setTimeout(() => {
                router.refresh();
            }, 1000)
        } catch {
            toast.error("Etwas ist schief gelaufen...")
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <div>
            {!inserat.isPublished   ? (
            <Button variant="ghost" size="sm" disabled={!isPublishable} onClick={onPublish}>
                Anzeige veröffentlichen
            </Button>
        ) : (
            <Button variant="ghost" size="sm" onClick={onPrivate}>
                Anzeige privat schalten
            </Button>
        )}
        </div>
     );
}
 
export default PublishInserat;