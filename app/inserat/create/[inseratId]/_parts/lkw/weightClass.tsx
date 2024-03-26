'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface WeightClassFormProps {
  thisWeightClass: number;
}

const WeightClassForm: React.FC<WeightClassFormProps> = ({
  thisWeightClass
}) => {

  const [currentWeight, setCurrentWeight] = useState<number | null>(thisWeightClass || null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const params = useParams();

  const onSubmit = (selectedValue: number) => {
    try {

      setCurrentWeight(selectedValue);

      const values = {
        weightClass: selectedValue
      }

      setIsLoading(true);
      axios.patch(`/api/inserat/${params.inseratId}/lkw`, values);
      toast.success("Gewicht gespeichert : " + values.weightClass);
      setTimeout(() => {
        router.refresh();
      }, 400)
    } catch {
      toast.error("Fehler beim Speichern des Gewichts");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <Label>zul. Gesamtgewicht</Label>
        <Select
          onValueChange={(weightClass) => {
            onSubmit(Number(weightClass));
          }}
          value={currentWeight ? String(currentWeight) : null}
          disabled={isLoading}
        >

          <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
            disabled={isLoading}>
            <SelectValue
              placeholder="Wähle die Kategorie aus"
            />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
          <SelectItem value={null}>Beliebig</SelectItem>
          <SelectItem value="75">0,75 t</SelectItem>
            <SelectItem value="150">1,5 t</SelectItem>
            <SelectItem value="280">2,8 t</SelectItem>
            <SelectItem value="350">3,5 t</SelectItem>
            <SelectItem value="750">7,5 t</SelectItem>
            <SelectItem value="1200">12 t</SelectItem>
            <SelectItem value="1800">18 t</SelectItem>
            <SelectItem value="2600">26 t</SelectItem>
            <SelectItem value="3200">32 t</SelectItem>
            <SelectItem value="3900">39 t</SelectItem>
            <SelectItem value="5000">{'>'} 39 t</SelectItem>

          </SelectContent>
        </Select>

      </div>
    </div>
  );
}

export default WeightClassForm;