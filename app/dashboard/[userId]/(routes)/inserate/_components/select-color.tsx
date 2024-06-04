'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RiPaintBrushLine } from "react-icons/ri";
import clsx from "clsx";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CheckIcon } from "lucide-react";


interface SelectColorProps {
    inseratId: string,
    selectedColor? : string
}

const SelectColor: React.FC<SelectColorProps> = ({
    inseratId,
    selectedColor
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onColorChange = async (color) => {
        try {
            setIsLoading(true);

            const values = {
                color: color as string
            }
            await axios.patch(`/api/inserat/${inseratId}/color`, values)
                .then(() => {
                    console.log("Farbe geändert")
                    toast.success("Farbe geändert")
                    router.refresh();
                })
        } catch (err: any) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    };

    const Colors = {
        BLUE: "bg-blue-800",
        RED: "bg-rose-800",
        GREEN: "bg-emerald-600",
        YELLOW: "bg-yellow-600",
        PURPLE: "bg-indigo-600",
        ORANGE: "bg-orange-600",
        VIOLET: "bg-violet-900",
        WHITE: "bg-gray-300",
        BLACK: "bg-black",
    };

    const isSelected = (color : string) => {
        return color === selectedColor;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="dark:bg-[#1C1C1C] w-full" variant="ghost">
                    <RiPaintBrushLine className="w-4 h-4 mr-2" /> Farbe wählen
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:border-none dark:bg-[#191919]">
                <div>
                    <div>
                        <h3 className="text-md font-semibold">Farbe wählen</h3>
                    </div>
                    <div>
                        {Object.entries(Colors).map(([key, value]) => (
                            <div key={key} className="flex items-center py-2">
                                <DialogTrigger asChild>
                                    <Button
                                        className={clsx(
                                            `w-full`,
                                            `${value}`,

                                            `dark:text-gray-200`
                                        )} variant="ghost"
                                        onClick={() => onColorChange(key)}
                                    >
                                        {isSelected(key) && <CheckIcon className="w-4 h-4 bg-black" />}
                                    </Button>
                                </DialogTrigger>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SelectColor;
