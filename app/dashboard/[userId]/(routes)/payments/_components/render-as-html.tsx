'use client'

import { Button } from "@/components/ui/button";
import { FaFileDownload } from "react-icons/fa";
import InvoiceTemplate from "./invoice-template";

import { PDFDownloadLink, PDFViewer, Document, Page, Text } from "@react-pdf/renderer";


interface RenderAsHtmlProps {
    price: number;
    invoice_no: string;
    address: {
        city: string,
        country: string,
        line1: string,
        line2: string,
        postal_code: string,
        state: string
    };
    plan: string;
    amount: number;
    date: string;

}

const RenderAsHtml: React.FC<RenderAsHtmlProps> = ({
    price, invoice_no, address, plan, amount, date
}) => {




    


console.log(plan)



    return (
        <div>
            <PDFDownloadLink document={
                <InvoiceTemplate
                    price={price as any}
                    invoice_no={invoice_no}
                    address={address}
                    plan={plan}
                    amount={amount}
                    date={date}

                />
            } fileName="Rechnung.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Lädt..' : <Button size="sm" variant="ghost" className="dark:bg-[#222222] shadow-lg"

                >
                    <FaFileDownload
                        className="w-4 h-4"
                    />
                </Button>)}

            </PDFDownloadLink>
        </div>
    );
}

export default RenderAsHtml;