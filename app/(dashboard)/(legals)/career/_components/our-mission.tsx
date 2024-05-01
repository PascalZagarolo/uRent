import { MdChecklist } from "react-icons/md";

const OurMission = () => {
    return (
        <div>
            <div>
                <h3 className="font-semibold flex gap-x-2 items-center">
                    <MdChecklist className="w-4 h-4" />   Unsere Mission
                </h3>
            </div>
            <div>
                <div className="text-sm text-gray-200">
                    Bei uRent ist unsere Mission klar definiert:
                    Wir wollen das Mieten und Vermieten revolutionieren. <br />
                    Durch innovative Technologien und exzellenten
                    Kundenservice schaffen wir eine Plattform, die es allen ermöglicht, nahtlos Fahrzeuge zu mieten und zu vermieten.
                </div>
                <div className="px-4 text-sm mt-2">
                    <div className="font-medium">- Zugänglichkeit und Vielfalt</div>
                    Wir streben danach, das Mieten und Vermieten für jeden zugänglich zu machen,
                    unabhängig von finanziellen Möglichkeiten oder Standort.<br />
                    Unsere Plattform fördert Chancengleichheit,
                    lokale Unternehmen und reduziert gleichzeitig die Umweltbelastung durch übermäßigen Konsum.
                </div>
                <div className="px-4 text-sm mt-2">
                    <div className="font-medium">- Nachhaltigkeit und Vertrauen</div>
                    Wir setzen auf nachhaltige Praktiken und fördern eine Kultur des Vertrauens.
                    Durch Transparenz und Zuverlässigkeit schaffen wir eine vertrauenswürdige Plattform,
                    die auf Verlässlichkeit und Kundenorientierung basiert.
                    Innovation und Zusammenarbeit
                </div>
                <div className="px-4 text-sm mt-2">
                    <div className="font-medium">- Innovation und Zusammenarbeit</div>
                    Unser Fokus liegt auf kontinuierlicher Innovation und Zusammenarbeit. <br />
                    Wir arbeiten eng mit unserer Gemeinschaft zusammen, um neue Wege zu finden, wie Menschen mieten und konsumieren können.
                </div>
                <div className="mt-8 text-sm font-semibold">
                    Gestalten Sie mit uns die Zukunft
                    Werden Sie Teil von uRent und helfen Sie uns dabei, die Zukunft des Mietens zu gestalten!
                </div>
            </div>
        </div>
    );
}

export default OurMission;