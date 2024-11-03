'use client'


import { TableCell, TableRow } from "@/components/ui/table";
import RenderAsHtml from "./render-as-html";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getMatchingCustomer, getMatchingProduct } from "@/actions/stripe/action-stripe";



interface TableRowProps {
  invoiceId: string;
  unitAmount: number;
  description: string;
  createdAt: string;
  periodStart: number;
  productId: string;
  customerId : string;
  paid: boolean;
  isUpgrade: boolean;
}

const TableRowRender = ({
  invoiceId,
  unitAmount,
  description,
  createdAt,
  periodStart,
  productId,
  customerId,
  paid,
  isUpgrade,
}: TableRowProps) => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const retrieved = await getMatchingProduct(productId as string)
        const retrievedCustomer = await getMatchingCustomer(customerId as string)
        if (!retrieved || !retrievedCustomer) {
          setLoading(false)
        }
        setMatchingProduct(retrieved)
        setCustomer(retrievedCustomer)
        setLoading(false)
      } catch (e: any) {
        console.log(e)
      }
    }

    loadProduct()
  }, [])

  const [product, setMatchingProduct] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);

 

  const renderedDescription = description ? description : product?.name + " (" +  product?.metadata?.amount + ") "

  return (
    <TableRow key={invoiceId}>
      <TableCell className="font-medium break-all text-gray-200/60 ">{invoiceId}</TableCell>
      <TableCell>
        {paid ? (
          <div className="text-emerald-500 font-semibold">
            <span>Bezahlt</span>
          </div>
        ) : (
          <div className="text-rose-600">
            <span>Ausstehend</span>
          </div>
        )}
      </TableCell>
      <TableCell className="font-semibold">{renderedDescription}</TableCell>
      <TableCell className="font-semibold">
        {isUpgrade ? (
          <span className="text-gray-200/60 font-medium">Einmalig</span>
        ) : (
          <span className="text-indigo-600 font-semibold">Abo-Zyklus</span>
        )}
      </TableCell>
      <TableCell>{createdAt}</TableCell>
      <TableCell className="text-right">{unitAmount / 100} €</TableCell>
      <TableCell className="text-right">
        <div>
          <RenderAsHtml
            price={unitAmount / 100}
            invoice_no={invoiceId}
            address={
              {
                city: customer?.address?.city,
                country: customer?.address?.country,
                line1: customer?.address?.line1,
                line2: customer?.address?.line2,
                postal_code: customer?.address?.postal_code,
                state: customer?.address?.state
              }
            }
            plan={renderedDescription}
            amount={0}
            date={createdAt}
          /></div>
      </TableCell>
    </TableRow>
  );
}

export default TableRowRender;