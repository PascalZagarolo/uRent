'use client'

import { userTable } from "@/db/schema";
import { cn } from "@/lib/utils";

interface RenderAvilableProps {
    existingSubscription : typeof userTable.$inferSelect,
    countedInserate : number
}

const RenderAvailable : React.FC<RenderAvilableProps> = ({
    existingSubscription,
    countedInserate
}) => {
    return (
        <div>
            <h1 className="font-semibold">
                Verfügbare Inserate1
            </h1>
            <p className="text-xs dark:text-gray-200/60 ">
                Gezählt werden nur veröffentlichte Inserate.
            </p>
            {existingSubscription.subscription ? (
                <div className="text-2xl font-medium flex gap-x-1 mt-2">
                    <p className={cn("font-bold",
                        countedInserate !== existingSubscription?.subscription?.amount ? "text-green-500" : "text-red-500"
                    )}>{countedInserate}</p> / {existingSubscription?.subscription?.amount}
                </div>
            ) : (
                <div className="text-2xl font-medium flex gap-x-1 mt-2">
                    Noch kein Plan ausgewählt
                </div>
            )}
        </div>
    );
}

export default RenderAvailable;