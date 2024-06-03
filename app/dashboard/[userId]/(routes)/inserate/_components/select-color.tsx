import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RiPaintBrushLine } from "react-icons/ri";
import clsx from "clsx";

const SelectColor = () => {
    const onColorChange = (color) => {
        console.log(color);
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
                        {Object.values(Colors).map((color) => (
                            <div key={color} className="flex items-center py-2">
                                <Button
                                    className={clsx(
                                        `w-full`,
                                        `${color}`,
                                        
                                        `dark:text-gray-200`
                                    ) } variant="ghost"
                                    onClick={() => onColorChange(color)}
                                >
                                    
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SelectColor;
