import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarFront } from "lucide-react";

const SelectCategoryInserat = () => {
    return (
        <div className="ml-4 mt-8 flex items-center">
            <CarFront className="mr-4"/>
            <Select>
                <SelectTrigger className="w-[50%]">
                    <SelectValue className="font-bold" placeholder="Wähle deine Fahrzeugkategorie" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel className="font-bold">Fahrzugkategorien</SelectLabel>
                        <SelectItem value="pkw">PKW</SelectItem>
                        <SelectItem value="lkw">LKW</SelectItem>
                        <SelectItem value="land">Landwirtschaft</SelectItem>
                        <SelectItem value="bau">Baumaschinen</SelectItem>
                        <SelectItem value="trailor">Anhänger</SelectItem>
                        <SelectItem value="caravan">Wohnmobil</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default SelectCategoryInserat;