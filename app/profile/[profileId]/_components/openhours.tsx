import { CalendarIcon } from "lucide-react";

const Openhours = () => {
    return (
        <div className="dark:bg-[#191919] p-4">
            <div>
                <h1 className="font-medium flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2" /> Öffnungszeiten
                </h1>
                <div>
                    <div className="grid grid-cols-6 grid-rows-2 gap-2 mt-4">
                        <div className="col-span-1 row-span-1 font-semibold text-sm">Montag</div>
                        <div className="col-span-1 row-span-1 font-semibold text-sm">Dienstag</div>
                        <div className="col-span-1 row-span-1 font-semibold text-sm">Mittwoch</div>
                        <div className="col-span-1 row-span-1 font-semibold text-sm">Donnerstag</div>
                        <div className="col-span-1 row-span-1 font-semibold text-sm">Freitag</div>
                        <div className="col-span-1 row-span-1 font-semibold text-sm">Samstag</div>

                        <div className="col-span-1 row-span-2 font-semibold text-sm">9:00 - 22:00 Uhr</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">9:00 - 22:00 Uhr</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">9:00 - 22:00 Uhr</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">9:00 - 22:00 Uhr</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">9:00 - 18:00 Uhr</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">9:00 - 18:00 Uhr</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Openhours;