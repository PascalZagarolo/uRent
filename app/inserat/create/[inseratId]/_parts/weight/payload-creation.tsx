import LetterRestriction from "@/components/letter-restriction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inserat } from "@/db/schema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface PayloadCreationProps {
  thisInserat: typeof inserat.$inferSelect;
}

const PayloadCreation = ({ thisInserat }: PayloadCreationProps) => {
  // Using useState to track the initial payload
  const [initialPayload, setInitialPayload] = useState(() => {
    switch (thisInserat.category) {
      case "LKW":
        return thisInserat.lkwAttribute?.payload ?? undefined;
      case "TRAILER":
        return thisInserat.trailerAttribute?.payload ?? undefined;
      case "TRANSPORT":
        return thisInserat.transportAttribute?.payload ?? undefined;
      default:
        return undefined; // Handle unexpected categories if needed
    }
  });

  const [currentValue, setCurrentValue] = useState<string | undefined>(
    initialPayload ? initialPayload : undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSave = async () => {
    try {
      setIsLoading(true);

      const values = {
        payload: currentValue ? currentValue : null,
      };

      await axios.patch(
        `/api/inserat/${thisInserat?.id}/${thisInserat?.category?.toLowerCase()}`,
        values
      );
      setInitialPayload(currentValue);
      router.refresh();
      toast.success("Nutzlast wurde gespeichert");
    } catch (e: any) {
      console.log(e);
      toast.error("Fehler beim Speichern der Änderungen");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <Label className="flex justify-start items-center">
        <p className="ml-2 font-semibold"> Nutzlast </p>
      </Label>

      <div className="flex flex-row items-center space-x-2">
        <Input
          value={currentValue ?? ""}
          name="price"
          maxLength={5}
          max={1_000_000}
          className="dark:bg-[#151515] dark:border-none mt-2 w-full"
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
            Number(currentValue ?? 0) === Number(initialPayload ?? 0)
          }
        >
          Nutzlast festlegen
        </Button>
      </div>
    </div>
  );
};

export default PayloadCreation;
