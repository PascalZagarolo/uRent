import LetterRestriction from "@/components/letter-restriction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inserat } from "@/db/schema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface WeightClassCreationProps {
  thisInserat: typeof inserat.$inferSelect;
}

const WeightClassCreation = ({ thisInserat }: WeightClassCreationProps) => {
  // Initialize initialWeightClass with useState
  const [initialWeightClass, setInitialWeightClass] = useState<string | undefined>(undefined);
  const [currentValue, setCurrentValue] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // useEffect to determine and set the initialWeightClass
  useEffect(() => {
    if (!thisInserat?.category) return; // Early return if category is undefined

    let weightClass;
    switch (thisInserat.category) {
      case "LKW":
        weightClass = thisInserat.lkwAttribute?.weightClass;
        break;
      case "TRAILER":
        weightClass = thisInserat.trailerAttribute?.weightClass;
        break;
      case "TRANSPORT":
        weightClass = thisInserat.transportAttribute?.weightClass;
        break;
      default:
        weightClass = undefined; // Handle unexpected categories if needed
    }

    setInitialWeightClass(weightClass);
    setCurrentValue(weightClass);
  }, [thisInserat]);

  const onSave = async () => {
    try {
      setIsLoading(true);

      const values = {
        weightClass: currentValue ? currentValue : null,
      };

      await axios.patch(
        `/api/inserat/${thisInserat?.id}/${thisInserat?.category?.toLowerCase()}`,
        values
      );
      setInitialWeightClass(currentValue ? currentValue : null);
      router.refresh();
      toast.success("Zul. Gesamtgewicht wurde gespeichert");
    } catch (e: any) {
      console.log(e);
      toast.error("Fehler beim Speichern der Änderungen");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" ">
      <Label className="flex justify-start items-center">
        <p className="ml-2 font-semibold"> zul Gesamtgewicht </p>
      </Label>

      <div className="flex flex-row items-center space-x-2">
        <Input
          value={currentValue ?? ""}
          name="weightClass"
          maxLength={5}
          max={1_000_000}
          className="dark:bg-[#151515] dark:border-none mt-2 w-full"
          placeholder="zul. Gesamtgewicht"
          pattern="^[0-9]*$"
          onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[0-9]*$/.test(value)) {
              setCurrentValue(value);
            }
          }}
        />
        <span className="font-semibold">kg</span>
      </div>
      <div className="ml-auto flex justify-end">
        <LetterRestriction
          limit={5}
          currentLength={currentValue ? String(currentValue).length : 0}
        />
      </div>
      <div className="w-full flex items-center">
        <Button
          className="bg-white hover:bg-gray-200 text-gray-900 shadow-lg dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
          onClick={onSave}
          disabled={
            Number(currentValue) > 1_000_000 ||
            Number(currentValue ?? 0) === Number(initialWeightClass ?? 0)
          }
        >
          Nutzlast festlegen
        </Button>
      </div>
    </div>
  );
};

export default WeightClassCreation;
