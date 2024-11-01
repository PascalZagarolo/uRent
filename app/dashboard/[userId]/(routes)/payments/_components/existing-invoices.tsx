'use client'

import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { format, parse } from "date-fns";
import { FaFileDownload } from "react-icons/fa";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import RenderAsHtml from "./render-as-html";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { getMatchingProduct } from "@/actions/stripe/action-stripe";
import { Skeleton } from "@/components/ui/skeleton";


interface ExistingInvoicesProps {
    foundInvoice: any
}


const ExistingInvoices: React.FC<ExistingInvoicesProps> = ({
    foundInvoice
}) => {




    const [loading, setLoading] = useState<boolean>(true)
    const [matchingProduct, setMatchingProduct] = useState<any>(undefined);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const retrieved = await getMatchingProduct(foundInvoice.lines.data[0]?.price?.product as string)
                if(!retrieved) {
                    setLoading(false)
                }
                setMatchingProduct(retrieved)
                setLoading(false)
            } catch (e: any) {
                console.log(e)
            }
        }

        loadProduct()
    }, [])

    if (!matchingProduct && loading) {
        return (
            <div className="p-4 dark:bg-[#171717] shadow-lg rounded-md text-sm animate-pulse">
                <div className="flex items-center">
                    <div className="h-4 w-3/4 bg-[#191919] rounded-md shimmer-effect"></div>
                    <div className="ml-auto space-x-2 flex items-center">
                        <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="dark:bg-[#1C1C1C]">
                                <FaFileDownload
                                    className="w-4 h-4 animate-spin" 
                                />
                            </Button>
                            <Button size="sm" variant="ghost" className="dark:bg-[#1C1C1C]">
                                <PiDotsThreeOutlineFill
                                    className="w-4 h-4 animate-spin-slow"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    //If no product is found, return null
    if(!loading && !matchingProduct) {
        return null;
    }
    



    //console.log(matchingProduct.metadata)

    const convertedPrice = foundInvoice.lines.data[0].price.unit_amount / 100

    const usedAddress = foundInvoice.customer_address

    return (
        <div className="mt-0 mb-4">
            <div className="">
                <div className="p-4 dark:bg-[#222222] rounded-md text-sm shadow-lg">
                    <div className="flex items-center">
                        <div className="font-medium w-1/4 text-gray-200/90  line-clamp-1 break-all">
                            {foundInvoice.id}
                        </div>
                        <div className="font-semibold w-1/6 ">
                            {format(new Date(foundInvoice.period_start * 1000), 'dd.MM')}
                        </div>
                        <div className="w-1/4 text-left text-sm">
                            {matchingProduct.metadata?.type.slice(0, 1)}{matchingProduct.metadata?.type.slice(1).toLowerCase()} ({matchingProduct.metadata.amount})
                        </div>
                        <div className="text-sm font-semibold w-1/6 ">
                            {convertedPrice} €
                        </div>
                        <div className="ml-auto space-x-2 flex items-center">
                            <div>
                                <RenderAsHtml
                                    price={convertedPrice}
                                    invoice_no={foundInvoice.id}
                                    address={usedAddress}
                                    plan={matchingProduct.name}
                                    amount={convertedPrice}
                                    date={format(new Date(foundInvoice.period_start * 1000), 'dd.MM.yyyy')}
                                />
                            </div>
                            {/* <Button size="sm" variant="ghost" className="dark:bg-[#1C1C1C]">
                                <PiDotsThreeOutlineFill
                                    className="w-4 h-4"
                                />
                            </Button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExistingInvoices;