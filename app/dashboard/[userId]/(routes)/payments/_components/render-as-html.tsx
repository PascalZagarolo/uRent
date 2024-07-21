'use client'

import { Button } from "@/components/ui/button";
import { FaFileDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import InvoiceTemplate from "./invoice-template";
import { useRef } from "react";
import { renderToString } from "react-dom/server";



const RenderAsHtml = () => {



    

   

    


    return (
        <div>

            <Button size="sm" variant="ghost" className="dark:bg-[#1C1C1C]"
            onClick={() => {}}
            >
                <FaFileDownload
                    className="w-4 h-4"
                />
            </Button>

        </div>
    );
}

export default RenderAsHtml;