import { Button } from "@/components/ui/button";
import { format, parse } from "date-fns";
import { FaFileDownload } from "react-icons/fa";


interface ExistingInvoicesProps {
    foundInvoice: any
}


const ExistingInvoices: React.FC<ExistingInvoicesProps> = ({
    foundInvoice
}) => {

    const onDownload = () => {
        try {

        } catch (e: any) {
            console.log("Fehler beim Erstellen der PDF Datei: ", e)
        }
    }



    return (
        <div className="mb-2">
            <div>
                <div className="p-4 dark:bg-[#0F0F0F] rounded-md text-sm space-x-2">

                    <div className="flex items-center">
                        <div className="font-semibold w-1/4 text-xs">
                            {foundInvoice.id}
                        </div>
                        <div className="font-semibold w-1/8">
                            {format(new Date(foundInvoice.period_start * 1000), 'dd.MM.yyyy')}
                        </div>
                        <div>
                            {foundInvoice.metadata?.plan}
                        </div>
                        <div className="ml-auto">
                            <Button size="sm" variant="ghost" className="dark:bg-[#1C1C1C]">
                                <FaFileDownload
                                    className="w-4 h-4"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExistingInvoices;