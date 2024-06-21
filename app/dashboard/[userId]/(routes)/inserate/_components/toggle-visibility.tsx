'use client'

import { Button } from "@/components/ui/button";
import { inserat } from "@/db/schema";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { MdLockOutline, MdOutlineLockOpen } from "react-icons/md";

interface ToggleVisibilityProps {

    thisInserat: typeof inserat.$inferSelect;
    isPublishable: Object;
    currentUser: any;
}

const ToggleVisibility: React.FC<ToggleVisibilityProps> = ({
    thisInserat,
    isPublishable,
    currentUser
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const areAllValuesTrue = (obj: any): boolean => {
        return Object.entries(obj).every(([key, value]) => {
            if (key === "price") {
                return value !== undefined;
            }
            return value === true;
        });
    }

    const currentDate = new Date();

    const publicInserate = currentUser?.inserat.filter(inserat => inserat.isPublished);

    const matchingConditions = (currentUser?.subscription && 
        currentUser?.subscription?.stripe_current_period_end > currentDate 
    && currentUser?.subscription?.amount > publicInserate?.length) ? true : false

    const canPublish = areAllValuesTrue(isPublishable) && matchingConditions;

    

    const onPublish = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/inserat/${thisInserat.id}/publish`, { publish : true })
                .then(() => {
                    toast.success("Inserat erfolgreich veröffentlicht")
                    router.refresh();
                })
        } catch(e : any) {
            toast.error("Fehler beim Veröffentlichen des Inserats")
            console.log(e)
        } finally {
            setIsLoading(false);
        }
    }

    const onPrivate = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/inserat/${thisInserat.id}/publish`, { publish : false })
                .then(() => {
                    toast.success("Inserat erfolgreich privat gestellt ")
                    router.refresh();
                })
        } catch(e : any) {
            toast.error("Fehler beim Privat stellen des Inserats")
            console.log(e)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            {thisInserat?.isPublished ? (
                <div className="text-gray-200 text-xs hover:underline hover:cursor-pointer flex justify-center items-center"  onClick={onPrivate}>
                    <MdLockOutline className="w-4 h-4 md:mr-2" />   <div className="hidden md:block">Privat schalten</div>
                </div>
            ) : (
                canPublish ? (
                    <Button className="text-gray-200 text-xs" size="sm" variant="ghost" onClick={onPublish}>
                        <MdOutlineLockOpen  className="w-4 h-4 md:mr-2" />   <div className="hidden md:block">Veröffentlichen</div>
                    </Button>
                ) : (
                    <></>
                )
            )}
        </div>
    );
}

export default ToggleVisibility;