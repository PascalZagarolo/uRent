import { Button } from "@/components/ui/button";
import { inserat } from "@/db/schema";
import { user } from "@/drizzle/schema";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";
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

    const areAllValuesTrue = (obj: any): boolean => {
        return Object.values(obj).every(value => value === true);
    }

    const currentDate = new Date();

    const publicInserate = currentUser?.inserat.filter(inserat => inserat.isPublished);

    const matchingConditions = (currentUser?.subscription && 
        currentUser?.subscription?.stripe_current_period_end > currentDate 
    && currentUser?.subscription?.amount > publicInserate?.length) ? true : false

    const canPublish = areAllValuesTrue(isPublishable) && matchingConditions;

    const onPublish = () => {
        try {
            setIsLoading(true);
        } catch(e : any) {
            toast.error("Fehler beim Veröffentlichen des Inserats")
            console.log(e)
        } finally {
            setIsLoading(false);
        }
    }

    const onPrivate = () => {
        try {
            setIsLoading(true);
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
                <Button className="text-gray-200 text-xs" size="sm" variant="ghost">
                    <MdLockOutline className="w-4 h-4 mr-2" />   Privat schalten
                </Button>
            ) : (
                canPublish ? (
                    <Button className="text-gray-200 text-xs" size="sm" variant="ghost">
                        <MdOutlineLockOpen  className="w-4 h-4 mr-2" />   Veröffentlichen
                    </Button>
                ) : (
                    <></>
                )
            )}
        </div>
    );
}

export default ToggleVisibility;