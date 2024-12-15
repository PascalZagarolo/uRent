import { ImageIcon } from "lucide-react";
import Image from "next/image";



const RoadToSuccess = () => {
    return ( 
        <div>
            <div>
                <h3 className="text-2xl font-semibold">
                    Dein Weg zum Erfolg..
                </h3>
                <p className="text-sm text-gray-200/60">
                    ist kürzer als du denkst.
                </p>
            </div>
            <div className="mt-4 flex flex-col space-y-32">
                <div>
                    <div className="text-xl font-semibold">
                    1.) Erstelle Inserate - <br className="md:hidden block"/> und sei in wenigen Moment präsent.
                    </div>
                    <div className="py-2">
                        <Image 
                        alt="Erstelle Inserate"
                        src="https://res.cloudinary.com/df1vnhnzp/image/upload/v1734212183/r2evpxliskta15hziyck.gif"
                        width={2000}
                        height={2000}
                        quality={100}
                        className="w-[720px] h-[405px] object-cover rounded-md shadow-lg border border-black"
                        />
                    </div>
                    <div className="w-1/2 text-gray-200/80">
                        Erstelle Inserate für deine Fahrzeuge in nur ein paar Klicks und sei schon nach wenigen Minuten bereit für die ersten Anfragen.
                    </div>
                </div>
                <div>
                    <div className="text-right text-xl font-semibold">
                        2.) Erreiche Kunden - <br className="md:hidden block"/> die nur darauf warten deine Fahrzeuge zu mieten.
                    </div>
                    <div className="py-2 ml-auto justify-end">
                    <Image 
                        alt="Erstelle Inserate"
                        src="https://res.cloudinary.com/df1vnhnzp/image/upload/v1734265485/y9tu5cncoiovrlr6zshu.gif"
                        width={2000}
                        height={2000}
                        quality={100}
                        className="w-[720px] h-[405px] object-cover rounded-md shadow-lg ml-auto justify-end border border-black"
                        />
                    </div>
                    <div className="mt-4 w-1/2 text-gray-200/80 ml-auto">
                       Profitiere von uRents gesonderter Mietgesellschaft und erreiche Kunden, die nur darauf warten deine Fahrzeuge zu mieten. <br/>
                       Sei mit deinen Inseraten dort präsent, wo andere nach dir suchen.
                    </div>
                </div>
                <div>
                    <div className="text-xl font-semibold">
                    3.) Reibungslose Kontaktaufnahme - <br className="md:hidden block"/> in nur wenigen Sekunden
                    </div>
                    <div className="py-2">
                        <Image 
                        alt="Erstelle Inserate"
                        src="https://res.cloudinary.com/df1vnhnzp/image/upload/v1734262169/fg1aa5bnq7whs44rnmb1.gif"
                        width={2000}
                        height={2000}
                        quality={100} 
                        className="w-[720px] h-[405px] object-cover rounded-md shadow-lg border border-black"
                        />
                    </div>
                    <div className="mt-4 w-1/2 text-gray-200/80">
                       Durch uRents integrierte Chat & Kommunikationsfunktionen kannst du den Kundenkontakt so einfach und reibungslos wie noch nie gestalten.<br/>
                       Behalte den Überblick über alle Anfragen und antworte direkt auf Kundenanfragen und das ohne nervigen E-Mailverkehr.
                    </div>
                </div>
                <div>
                    <div className="text-right text-xl font-semibold">
                    4.) Verwalte deine Fahrzeuge & Inserate - <br className="md:hidden block"/> kinderleicht
                    </div>
                    <div className="py-2">
                        <Image 
                        alt="Erstelle Inserate"
                        src="https://res.cloudinary.com/df1vnhnzp/image/upload/v1734272552/maomdysib8wmtd7s1qmb.gif"
                        width={2000}
                        height={2000}
                        quality={100}
                        className="w-[720px] h-[405px] object-cover rounded-md shadow-xl ml-auto justify-end border border-black"
                        />
                    </div>
                    <div className="mt-4 w-1/2 text-gray-200/80 ml-auto">
                       uRent bietet dir eine übersichtliche Fahrzeug- & Buchungsverwaltung, in der du alle deine Fahrzeuge und Inserate verwalten kannst.<br/>
                       Außerdem wirst du von uRents starken Tools unterstützt, welche dir  dabei helfen Buchungen & Termine zu verwalten, <br/>
                        oder andere wichtige Informationen zu deinen Fahrzeugen zu speichern und zu verwalten. 
                        Ein Ökosystem welches genau für dich gemacht ist.
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default RoadToSuccess;