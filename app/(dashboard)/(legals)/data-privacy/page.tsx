import { Separator } from "@/components/ui/separator";
import HeaderLogo from "../../_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";

const DataPrivacy = async () => {

    const currentUser = await getCurrentUser();

    const notifications = await db.notification.findMany({
        where: {
            userId: currentUser?.id
        }
    })

    return (

        <div>
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    notifications={notifications} />
            </div>
            <div className="flex justify-center p-8">

                <div className="w-[1044px] dark:bg-[#1c1c1c] rounded-md ">
                    <div className="  min-h-screen">
                        <div className="p-4 mt-4 dark:bg-[#161616] rounded-lg">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold ">
                                uRent - Datenschutzerklärung
                            </h3>
                        </div>

                        <div className="px-8">

                        </div>

                        <div className="p-8 text-sm dark:text-gray-300/90">

                            <div>
                                <div>
                                    Wir freuen uns sehr über Ihr Interesse an unserem Unternehmen. Datenschutz hat
                                    einen besonders hohen Stellenwert für die Geschäftsleitung der uRent. Eine Nutzung
                                    der Internetseiten der uRent ist grundsätzlich ohne jede Angabe personenbezogener
                                    Daten möglich. Sofern eine betroffene Person besondere Services unseres
                                    Unternehmens über unsere Internetseite in Anspruch nehmen möchte, könnte jedoch
                                    eine Verarbeitung personenbezogener Daten erforderlich werden. Ist die
                                    Verarbeitung personenbezogener Daten erforderlich und besteht für eine solche
                                    Verarbeitung keine gesetzliche Grundlage, holen wir generell eine Einwilligung der
                                    betroffenen Person ein.
                                </div>
                                <div className="mt-2">
                                    Die Verarbeitung personenbezogener Daten, beispielsweise des Namens, der
                                    Anschrift, E-Mail-Adresse oder Telefonnummer einer betroffenen Person, erfolgt
                                    stets im Einklang mit der Datenschutz-Grundverordnung und in Übereinstimmung mit
                                    den für die uRent geltenden landesspezifischen Datenschutzbestimmungen. Mittels
                                    dieser Datenschutzerklärung möchte unser Unternehmen die Öffentlichkeit über Art,
                                    Umfang und Zweck der von uns erhobenen, genutzten und verarbeiteten
                                    personenbezogenen Daten informieren. Ferner werden betroffene Personen mittels
                                    dieser Datenschutzerklärung über die ihnen zustehenden Rechte aufgeklärt.
                                </div>
                                <div className="mt-2">
                                    Die uRent hat als für die Verarbeitung Verantwortlicher zahlreiche technische und
                                    organisatorische Maßnahmen umgesetzt, um einen möglichst lückenlosen Schutz
                                    der über diese Internetseite verarbeiteten personenbezogenen Daten
                                    sicherzustellen. Dennoch können Internetbasierte Datenübertragungen grundsätzlich
                                    Sicherheitslücken aufweisen, sodass ein absoluter Schutz nicht gewährleistet werden
                                    kann. Aus diesem Grund steht es jeder betroffenen Person frei, personenbezogene
                                    Daten auch auf alternativen Wegen, beispielsweise telefonisch, an uns zu
                                    übermitteln.
                                </div>
                            </div>

                            <div className="p-4 mt-8">
                                <h1 className="font-semibold text-lg">
                                    1. Begriffsbestimmungen
                                </h1>
                                <p>
                                    Die Datenschutzerklärung der uRent beruht auf den Begrifflichkeiten, die durch den
                                    Europäischen Richtlinien- und Verordnungsgeber beim Erlass der Datenschutz
                                    Grundverordnung (DS-GVO) verwendet wurden. Unsere Datenschutzerklärung soll
                                    sowohl für die Öffentlichkeit als auch für unsere Kunden und Geschäftspartner
                                    einfach lesbar und verständlich sein. Um dies zu gewährleisten, möchten wir vorab
                                    die verwendeten Begrifflichkeiten erläutern.
                                </p>
                                <p className="mt-2">
                                    Wir verwenden in dieser Datenschutzerklärung unter anderem die folgenden Begriffe:
                                </p>
                                <div className="p-4">
                                    <p className="mb-2 font-semibold">  a)    personenbezogene Daten </p>
                                    Personenbezogene Daten sind alle Informationen, die sich auf eine
                                    identifizierte oder identifizierbare natürliche Person (im Folgenden „betroffene
                                    Person“) beziehen. Als identifizierbar wird eine natürliche Person angesehen,
                                    die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie
                                    einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online
                                    Kennung oder zu einem oder mehreren besonderen Merkmalen, die Ausdruck
                                    der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen,
                                    kulturellen oder sozialen Identität dieser natürlichen Person sind, identifiziert
                                    werden kann.

                                </div>


                                <div className="p-4">
                                    <p className="mb-2 font-semibold">  b)    betroffene Person  </p>
                                    Betroffene Person ist jede identifizierte oder identifizierbare natürliche Person,
                                    deren personenbezogene Daten von dem für die Verarbeitung
                                    Verantwortlichen verarbeitet werden.

                                </div>

                                <div className="p-4">
                                    <p className="mb-2 font-semibold"> c)    Verarbeitung </p>
                                    Verarbeitung ist jeder mit oder ohne Hilfe automatisierter Verfahren
                                    ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit
                                    personenbezogenen Daten wie das Erheben, das Erfassen, die Organisation,
                                    das Ordnen, die Speicherung, die Anpassung oder Veränderung, das
                                    Auslesen, das Abfragen, die Verwendung, die Offenlegung durch
                                    Übermittlung, Verbreitung oder eine andere Form der Bereitstellung, den
                                    Abgleich oder die Verknüpfung, die Einschränkung, das Löschen oder die
                                    Vernichtung.
                                </div>

                                <div className="p-4">
                                    <p className="mb-2 font-semibold"> d)    Einschränkung der Verarbeitung  </p>
                                    Einschränkung der Verarbeitung ist die Markierung gespeicherter
                                    personenbezogener Daten mit dem Ziel, ihre künftige Verarbeitung
                                    einzuschränken.
                                </div>

                                <div className="p-4">
                                    <p className="mb-2 font-semibold"> e)    Profiling   </p>
                                    Profiling ist jede Art der automatisierten Verarbeitung personenbezogener
                                    Daten, die darin besteht, dass diese personenbezogenen Daten verwendet
                                    werden, um bestimmte persönliche Aspekte, die sich auf eine natürliche
                                    Person beziehen, zu bewerten, insbesondere, um Aspekte bezüglich
                                    Arbeitsleistung, wirtschaftlicher Lage, Gesundheit, persönlicher Vorlieben,
                                    Interessen, Zuverlässigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser
                                    natürlichen Person zu analysieren oder vorherzusagen.
                                </div>

                                <div className="p-4">
                                    <p className="mb-2 font-semibold"> f)     Pseudonymisierung    </p>
                                    Pseudonymisierung ist die Verarbeitung personenbezogener Daten in einer
                                    Weise, auf welche die personenbezogenen Daten ohne Hinzuziehung
                                    zusätzlicher Informationen nicht mehr einer spezifischen betroffenen Person
                                    zugeordnet werden können, sofern diese zusätzlichen Informationen
                                    gesondert aufbewahrt werden und technischen und organisatorischen
                                    Maßnahmen unterliegen, die gewährleisten, dass die personenbezogenen
                                    Daten nicht einer identifizierten oder identifizierbaren natürlichen Person
                                    zugewiesen werden.
                                </div>

                                <div className="p-4">
                                    <p className="mb-2 font-semibold"> g)    Verantwortlicher oder für die Verarbeitung Verantwortlicher    </p>
                                    Verantwortlicher oder für die Verarbeitung Verantwortlicher ist die natürliche
                                    oder juristische Person, Behörde, Einrichtung oder andere Stelle, die allein
                                    oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung
                                    von personenbezogenen Daten entscheidet. Sind die Zwecke und Mittel
                                    dieser Verarbeitung durch das Unionsrecht oder das Recht der Mitgliedstaaten
                                    vorgegeben, so kann der Verantwortliche beziehungsweise können die
                                    bestimmten Kriterien seiner Benennung nach dem Unionsrecht oder dem
                                    Recht der Mitgliedstaaten vorgesehen werden.
                                </div>

                                <div className="p-4">
                                    <p className="mb-2 font-semibold"> h)    Auftragsverarbeiter    </p>
                                    Auftragsverarbeiter ist eine natürliche oder juristische Person, Behörde,
                                    Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des
                                    Verantwortlichen verarbeitet.
                                </div>

                                <div className="p-4">
                                    <p className="mb-2 font-semibold"> i)      Empfänger     </p>
                                    Empfänger ist eine natürliche oder juristische Person, Behörde, Einrichtung
                                    oder andere Stelle, der personenbezogene Daten offengelegt werden,
                                    unabhängig davon, ob es sich bei ihr um einen Dritten handelt oder nicht.
                                    Behörden, die im Rahmen eines bestimmten Untersuchungsauftrags nach
                                    dem Unionsrecht oder dem Recht der Mitgliedstaaten möglicherweise
                                    personenbezogene Daten erhalten, gelten jedoch nicht als Empfänger.
                                </div>

                                <div className="p-4">
                                    <p className="mb-2 font-semibold"> j)      Dritter    </p>
                                    Dritter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder
                                    andere Stelle außer der betroffenen Person, dem Verantwortlichen, dem
                                    Auftragsverarbeiter und den Personen, die unter der unmittelbaren
                                    Verantwortung des Verantwortlichen oder des Auftragsverarbeiters befugt
                                    sind, die personenbezogenen Daten zu verarbeiten.
                                </div>

                                <div className="p-4">
                                    <p className="mb-2 font-semibold"> k)    Einwilligung     </p>
                                    Einwilligung ist jede von der betroffenen Person freiwillig für den bestimmten
                                    Fall in informierter Weise und unmissverständlich abgegebene
                                    Willensbekundung in Form einer Erklärung oder einer sonstigen eindeutigen
                                    bestätigenden Handlung, mit der die betroffene Person zu verstehen gibt,
                                    dass sie mit der Verarbeitung der sie betreffenden personenbezogenen Daten
                                    einverstanden ist.
                                </div>

                                <div>
                                    <h1 className="font-semibold text-lg">
                                        2. Name und Anschrift des für die Verarbeitung Verantwortlichen
                                    </h1>
                                    <p>
                                        Verantwortlicher im Sinne der Datenschutz-Grundverordnung, sonstiger in den
                                        Mitgliedstaaten der Europäischen Union geltenden Datenschutzgesetze und anderer
                                        Bestimmungen mit datenschutzrechtlichem Charakter ist die:
                                    </p>

                                    <div className="  p-2">
                                        <p className="mt-1">
                                            uRent
                                        </p>
                                        <p className="mt-1">
                                            Sonnenstraße 24
                                        </p>
                                        <p className="mt-1">
                                            42659 Solingen

                                        </p>
                                        <p className="mt-1">
                                            Deutschland
                                        </p>
                                        <p className="mt-1">
                                            Tel.: +49123456789
                                        </p>
                                        <p className="mt-1">
                                            E-Mail: support@urent.de
                                        </p>
                                        <p className="mt-1">
                                            Website: www.u-rent-rental.de
                                        </p>
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

export default DataPrivacy;