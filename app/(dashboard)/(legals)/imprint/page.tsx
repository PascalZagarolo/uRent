import getCurrentUser from "@/actions/getCurrentUser";

import HeaderLogo from "../../_components/header-logo";
import { TruckIcon } from "lucide-react";
import db from "@/db/drizzle";
import { notification } from "@/db/schema";
import { eq } from "drizzle-orm";
import MobileHeader from "../../_components/mobile-header";

const Imprint = async () => {

    const currentUser = await getCurrentUser();

    const foundNotifications = await db.query.notification.findMany({
        where : (
            eq(notification.userId, currentUser?.id)
        )
    
    })

    return (
        <div>
            
            
            <div className="flex justify-center p-8 bg-[#404040]/10">
                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">


                        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                 uRent - Impressum <p className="ml-auto text-sm"> (01.01.2024) </p>
                            </h3>
                        </div>



                        <div className="p-8 text-sm dark:text-gray-300/90">
                            <div className="p-4">
                                <p className="font-semibold text-lg">
                                    Angaben gemäß § 5 TMG
                                </p>
                                <p className="mt-2">
                                    uRent
                                </p>
                                <p className="mt-2">
                                Lützowstraße 375
                                </p>
                                <p className="mt-2">
                                    42653 Solingen
                                </p>
                                
                                <p className="mt-4 text-lg font-semibold">
                                    Vertreten durch:
                                </p>
                                <p className="mt-2">
                                    Vincent Garber
                                </p>
                                <p className="mt-2">
                                    Karl Schad
                                </p>
                                <p className="mt-2">
                                    Pascal Zagarolo
                                </p>
                                <div>
                                    <p className="font-bold mt-4">
                                        Kontakt:
                                    </p>
                                    <div>
                                        <p className="mt-2">
                                            Telefon: +49(0)1636860555
                                        </p>
                                        <p className="mt-2">
                                            Telefax: +49 30 37 71 96 10
                                        </p>
                                        <p className="mt-2">
                                            E-Mail: <a href="mailto:support@urent-rental.de">support@urent-rental.de</a>
                                        </p>
                                    </div>
                                    {/* 
                                    <div className="mt-4">
                                        <p className="font-bold">
                                            Umsatzsteuer-ID:
                                        </p>
                                        <p className="mt-2">
                                            Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: Musterustid.
                                        </p>

                                        <p className="font-bold mt-4">
                                            Wirtschafts-ID:
                                        </p>
                                        <p className="mt-2">
                                            Musterwirtschaftsid
                                        </p>

                                        <p className="font-bold mt-4">
                                            Aufsichtsbehörde:
                                        </p>
                                        <p className="mt-2">
                                            Musteraufsicht Musterstadt
                                        </p>
                                    </div>
                                    */}
                                </div>
                            </div>


                            <div className="mt-8">
                                <p className="font-bold">
                                    Haftungsausschluss:
                                </p>
                                <div className="mt-2">
                                    <p className="font-medium text-lg">
                                        Haftung für Inhalte
                                    </p>
                                    <p>
                                        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
                                        Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
                                        Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
                                        10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                                        Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                                        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
                                        bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
                                        konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
                                        Inhalte umgehend entfernen.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="mt-2">
                                    <p className="font-medium text-lg">
                                        Haftung für Links
                                    </p>
                                    <p>
                                        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
                                        Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
                                        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                                        wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
                                        Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
                                        jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
                                        Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                                    </p>
                                </div>
                            </div>



                            <div className="mt-4">
                                <div className="mt-2">
                                    <p className="font-medium text-lg">
                                        Urheberrecht
                                    </p>
                                    <p>
                                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                                        Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                                        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                                        Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit
                                        die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
                                        beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
                                        Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
                                        Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                                    </p>
                                </div>
                            </div>



                            <div className="mt-4">
                                <div className="mt-2">
                                    <p className="font-medium text-lg">
                                        Datenschutz
                                    </p>
                                    <p>
                                        Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren
                                        Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt
                                        dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung
                                        nicht an Dritte weitergegeben.
                                        Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
                                        Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
                                        möglich.
                                        Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung
                                        von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich
                                        widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der
                                        unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
                                    </p>
                                </div>
                            </div>



                            <div className="mt-4">
                                <div className="mt-2">
                                    <p className="font-medium text-lg">
                                        Google Analytics
                                    </p>
                                    <p>
                                        Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. (&apos;Google&apos;). Google Analytics
                                        verwendet sog. &apos;Cookies&apos;, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der
                                        Benutzung der Website durch Sie ermöglicht. Die durch den Cookie erzeugten Informationen über Ihre Benutzung
                                        dieser Website (einschließlich Ihrer IP-Adresse) wird an einen Server von Google in den USA übertragen und
                                        dort gespeichert. Google wird diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um
                                        Reports über die Websiteaktivitäten für die Websitebetreiber zusammenzustellen und um weitere mit der
                                        Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese
                                        Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte
                                        diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten
                                        der Google in Verbindung bringen. Sie können die Installation der Cookies durch eine entsprechende Einstellung
                                        Ihrer Browser Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls
                                        nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung dieser Website
                                        erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor beschriebenen
                                        Art und Weise und zu dem zuvor benannten Zweck einverstanden.
                                    </p>
                                </div>
                            </div>



                            <div className="mt-4">
                                <div className="mt-2">
                                    <p className="font-medium text-lg">
                                        Google AdSense
                                    </p>
                                    <p>
                                        Diese Website benutzt Google Adsense, einen Webanzeigendienst der Google Inc., USA (&apos;Google&apos;). Google Adsense
                                        verwendet sog. &apos;Cookies&apos; (Textdateien), die auf Ihrem Computer gespeichert werden und die eine Analyse der
                                        Benutzung der Website durch Sie ermöglicht. Google Adsense verwendet auch sog. &apos;Web Beacons&apos; (kleine
                                        unsichtbare Grafiken) zur Sammlung von Informationen. Durch die Verwendung des Web Beacons können einfache
                                        Aktionen wie der Besucherverkehr auf der Webseite aufgezeichnet und gesammelt werden. Die durch den Cookie
                                        und/oder Web Beacon erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer
                                        IP-Adresse) werden an einen Server von Google in den USA übertragen und dort gespeichert. Google wird diese
                                        Informationen benutzen, um Ihre Nutzung der Website im Hinblick auf die Anzeigen auszuwerten, um Reports über
                                        die Websiteaktivitäten und Anzeigen für die Websitebetreiber zusammenzustellen und um weitere mit der
                                        Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese
                                        Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte
                                        diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten
                                        der Google in Verbindung bringen. Das Speichern von Cookies auf Ihrer Festplatte und die Anzeige von Web
                                        Beacons können Sie verhindern, indem Sie in Ihren Browser-Einstellungen &apos;keine Cookies akzeptieren&apos; wählen
                                        (Im MS Internet-Explorer unter &apos;Extras {'>'} Internetoptionen {'>'} Datenschutz{'>'} Einstellung&apos;; im Firefox unter
                                        &apos;Extras {'>'} Einstellungen {'>'} Datenschutz {'>'} Cookies&apos;); wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall
                                        gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung
                                        dieser Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor
                                        beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Imprint;