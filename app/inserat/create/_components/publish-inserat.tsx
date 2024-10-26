'use client';

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { inserat } from "@/db/schema";
import qs from "query-string"
import { ClipboardCopy, Link2 } from "lucide-react";

interface PublishInseratProps {
    publishedLength: number;
    existingSubscription: typeof inserat.$inferSelect;
    isPublishable: object;
    thisInserat: typeof inserat.$inferSelect;
}

const PublishInserat: React.FC<PublishInseratProps> = ({
    isPublishable,
    thisInserat,
    publishedLength,
    existingSubscription
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const currentDate = new Date();


    const expirationDate = new Date(existingSubscription?.stripe_current_period_end);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`www.urent-rental.de/inserat/${thisInserat?.id}`);
        toast.success("Link wurde in die Zwischenablage kopiert.");
    }


    const onPublish = () => {
        try {
            if (
                expirationDate < currentDate || publishedLength >= existingSubscription?.amount || !existingSubscription
            ) {

                const url = qs.stringifyUrl({
                    url: "/pricing",
                    query: {
                        inseratId: thisInserat.id
                    }
                }, { skipEmptyString: true, skipNull: true })

                router.push(url)
            } else {
                setIsLoading(true);
                axios.patch(`/api/inserat/${thisInserat.id}/publish`, { publish: true });
                toast.success("Anzeige erfolgreich veröffentlicht");
                router.push(`/inserat/${thisInserat.id}`)
            }
        } catch {
            toast.error("Etwas ist schief gelaufen...")
        } finally {
            setIsLoading(false);
        }
    }

    const onPrivate = () => {
        try {
            setIsLoading(true);
            axios.patch(`/api/inserat/${thisInserat.id}/publish`, { publish: false });
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
        //@ts-ignore
        if (!isPublishable[key]) {
            canPublish = false;
            break;
        }
    }


    useEffect(() => {
        if (thisInserat.images.length === 0 && !firstUpdate.current && thisInserat.isPublished) {
            onPrivate();
        }

        if (firstUpdate.current) {
            firstUpdate.current = false;
        }
    }, [thisInserat.images.length])

    useEffect(() => {
        for (let key in isPublishable) {
            //@ts-ignore
            if (!isPublishable[key]) {
                canPublish = false;
                break;
            }
        }

        if (!firstUpdate2.current) {
            setTimeout(() => {
                firstUpdate2.current = true;
            }, 100)
            router.refresh();
        }

        if (firstUpdate2.current) {

            firstUpdate2.current = false;
        }


    }, [isPublishable])



    return (
        <div className="w-full mt-auto">
            <div className="flex flex-col items-center  ">
                <a className="hover:underline flex flex-row items-center text-sm text-gray-200 mt-4" href={`/inserat/${thisInserat?.id}`} target="_blank" rel="noReferrer">
                    <Link2 className="w-4 h-4 mr-2" /> Zu deiner Inserats-Vorschau
                </a>
                <span className="text-xs text-gray-200/60 flex flex-row items-center hover:underline hover:text-gray-200/80" onClick={copyToClipboard}>
                    <ClipboardCopy className="w-4 h-4 mr-2 text-gray-200 hover:cursor-pointer" /> www.urent-rental.de/inserat/{thisInserat?.id}
                </span>
            </div>
            <p className="flex justify-center text-xs dark:text-gray-100/80  text-gray-900/50 mt-4"> Pflichtfelder sind mit einem  *  markiert.</p>
            {!thisInserat.isPublished ? (
                <Button variant="ghost" size="sm" className="dark:bg-green-700 hover:dark:bg-green-600 w-full"
                    disabled={!canPublish} onClick={onPublish}>
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