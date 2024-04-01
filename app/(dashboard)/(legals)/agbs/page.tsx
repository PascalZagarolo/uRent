import getCurrentUser from "@/actions/getCurrentUser";
import HeaderLogo from "../../_components/header-logo";

const AgbsPage = async () => {

    const currentUser = await getCurrentUser();

    return (
        <div>
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser} />
            </div>
            <div className="flex justify-center p-8 bg-[#404040]/10">

                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="  min-h-screen">
                        <div className="p-4 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                Allgemeinen Geschäftsbedingungen der &apos;uRent&apos; Plattform
                            </h3>
                            <div className="p-8 text-sm dark:text-gray-300/90">

                                <h1 className="font-semibold text-lg ">
                                    Geltungsbereich
                                </h1>
                                <div>
                                    Diese Allgemeinen Nutzungsbedingungen regeln die Nutzung der Onlinedienste von uRent,
                                    einem Unternehmen mit Sitz in Lützowstraße 375 Solingen und vertreten durch den Geschäftsführer Vincent Garber.
                                    Kontaktmöglichkeiten sind Telefon: +49(0)1636860555 Telefax: +49 30 37 71 96 10,
                                    E-Mail: support@urent-rental.de. Jegliche abweichende Geschäftsbedingungen des Nutzers finden keine Anwendung.
                                </div>

                                <h1 className="font-semibold text-lg mt-4">
                                    2. Gegenstand
                                </h1>
                                <div>
                                    uRent betreibt eine benutzerfreundliche Online-Plattform, die es den Nutzern ermöglicht,
                                    Mietverträge für Fahrzeuge aller Art abzuschließen. Dabei handelt uRent ausschließlich als Vermittler zwischen
                                    den einzelnen Nutzern und Vermietern oder Verkäufern.
                                    Die Plattform selbst bietet keine Gegenstände zur Vermietung oder zum Verkauf an.
                                </div>

                                <h1 className="font-semibold text-lg mt-4">
                                    3. Nutzung des Dienstes / Registrierung / Benutzerkonto
                                </h1>
                                <div>
                                    Die Nutzung des Dienstes ist grundsätzlich ohne Registrierung möglich.
                                    Eine Registrierung ist erforderlich, um bestimmte Funktionen des Dienstes zu nutzen oder als
                                    Vermieter tätig zu sein. Dazu gehören beispielsweise das Hervorheben von Angeboten und
                                    die Verwaltung von Inseraten.
                                    Die Registrierung und die Nutzung als Mieter sind kostenfrei.
                                    Personen, die nicht volljährig oder anderweitig beschränkt geschäftsfähig sind, dürfen den Dienst nicht nutzen.
                                    Ein Nutzerkonto ist persönlich und nicht übertragbar. Der Nutzer ist verpflichtet,
                                    seine Zugangsdaten vertraulich zu behandeln und vor dem Zugriff durch unbefugte Dritte zu schützen.
                                </div>

                                <h1 className="font-semibold text-lg mt-4">
                                    4. Nutzerbewertungen und Kommentare
                                </h1>
                                <div>
                                    Nach Abschluss eines Mietvertrags haben Nutzer die Möglichkeit,
                                    Vermieter und Transaktionen zu bewerten und zu kommentieren.
                                    Dies dient der Transparenz und Qualitätssicherung auf der Plattform.
                                    Die Bewertungen und Kommentare werden pseudonymisiert angezeigt. Persönliche Daten werden nicht
                                    öffentlich gemacht.
                                    uRent behält sich das Recht vor, Bewertungen und Kommentare zu überprüfen und gegebenenfalls
                                    zu ändern oder zu löschen,
                                    insbesondere wenn sie gegen die Nutzungsbedingungen verstoßen.
                                </div>

                                <h1 className="font-semibold text-lg mt-4">
                                    5. Abschluss von Mietverträgen
                                </h1>
                                <div>
                                    Mietverträge kommen ausschließlich zwischen den Nutzern und den Vermietern zustande.
                                    Die AGB von uRent gelten nicht für Mietverträge,
                                    sondern die Vertragsbedingungen des jeweiligen Vermieters.
                                    Nutzer sollten diese daher vor Vertragsabschluss sorgfältig prüfen.
                                    uRent übernimmt keine Verantwortung für die Einhaltung oder Durchsetzbarkeit der Vertragsbedingungen 
                                    zwischen Nutzern und Vermietern.
                                </div>

                                <h1 className="font-semibold text-lg mt-4">
                                    6. Verwendung personenbezogener Angaben
                                </h1>
                                <div>
                                    Personenbezogene Daten dürfen ausschließlich zur Anbahnung und Abwicklung von Mietverträgen verwendet werden.
                                    Dies schließt die Kontaktaufnahme zwischen Nutzern und Vermietern sowie die Abwicklung von Zahlungen ein.
                                    Die Nutzung zu Werbezwecken oder für unerwünschte Kontaktaufnahmen ist untersagt.
                                    Verstöße werden von uRent geahndet.
                                </div>

                                <h1 className="font-semibold text-lg mt-4">
                                    7. Zusätzliche Leistungen; Bezahlung über uRent
                                </h1>
                                <div>
                                    Im Buchungsprozess können zusätzliche Angebote und Leistungen Dritter angezeigt werden. 
                                    Dies können beispielsweise Versicherungen oder Zusatzleistungen sein.
                                    Die Zahlung erfolgt über uRent als Vertreter des jeweiligen Vermieters bzw. 
                                    Anbieters zusätzlicher Leistungen. Dabei können verschiedene Zahlungsmethoden zur Verfügung stehen.
                                </div>

                                <h1 className="font-semibold text-lg mt-4">
                                    8. Stornomöglichkeit bei Direktbuchungen und Zahlungen über uRent
                                </h1>
                                <div>
                                    Im Buchungsprozess können zusätzliche Angebote und Leistungen Dritter angezeigt werden.
                                    Dies können beispielsweise Versicherungen oder Zusatzleistungen sein.
                                    Die Zahlung erfolgt über uRent als Vertreter des jeweiligen Vermieters bzw.
                                    Anbieters zusätzlicher Leistungen. Dabei können verschiedene Zahlungsmethoden zur Verfügung stehen.
                                </div>


                                <h1 className="font-semibold text-lg mt-4">
                                    9. Laufzeit und Beendigung
                                </h1>
                                <div>
                                    Die Registrierung läuft auf unbestimmte Zeit und kann jederzeit vom Nutzer gekündigt werden. 
                                    Dies kann durch eine entsprechende Mitteilung an uRent erfolgen.
                                    uRent kann die Registrierung unter Einhaltung einer Kündigungsfrist von zwei Wochen kündigen.
                                     Die Gründe für eine Kündigung werden dem Nutzer mitgeteilt.
                                </div>


                                <h1 className="font-semibold text-lg mt-4">
                                    10. Haftung
                                </h1>
                                <div>
                                    uRent haftet nach den gesetzlichen Bestimmungen für Schäden der Nutzer, 
                                    sofern diese vorsätzlich oder grob fahrlässig verursacht wurden.
                                    Für indirekte Schäden oder entgangene Gewinne haftet uRent nur bei Vorliegen von Vorsatz 
                                    oder grober Fahrlässigkeit.
                                </div>

                                <h1 className="font-semibold text-lg mt-4">
                                    11. Änderungen der Allgemeinen Nutzungsbedingungen
                                </h1>
                                <div>
                                    uRent behält sich das Recht vor, 
                                    die Nutzungsbedingungen zu ändern und informiert die Nutzer über geplante Änderungen rechtzeitig. 
                                    Nutzer haben das Recht, diesen Änderungen zu widersprechen und das Nutzungsverhältnis zu beenden.
                                </div>

                                <h1 className="font-semibold text-lg mt-4">
                                    12. Sonstiges
                                </h1>
                                <div>
                                    Der Nutzer ist nicht zur Aufrechnung berechtigt. 
                                    Dies bedeutet, dass er keine Gegenforderungen gegenüber uRent einfordern kann.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgbsPage;