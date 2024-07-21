import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { format, parse } from "date-fns";
import { FaFileDownload } from "react-icons/fa";
import { PiDotsThreeOutlineFill } from "react-icons/pi";


interface ExistingInvoicesProps {
    foundInvoice: any
}


const ExistingInvoices: React.FC<ExistingInvoicesProps> = async ({
    foundInvoice
}) => {

    const onDownload = () => {
        try {

        } catch (e: any) {
            console.log("Fehler beim Erstellen der PDF Datei: ", e)
        }
    }

    //console.log(foundInvoice.lines.data[0].price.unit_amount)

    const matchingProduct = await stripe.products.retrieve(
        foundInvoice.lines.data[0].price.product as string
    )

    //console.log(matchingProduct.metadata)

    const convertedPrice = foundInvoice.lines.data[0].price.unit_amount / 100

    return (
        <div className="mb-2">
            <div className="">
                <div className="p-4 dark:bg-[#0F0F0F] rounded-md text-sm">

                    <div className="flex items-center">
                        <div className="font-semibold w-1/4 text-xs">
                            {foundInvoice.id}
                        </div>
                        <div className="font-semibold w-1/6">
                            {format(new Date(foundInvoice.period_start * 1000), 'dd.MM.yyyy')}
                        </div>
                        <div className="w-1/4">
                        {matchingProduct.metadata?.type.slice(0,1)}{matchingProduct.metadata?.type.slice(1).toLowerCase()} ({matchingProduct.metadata.amount})
                        </div>
                        <div className="text-sm font-semibold w-1/6 ">
                            {convertedPrice} €
                        </div>
                        <div className="ml-auto space-x-2">
                            <Button size="sm" variant="ghost" className="dark:bg-[#1C1C1C]">
                                <FaFileDownload
                                    className="w-4 h-4"
                                />
                            </Button>
                            <Button size="sm" variant="ghost" className="dark:bg-[#1C1C1C]">
                                <PiDotsThreeOutlineFill 
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