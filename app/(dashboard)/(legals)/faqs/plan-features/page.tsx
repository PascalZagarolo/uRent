import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

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

                                        Das Buchungssystem macht es dir kinderleicht, Buchungen und Verfügbarkeiten hinzuzufügen, und hilft dir,
                                        stets den Überblick zu bewahren. Es ermöglicht deinen Mietern,
                                        die Verfügbarkeit deiner Fahrzeuge einzusehen, ohne redundante Anfragen stellen zu müssen,
                                        und spart dir dadurch wertvolle Zeit. 
                                        Die einfache Bedienung sorgt dafür, dass du den Kopf für andere Aufgaben frei hast.
                                        So wird die Verwaltung deiner Fahrzeuge effizienter, kundenfreundlicher .
                                    </div>
                                </div>

                                <div className="mt-16">
                                    <h3 className="text-md font-semibold">
                                        Hervorhebung von Inseraten
                                    </h3>
                                    <div className=" text-sm text-gray-200/90">
                                    Bei mehreren identischen Fahrzeugen kann ein Flotteninserat erstellt werden, 
                                    um die Verwaltung zu vereinfachen. Fahrzeuge ermöglichen es, die einzelnen Flotteninserate im Detail zu verwalten 
                                    und den Überblick zu behalten, da jedes Fahrzeug seine eigenen Buchungen und Verfügbarkeiten haben kann. 
                                    Der Mieter sieht dabei nur die generelle Verfügbarkeit, unabhängig vom einzelnen Fahrzeug. Dies macht es für den Vermieter leicht, 
                                    Verfügbarkeiten und Buchungen zu verwalten, und für den Mieter einfach, passende Inserate zu finden.
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