import LetterRestriction from "@/components/letter-restriction";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WeightClassProps {
    currentValue: string;
    setCurrentValue: (value) => void;
}

const WeightClass = ({
    currentValue,
    setCurrentValue
}: WeightClassProps) => {
    return (
        <div className=" ">

            <Label className="flex justify-start items-center">
                <p className="ml-2 font-semibold"> zul. Gesamtgewicht  </p>
            </Label>


            <div className="flex flex-row items-center space-x-2">
                <Input

                    value={currentValue ?? undefined}
                    name="price"
                    maxLength={5}
                    max={1_000_000}
                    className=" dark:bg-[#151515] dark:border-none mt-2 w-2/3"
                    placeholder="zul. Gesamtgewicht in kg"

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

export default WeightClass;