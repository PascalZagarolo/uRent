import { BsTransparency } from "react-icons/bs";
import Footer from "../../_components/footer";
import { FcIdea } from "react-icons/fc";
import { FaHandshake, FaRegLightbulb } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { MdDiversity3 } from "react-icons/md";
import Image from "next/image";
import { PiPlantFill } from "react-icons/pi";


const AboutUsPage = () => {
    return (
        <div>


            <div className="flex justify-center sm:p-8 bg-[#404040]/10">

                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">
                        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-4xl font-semibold flex justify-center items-center gap-x-3">
                                Wer ist <div className="font-bold text-gray-200">uRent?</div>
                            </h3>
                            <div className="mt-4 md:mt-0">
                                <div className="px-4">

                                    <div className="w-full flex items-center">
                                        <div className="w-full">
                                            <h3 className="font-semibold text-lg"> Wer wir sind </h3>
                                            <div className="text-sm font-normal ">
                                                Willkommen bei uRent - der Mobilitätsplattform, die die Art und Weise, wie Menschen sich fortbewegen,
                                                revolutioniert. Unser Ziel ist es, Mobilität so einfach und effizient wie möglich zu gestalten,
                                                indem wir eine vielfältige Auswahl an Fahrzeugen anbieten und den Buchungsprozess transparent gestalten.
                                            </div>
                                        </div>
                                        <div className="w-[260px] h-[160px]  justify-end md:flex hidden">
                                            <Image
                                                src="/uRent.png"
                                                className="rounded-md w-[160px] h-[160px]"
                                                width={500}
                                                height={500}
                                                alt="uRent Logo"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 font-semibold text-lg">
                                    <h3>
                                        Unsere Lösungen
                                    </h3>
                                    <div className="">
                                        <div className="px-4 text-sm font-light dark:text-gray-200/90">
                                            <div className="pb-2">
                                            - Schneller Zugang zur Online Präsenz durch einfaches Erstellen von Inseraten
                                            </div> 
                                            <div className="pb-2">
                                            - Steigerung der Online-Sichtbarkeit über uRent hinaus durch optimale Auffindbarkeit auf Suchmaschinen wie Google.
                                            </div>     
                                            <div className="pb-2">
                                            - Mehr Reichweite und schnelle Kontaktaufnahme mit Mietern durch unsere Plattform
                                            </div>
                                            <div className="pb-2">
                                            - Vereinfachung des Mietprozess durch Direkt-Anfragen und Online Chat
                                            </div> 
                                            <div className="pb-2">
                                            - Einfaches Verwalten von Fahrzeugen Verfügbarkeiten, <br/>
                                            Mietern und Buchungen 
                                            mit unserem Buchungs-Verwaltungssystem
                                            </div>
                                            <div className="pb-2">
                                            - Gleichzeitge Darstellung deiner Termine mit diversen gewünschten Informationen durch unseren Buchungs-Kalender
                                            </div>   
                                        </div>
                                    </div>
                                </div>
                                <div className="font-semibold text-lg sm:p-4 p-2">
                                    <h3> Warum uRent? </h3>
                                </div>

                                <div className="w-full sm:flex justify-evenly sm:gap-y-0 sm:space-y-0 space-y-2">
                                    <div className="bg-[#141414] rounded-md p-8 w-full sm:w-1/4">
                                        <div className="flex justify-center">
                                            <FaRegLightbulb className="w-8 h-8" />
                                        </div>
                                        <div className="font-semibold text-sm mt-2 flex justify-center">
                                            Innovation
                                        </div>
                                        <div className="text-xs font-medium text-gray-200 mt-2">
                                            Wir sind Vorreiter einer neuen Ära der Mobilität.<br />
                                            Durch die Nutzung innovativer Technologien und einer modernen Plattformarchitektur schaffen
                                            wir eine reibungslose und benutzerfreundliche Erfahrung für unsere Nutzer.<br />
                                            Wir sind ständig auf der Suche nach neuen Wegen, um deine Mobilitätsbedürfnisse
                                            zu erfüllen und deine Reise mit uRent zu verbessern. <br />
                                            Denn warum solltest du dich mit weniger zufriedengeben, wenn du das Beste verdienst?
                                        </div>
                                    </div>

                                    <div className="bg-[#141414] rounded-md p-8 w-full sm:w-1/4">
                                        <div className="flex justify-center">
                                            <GiWeightLiftingUp className="w-8 h-8" />
                                        </div>
                                        <div className="font-semibold text-sm mt-2 flex justify-center">
                                            Einfachheit
                                        </div>
                                        <div className="text-xs text-gray-200 mt-2 font-medium">
                                            {'"'}Keep it simple{'"'}.<br />
                                            Unsere Plattform wurde entwickelt, um dir eine stressfreie Erfahrung zu bieten.<br />
                                            Der Buchungsprozess ist einfach und intuitiv.<br />
                                            Und falls du doch mal Hilfe brauchst,<br /> steht unser engagiertes Team jederzeit bereit, <br />um dir weiterzuhelfen.
                                        </div>
                                    </div>

                                    <div className="bg-[#141414] rounded-md p-8 w-full sm:w-1/4">
                                        <div className="flex justify-center">
                                            <BsTransparency className="w-8 h-8" />
                                        </div>
                                        <div className="font-semibold text-sm mt-2 flex justify-center">
                                            Transparenz
                                        </div>
                                        <div className="text-xs text-gray-200 mt-2 font-medium">
                                            Bei uRent legen wir großen Wert darauf, Transparenz in jedem Schritt des Buchungsprozesses zu bieten. <br />
                                            Wir bieten klare Informationen zu den Fahrzeugen, <br /> den Vermietern und den Buchungsbedingungen,
                                            damit du genau weißt, was dich erwartet. <br />
                                            Kein Schnickschnack, keine Überraschungen - nur klare und ehrliche Informationen, <br />
                                            damit du die besten Entscheidungen treffen kannst.
                                        </div>
                                    </div>

                                </div>
                                <div className="w-full sm:flex justify-evenly  mt-2 sm:mt-4 sm:space-y-0 space-y-2">

                                    <div className="bg-[#141414] rounded-md p-8 w-full sm:w-1/4">
                                        <div className="flex justify-center">
                                            <MdDiversity3 className="w-8 h-8" />
                                        </div>
                                        <div className="font-semibold text-sm mt-2 flex justify-center">
                                            Vielfalt
                                        </div>
                                        <div className="text-xs text-gray-200 mt-2 font-medium">
                                            Mit uRent hast du Zugang zu einer breiten Palette von Fahrzeugen für jede Gelegenheit.<br />
                                            Ob du ein Auto für den täglichen Gebrauch,<br /> einen Transporter für
                                            den Umzug<br /> oder einen Anhänger für den Transport von Gütern benötigst - bei uns findest du das passende Fahrzeug. <br />
                                            Und das Beste? Alles nur ein paar Klicks entfernt!
                                        </div>
                                    </div>

                                    <div className="bg-[#141414] rounded-md p-8 w-full sm:w-1/4">
                                        <div className="flex justify-center">
                                            <PiPlantFill className="w-8 h-8" />
                                        </div>
                                        <div className="font-semibold text-sm mt-2 flex justify-center">
                                            Nachhaltigkeit
                                        </div>
                                        <div className="text-xs text-gray-200 mt-2 font-medium">
                                            Nachhaltigkeit liegt uns am Herzen. <br />
                                            Mit uRent unterstützt du lokale Unternehmen und hilfst, den CO2-Ausstoß zu senken.<br />
                                            Durch das Mieten statt Besitzen werden vorhandene Ressourcen effizienter genutzt und unnötige
                                            Fahrzeuge auf den Straßen reduziert. <br />
                                            Weniger Fahrzeuge bedeuten weniger Emissionen und eine umweltfreundlichere Mobilität. <br />
                                            Wähle uRent und trage zu einer nachhaltigeren Zukunft bei.<br />
                                        </div>
                                    </div>

                                    <div className="bg-[#141414] rounded-md p-8 w-full sm:w-1/4">
                                        <div className="flex justify-center">
                                            <FaHandshake className="w-8 h-8" />
                                        </div>
                                        <div className="font-semibold text-sm mt-2 flex justify-center">
                                            Geschäftliche Lösungen
                                        </div>
                                        <div className="text-xs text-gray-200 mt-2 font-medium">
                                            Wir bieten maßgeschneiderte Lösungen für geschäftliche Mobilitätsbedürfnisse,<br /> sei es für Flottenmanagement,
                                            Transportlogistik oder temporäre Fahrzeugvermietungen. <br />
                                            Mit uRent wird die Verwaltung und Nutzung von Fahrzeugen für Unternehmen so einfach wie nie zuvor.
                                        </div>
                                    </div>

                                </div>
                            </div> 
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default AboutUsPage;