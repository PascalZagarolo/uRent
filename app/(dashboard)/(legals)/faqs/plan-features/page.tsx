import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, 
    BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";


const FaqPlanFeatures = () => {
    return (
        <div>

            <div className="flex justify-center sm:p-8 bg-[#404040]/10">

                <div className="sm:w-[1044px] w-full dark:bg-[#1c1c1c] rounded-md bg-white">
                    <div className="min-h-screen">
                        <div className="sm:p-4 p-2 mt-4  rounded-lg ">
                            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                                Inhalte & Features - Häufig gestellte Fragen
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
                                            <BreadcrumbPage>Plan Features</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <div className="p-4">
                                <div>
                                    <h3 className="text-md font-semibold">
                                        Inseratspriorisierung bei der Suche
                                    </h3>
                                    <div className=" text-sm text-gray-200/90">

                                        Falls Sie den Plan {`"`}Premium{`"`} oder {`"`}Enterprise{`"`} abonniert haben,
                                        werden Ihre Inserate von unserem Suchalgorithmus priorisiert.
                                        Dadurch erhalten Sie eine bessere Sichtbarkeit und stark erhöhte Chancen,
                                        potenzielle Kunden zu erreichen.


                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-md font-semibold">
                                        Funktionsumfang „Priorisierung bei der Suche“
                                    </h3>
                                    <div className=" text-sm text-gray-200/90">

                                        Die in Abonnement-Paket {`"`}Premium{`"`} und {`"`}Enterprise{`"`} enthaltene Funktion
                                        {` "`}Priorisierung bei der Suche{`"`} beinhaltet die bevorzugte Positionierung von
                                        {` "`}Premium/Enterprise{`"`} -Inseraten auf der Startseite und beim Anzeigen von Ergebnissen durch
                                        Nutzung des Suchfilters.<br />
                                        Inserate von Premium- und Enterprise Kunden werden dabei als gleichwertig betrachtet. <br />
                                        Die vorrangige Positionierung findet nur statt, wenn keine manuelle Sortierung der
                                        Inserate vorgenommen wurde.

                                    </div>
                                </div>

                                <div className="mt-16">
                                    <h3 className="text-md font-semibold">
                                        Hervorhebung von Inseraten
                                    </h3>
                                    <div className=" text-sm text-gray-200/90">
                                        Falls Sie den Plan {`"`}Premium{`"`} oder {`"`}Enterprise{`"`} abonniert haben,
                                        können Sie Ihr/e Inserat/e hervorheben. <br />   Die Hervorhebung erfolgt durch eine farbliche Umrandung,
                                        die Ihr Inserat auffälliger macht und die Aufmerksamkeit potenzieller Kunden erhöht.
                                        Nutzen Sie diese Funktion, um die Sichtbarkeit Ihres Angebots zu steigern und sich von der Konkurrenz abzuheben. <br />
                                        Wenn Sie den Plan {`"`}Enterprise{`"`} abonniert haben,
                                        können Sie zusätzlich die Farbe der Umrandung individuell anpassen.
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-md font-semibold">
                                        Funktionsumfang Hervorhebung von Inseraten
                                    </h3>
                                    <div className="p-4 text-sm text-gray-200/90">
                                        <Label className="font-semibold text-lg">
                                            Premium
                                        </Label>
                                        <div className="mt-2 px-2">
                                        - Hervorhebung eines Inserats: Als Premium-Nutzer können Sie ein Inserat hervorheben. <br/>
                                        Dies erfolgt durch eine farbliche Umrandung, 
                                        die Ihr Inserat auffälliger macht und die Aufmerksamkeit potenzieller Kunden erhöht.
                                        </div>
                                    
                                        <div className="mt-4">
                                        <Label className="font-semibold text-lg">
                                            Enterprise
                                        </Label>
                                        <div className="mt-2 px-2">
                                        - Hervorhebung von bis zu zwei Inseraten: Als Enterprise-Nutzer können Sie bis zu zwei Inserate hervorheben, vorausgesetzt, 
                                        Ihr abonniertes Plan-Paket erlaubt mehr als ein Inserat. <br/>
                                        Diese zusätzliche Hervorhebung erhöht die Sichtbarkeit Ihrer Angebote deutlich.
                                        </div>
                                        <div className="mt-2 px-2">
                                        Anpassbare Farbliche Umrandung: Zusätzlich zur Möglichkeit, zwei Inserate hervorzuheben, 
                                        können Enterprise-Nutzer die Farbe der Umrandung individuell anpassen. <br/>
                                        Dies ermöglicht eine farbliche Abstimmung passend zu Ihrem Inserat, 
                                        was die visuelle Attraktivität und Erkennbarkeit Ihrer Angebote weiter steigert.
                                        </div>
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

export default FaqPlanFeatures;