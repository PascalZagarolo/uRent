'use client'

import { Label } from "@/components/ui/label";

const WorkWithUs = () => {
    return ( 
        <div>
            <div>
                <h3 className="font-semibold text-md">
                    Warum uRent?
                </h3>
            </div>
            <div className="mt-4 flex justify-between">

                <div className="dark:bg-[#141414] p-8 rounded-md">
                    <Label>
                        Thema 1
                    </Label>
                    <div className="mt-4">
                        Inhalt Thema 1
                    </div>
                </div>

                <div className="dark:bg-[#141414] p-8 rounded-md">
                    <Label>
                        Thema 2
                    </Label>
                    <div className="mt-4">
                        Inhalt Thema 2
                    </div>
                </div>

                <div className="dark:bg-[#141414] p-8 rounded-md">
                    <Label>
                        Thema 3
                    </Label>
                    <div className="mt-4">
                        Inhalt Thema 3
                    </div>
                </div>

            </div>
        </div>
     );
}
 
export default WorkWithUs;