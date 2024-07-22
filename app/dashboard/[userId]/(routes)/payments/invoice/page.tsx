'use client'

const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    },
);
import dynamic from "next/dynamic";
import InvoiceTemplate from "../_components/invoice-template";
import { PDFViewer, Text, Document, Page } from "@react-pdf/renderer";





const InvoicePage = () => {
    return (
        <div>
            22
        </div>
    );
}

export default InvoicePage;