import { Input } from "@/components/ui/input";
import { inserat } from "@/db/schema";

interface VehicleAmountProps {
    thisInserat: typeof inserat.$inferSelect;
    currentValue: number;
    setCurrentValue: (value: number) => void;
    disabled?: boolean;
}

const VehicleAmount: React.FC<VehicleAmountProps> = ({
    thisInserat,
    currentValue,
    setCurrentValue,
    disabled = false, // Default to false for flexibility
}) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return; // Prevent changes if disabled

        const inputValue = e.target.value;
        const numericValue = parseInt(inputValue.replace(/[^0-9]/g, ''), 10);

        // Keep value within range 1-20
        setCurrentValue(Math.min(20, Math.max(1, numericValue)));
    };

    return (
        <div>
            <div>
                <p className="text-sm font-semibold">Anzahl deiner identischen Fahrzeuge</p>
            </div>
            <p className="text-gray-800/50 text-xs dark:text-gray-200/60">2-20 Fahrzeuge</p>
            <Input
                type="number"
                max={20}
                name="vehicleAmount"
                className="dark:bg-[#151515] dark:border-none"
                onChange={handleInputChange}
                disabled={disabled}
                value={currentValue}
                onBlur={() => { 
                    setCurrentValue(Math.min(20, Math.max(2, currentValue)));
                }}
            />
        </div>
    );
}

export default VehicleAmount;
