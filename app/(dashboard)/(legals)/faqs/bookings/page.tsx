import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const FaqBookings = () => {
    return (
        <div>

            <div className="flex justify-center sm:p-8 bg-[#404040]/10">

                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="min-h-screen">
                        <div className="sm:p-4 p-2 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                Das Buchungssystem - Häufig gestellte Fragen
                            </h3>
                            <div className="pb-2">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/faqs">Faqs</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Buchungssystem</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <div className="p-4">
                                <div>
                                    <h3 className="text-md font-semibold">
                                    Der Buchungskalender
                                    </h3>
                                    <div className=" text-sm text-gray-200/90">

                                    Neben der Verwaltung aller Fahrzeuge, dem Eintragen von Buchungen hast Du vor allem 
                                    die Möglichkeit, 
                                    dir alle Daten strukturiert anzeigen zu lassen. Wenn Du ein Inserat, bzw. ein Fahrzeug 
                                    bei einem Flotteninserat ausgewählt hast, 
                                    werden alle eingegebenen Buchungsdaten in der Monatsansicht und Tagesansicht dargestellt. 
                                    Darüber hinaus kann durch klicken auf die jeweiligen Buchungen eine 
                                    detaillierte Übersicht geöffnet werden. Du hast also die Möglichkeit, 
                                    Dein Mietgeschehen immer im Blick zu behalten. 
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-md font-semibold">
                                    Einfluss von Verfügbarkeiten und Buchungen auf die Inserats Darstellung
                                    </h3>
                                    <div className=" text-sm text-gray-200/90">
                                    Ein großer Vorteil beim Eintragen von Verfügbarkeiten ist die Übersicht für den Mieter. 
                                    Das regelmäßige Verwalten von Buchungen und Verfügbarkeiten dient nämlich nicht nur der persönlichen Darstellung 
                                    und Übersicht, sondern hat auch Einfluss auf die Darstellung des Fahrzeugs im entsprechenden Inserat. 
                                    Potentielle Mieter kriegen dort in Form eines Verfügbarkeitskalenders alle verfügbaren Tage angezeigt. 
                                    So wird der Mietprozess deutlich verkürzt und Anfragen zu belegten Tagen werden vermieden. Wenn Flotteninserate verwaltet werden, 
                                    wird dem Mieter automatisch, wenn möglich ein verfügbares Fahrzeug angezeigt.
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-md font-semibold">
                                    Der Unterschied zwischen Buchungen und Verfügbarkeiten
                                    </h3>
                                    <div className=" text-sm text-gray-200/90">
                                    Buchungen und Verfügbarkeiten haben zunächst den selben Einfluss auf die Darstellung der Verfügbarkeit 
                                    im entsprechenden Inserat für den Mieter. Die Unterscheidung liegt in der persönlichen Darstellung. 
                                    Der Vorteil beim Erstellen von Buchungen ist, dass hier deutlich mehr Informationen beispielsweise zum Mieter 
                                    und zum Fahrzeug eingetragen werden können, welche dann zusätzlich 
                                    zur Verfügbarkeit im persönlichen Buchungskalender einsehbar sind. Das Erstellen von Verfügbarkeiten 
                                    dient hingegen dem lediglich schnellen Eintragen der Zeitspanne, in der ein Fahrzeug nicht verfügbar ist. 
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-md font-semibold">
                                    Flotteninserate & Fahrzeuge
                                    </h3>
                                    <div className=" text-sm text-gray-200/90">
                                    Bei mehreren identischen Fahrzeugen kann ein Flotteninserat erstellt werden, 
                                    um die Verwaltung zu vereinfachen. Flotteninserate ermöglichen es, die einzelnen Fahrzeuge im Detail 
                                    zu verwalten und gleichzeitig nur ein Inserat zu erstellen. Zudem hilft es, stehts den Überblick zu behalten, 
                                    da jedes Fahrzeug seine eigenen Buchungen und Verfügbarkeiten haben kann. Dem Mieter wird dabei automatisch, 
                                    wenn möglich immer ein Verfügbares Fahrzeug angezeigt. Dies vereinfacht 
                                    das regelmäßige Verwalten von Verfügbarkeiten und Buchungen und verkürzt den Mietprozess, 
                                    da potentielle Mieter zeitlich passende Anfragen stellen. 
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-md font-semibold">
                                    Die Verwaltung von Anfragen
                                    </h3>
                                    <div className=" text-sm text-gray-200/90">
                                    Um den Mietprozess noch weiter zu verkürzen, hat der Mieter die Möglichkeit Buchungsanfragen zu stellen. 
                                    Diese können entweder im Chat oder direkt auf der Buchungs-Seite eingesehen werden. 
                                    Auf der Buchungsseite ergibt sich der große Vorteil, 
                                    Schnellanfragen direkt einzusehen, eine passende auszuwählen und diese anschließend direkt zu verwalten. 
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

export default FaqBookings;