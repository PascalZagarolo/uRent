import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface UdsMinTimeProps {
    minTime : string;
    setMinTime : (value : string) => void;
}

const UdsMinTime = ({ minTime, setMinTime }: UdsMinTimeProps) => {
    return (
        <div className="w-full ">
            <Label className="">
                Mietdauer
            </Label>
            
            <div className="">
                <Select
                    onValueChange={(value) => setMinTime(value as string)}
                    
                    value={minTime ? minTime : undefined}

                >
                    <SelectTrigger className={cn("w-full bg-[#222222] shadow-lg border-none text-gray-200s", !minTime && "text-gray-200/60")}>
                        <SelectValue placeholder="Wähle deine gewünschte Mietdauer" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#222222] border-none">
                        <SelectGroup>

                            <SelectItem value="1h">1 Stunde</SelectItem>
                            <SelectItem value="4h">4 Stunden</SelectItem>
                            <SelectItem value="1d">1 Tag</SelectItem>
                            <SelectItem value="3d">3 Tage</SelectItem>
                            <SelectItem value="7d">1 Woche</SelectItem>
                            <SelectItem value="14d">2 Wochen</SelectItem>
                            <SelectItem value="30d">1 Monat</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default UdsMinTime;