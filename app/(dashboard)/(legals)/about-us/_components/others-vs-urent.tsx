import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, CheckIcon, XCircleIcon, XIcon } from "lucide-react";

const OtherVSUrent = () => {
    return (
        <div>
            <div className="text-lg font-semibold">
                Was unterscheidet uRent von anderen Anbietern?
            </div>
            <div className="mt-4">
                <Table>
                    
                    <TableHeader>
                        <TableRow className="bg-[#222222] border-b border-transparent rounded-t-md shadow-md">
                            <TableHead className="w-1/3"></TableHead>
                            <TableHead className="w-1/3 text-xl text-gray-200 font-semibold">uRent</TableHead>
                            <TableHead className="w-1/3 text-lg text-gray-200/40 font-normal">andere Anbieter</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody className="gap-y-4">
                        <TableRow className="border-b border-transparent" >
                            <TableCell className="font-medium">Erreichen von Kunden & Mietern</TableCell>
                            <TableCell className="flex flex-row items-center">Registrieren <ArrowRight className="w-4 h-4 mx-2" /> Inserat schalten <ArrowRight className="w-4 h-4 mx-2" /> Kunden erreichen
                            </TableCell>
                            <TableCell className="text-gray-200/60">meist sehr aufwendig, eigene Website erstellen & verwalten ist sehr aufwendig. 
                            Bekannte Lösungen sind keine gesonderte Mietumgebung und bieten nicht die richtigen Tools & Kundschaft um seine Fahrzeuge zu präsentieren</TableCell>
                        </TableRow>
                        <TableRow className="border-b border-transparent" >
                            <TableCell className="font-medium">Kontaktaufnahme zwischen Mietern & Vermietern</TableCell>
                            <TableCell className="">
                            <CheckIcon className="w-6 h-6 text-emerald-600 mb-2" />
                            Direkte Kommunikation über die Plattform möglich, um schnell und einfach Fragen zu klären und Mietprozesse abzuwickeln
                            </TableCell>
                            <TableCell className="text-gray-200/60">
                            <XIcon className="w-6 h-6 text-rose-600 mb-2" />
                            Ausschließlich stockender Kontakt über E-Mail oder Telefon, keine direkte Kommunikation über die Plattform
                            </TableCell>
                        </TableRow>
                        <TableRow className="border-b border-transparent" >
                            <TableCell className="font-medium">einfache Registrierung in nur wenigen Schritten</TableCell>
                            <TableCell><CheckIcon className="w-6 h-6 text-emerald-600" /></TableCell>
                            <TableCell><XIcon className="w-6 h-6 text-rose-600" /></TableCell>
                        </TableRow>
                        <TableRow className="border-b border-transparent" >
                            <TableCell className="font-medium">optimierte Mietplattform ausgelegt auf Fahrzeuge</TableCell>
                            <TableCell><CheckIcon className="w-6 h-6 text-emerald-600" /></TableCell>
                            <TableCell><XIcon className="w-6 h-6 text-rose-600" /></TableCell>
                        </TableRow>
                        <TableRow className="border-b border-transparent">
                            <TableCell className="font-medium">Präsenz auch außerhalb der Website, z.B. das Auffinden durch Suchmaschinen wie Google</TableCell>
                            <TableCell><CheckIcon className="w-6 h-6 text-emerald-600" /></TableCell>
                            <TableCell><XIcon className="w-6 h-6 text-rose-600" /></TableCell>
                        </TableRow>
                        <TableRow className="border-b border-transparent">
                            <TableCell className="font-medium">Diverse Verwaltungstools, die es ermöglichen Fahrzeuge, Buchungen sowie deinen eigenen Terminkalender zu verwalten</TableCell>
                            <TableCell><CheckIcon className="w-6 h-6 text-emerald-600" /></TableCell>
                            <TableCell><XIcon className="w-6 h-6 text-rose-600" /></TableCell>
                        </TableRow>
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter> */}
                </Table>
            </div>
        </div>
    );
}

export default OtherVSUrent;