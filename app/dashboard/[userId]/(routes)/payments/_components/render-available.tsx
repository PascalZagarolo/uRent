'use client'

import { Progress } from "@/components/ui/progress";
import { userTable } from "@/db/schema";
import { cn } from "@/lib/utils";

interface RenderAvilableProps {
    existingSubscription: any,
    countedInserate: number
}

const RenderAvailable: React.FC<RenderAvilableProps> = ({
    existingSubscription,
    countedInserate
}) => {
    return (
        <div>
            <h1 className="font-semibold">
                Verfügbare Inserate
            </h1>
            <p className="text-xs dark:text-gray-200/60 ">
                Gezählt werden nur veröffentlichte Inserate.
            </p>
            {existingSubscription.subscription ? (
                <div className="text-2xl font-medium flex gap-x-1 mt-2">
                    <div className="w-full">
                        <div className="w-1/2">
                            <Progress
                                className="w-full bg-[#131313]"
                                value={countedInserate / existingSubscription.subscription.amount * 100}
                            />
                        </div>
                        <div className="flex items-center mt-2">
                            <p className={cn("font-bold",
                                countedInserate !== existingSubscription?.subscription?.amount ? "text-green-500" : "text-red-500"
                            )}>{countedInserate}</p> / {existingSubscription?.subscription?.amount}

                        </div>

                    </div>

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