'use client'

import { Button } from "@/components/ui/button";
import { FaFileDownload } from "react-icons/fa";
import InvoiceTemplate from "./invoice-template";

import { PDFDownloadLink, PDFViewer, Document, Page, Text } from "@react-pdf/renderer";



const RenderAsHtml = () => {


    




            



    return (
        <div>
            <PDFDownloadLink document={
                <InvoiceTemplate />
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