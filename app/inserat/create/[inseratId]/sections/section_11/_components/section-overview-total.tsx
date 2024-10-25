import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

interface SectionOverviewTotalProps {
    currentCategory: string;
    unfinishedSections: number[];
}

const SectionOverviewTotal = ({ currentCategory, unfinishedSections }: SectionOverviewTotalProps) => {
    const sectionId = Number(useSearchParams().get("sectionId")) - 1;

    const sectionData = [
        "Grundlegende Angaben (1/2)",
        "Grundlegende Angaben (2/2)",
        "Fahrzeug Bilder",
        "Preisdetails",
        `${currentCategory.toUpperCase()} - Eigenschaften (1/3)`,
        `${currentCategory.toUpperCase()} - Eigenschaften (2/3)`,
        `${currentCategory.toUpperCase()} - Eigenschaften (3/3)`,
        "Rahmenbedingungen",
        "Mietdauer",
        "Kontaktdaten",
    ];




    const changeSection = (value: number) => {
        const params = new URLSearchParams()
        params.set('sectionId', String(value))
        window.history.pushState(null, '', `?${params.toString()}`)
    }


    //red border for sections that are not ready to publish

    const renderedSection = (index: number) => {
        return (
            <div className={cn("flex flex-col items-center justify-center  p-4 border rounded-lg shadow-sm bg-[#222222] hover:bg-[#242424] hover:cursor-pointer transition duration-200 ease-in-out",
                unfinishedSections.includes(index + 1) ? "border-red-500 border" : "border-none"
            )}
                onClick={() => changeSection(index + 1)}
            >
                <div className="text-sm font-medium ">
                    {sectionData[index]}
                </div>
                <div>
                    <span className="text-center text-xs text-gray-500">Abschnitt {index + 1}</span>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-4">
                {Array.from({ length: sectionId }, (_, i) => i).map((index) => renderedSection(index))}
            </div>
            <div className="mt-4">
                <p className="text-xs text-gray-200/60">
                    *Rot markierte Abschnitte sind noch nicht fertig und müssen noch bearbeitet werden, bevor das Inserat veröffentlicht werden kann. <br/>
                    Pflichtfelder sind mit einem Sternchen (*) markiert.
                </p>
            </div>
        </div>
    );
}

export default SectionOverviewTotal;
