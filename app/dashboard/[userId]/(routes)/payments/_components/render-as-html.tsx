'use client'

import { Button } from "@/components/ui/button";
import { FaFileDownload } from "react-icons/fa";
import InvoiceTemplate from "./invoice-template";

import { PDFDownloadLink, PDFViewer, Document, Page, Text } from "@react-pdf/renderer";


interface RenderAsHtmlProps {
    price : number;
    invoice_no : string;
    address : Object;
    plan : string;
    amount : number;
    date : string;
}

const RenderAsHtml : React.FC<RenderAsHtmlProps> = ({
    price, invoice_no, address, plan, amount, date
}) => {


    

console.log(address)


            



    return (
        <div>
            <PDFDownloadLink document={
                <InvoiceTemplate 
                price={price}
                invoice_no={invoice_no}
                address={address}
                plan={plan}
                amount={amount}
                date={date}
        
                />
            } fileName="fee_acceptance.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <Button size="sm" variant="ghost" className="dark:bg-[#1C1C1C]"
                
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