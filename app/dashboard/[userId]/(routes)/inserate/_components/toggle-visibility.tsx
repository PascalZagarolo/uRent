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
    isPublished: boolean;
    onEdit : (value) => void;
}

const ToggleVisibility: React.FC<ToggleVisibilityProps> = ({
    thisInserat,
    isPublishable,
    currentUser,
    isPublished,
    onEdit
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
            if(isLoading) {
                console.log("...")
                return;
            }
            setIsLoading(true);
            onEdit(true);
            await axios.patch(`/api/inserat/${thisInserat.id}/publish`, { publish : true })
                .then(() => {
                    toast.success("Inserat erfolgreich veröffentlicht")

                })
        } catch(e : any) {
            toast.error("Fehler beim Veröffentlichen des Inserats")
            onEdit(thisInserat?.isPublished)
            console.log(e)
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    }

    const onPrivate = async () => {
        try {
            if(isLoading) {
                console.log("...")
                return;
            }
            setIsLoading(true);
            onEdit(false);
            await axios.patch(`/api/inserat/${thisInserat.id}/publish`, { publish : false })
                .then(() => {
                    toast.success("Inserat erfolgreich privat gestellt ")
                    
                })
        } catch(e : any) {
            toast.error("Fehler beim Privat stellen des Inserats")
            onEdit(thisInserat?.isPublished)
            console.log(e)
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    }

    return (
        <div>
            {isPublished ? (
                <div className="text-gray-200 text-xs hover:underline hover:cursor-pointer flex justify-center items-center"  onClick={onPrivate}>
                    <MdLockOutline className="w-4 h-4 md:mr-2" />   <div className="hidden md:block">Privat schalten</div>
                </div>
            ) : (
                canPublish ? (
                    <div className="text-gray-200 text-xs hover:underline hover:cursor-pointer flex justify-center items-center"   onClick={onPublish}>
                        <MdOutlineLockOpen  className="w-4 h-4 md:mr-2" />   <div className="hidden md:block">Veröffentlichen</div>
                    </div>
                ) : (
                    <>
                    </>
                )
            )}
        </div>
    );
}

export default ToggleVisibility;