'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarFront } from "lucide-react";
import { useEffect, useState } from "react";

const SelectCategoryInserat = () => {

    type Categories = {
        pkw : string;
        lkw : string;
        land : string;
        bau : string;
        trailor : string;
        caravan : string
    }

    const initialValues : Categories = {
        pkw : "pkw",
        lkw : "lkw",
        land : "land",
        bau : "bau",
        trailor : "trailor",
        caravan : "caravan"
    }

    

    const [category, setCategory] = useState<Categories | string>(initialValues);

    useEffect(() => {

    }, [category])

    return (
        <div className="ml-4 mt-8 flex items-center">
            <CarFront className="mr-4"/>
            <Select>
                <SelectTrigger className="w-[50%]">
                    <SelectValue className="font-bold" placeholder="Wähle deine Fahrzeugkategorie" />
                </SelectTrigger>
                <SelectContent>
                    
                        <SelectLabel className="font-bold">Fahrzeugkategorien</SelectLabel>
                        <SelectItem value="pkw">PKW</SelectItem>
                        <SelectItem value="lkw">LKW</SelectItem>
                        <SelectItem value="land">Landwirtschaft</SelectItem>
                        <SelectItem value="bau">Baumaschinen</SelectItem>
                        <SelectItem value="trailor" >Anhänger</SelectItem>
                        <SelectItem value="caravan">Wohnmobil</SelectItem>
                    
                </SelectContent>
            </Select>
            
            {category === "pkw" && (
                <div>
                    PKW ausgesucht :D
                </div>
            )}
        </div>
    );
}

export default SelectCategoryInserat;