import LetterRestriction from "@/components/letter-restriction";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inserat } from "@/db/schema";
import { useState } from "react";

interface PayloadCreationProps {
    thisInserat: typeof inserat.$inferSelect;
    
}

const PayloadCreation = ({
    thisInserat
    
}: PayloadCreationProps) => {
    
    const [currentValue, setCurrentValue] = useState<string | undefined>();

    return (
        <div className=" ">

            <Label className="flex justify-start items-center">
                <p className="ml-2 font-semibold"> Nutzlast  </p>
            </Label>


            <div className="flex flex-row items-center space-x-2">
                <Input

                    value={currentValue ?? undefined}
                    name="price"
                    maxLength={5}
                    max={1_000_000}
                    className=" dark:bg-[#151515] dark:border-none mt-2 w-1/3"
                    placeholder="Nutzlast in kg"

                    pattern="^[0-9]*$"

                    onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                    onChange={(e) => {
                        const value = e.target.value;

                        if (/^[0-9]*$/.test(value)) {
                            setCurrentValue(value);
                        }
                    }}

                />
                <span className="font-semibold">
                    kg
                </span>
            </div>
            <div className="ml-auto flex justify-end">
                <LetterRestriction limit={5} currentLength={currentValue ? String(currentValue).length : 0} />
            </div>
        </div>
    );
}

export default PayloadCreation;