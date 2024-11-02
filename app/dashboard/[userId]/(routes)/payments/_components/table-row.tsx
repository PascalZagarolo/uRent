'use client'


import { TableCell, TableRow } from "@/components/ui/table";
import RenderAsHtml from "./render-as-html";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getMatchingProduct } from "@/actions/stripe/action-stripe";



interface TableRowProps {
  invoiceId: string;
  unitAmount: number;
  description: string;
  createdAt: string;
  periodStart: number;
  productId: string;
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
  paid,
  isUpgrade,
}: TableRowProps) => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const retrieved = await getMatchingProduct(productId as string)
        if (!retrieved) {
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

  const [product, setMatchingProduct] = useState<any>(null)

  

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
      <TableCell className="font-semibold">{description ? description : product?.name + " (" +  product?.metadata?.amount + ") "}</TableCell>
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
                city: "",
                country: "",
                line1: "",
                line2: "",
                postal_code: "",
                state: ""
              }
            }
            plan={""}
            amount={0}
            date={format(new Date(periodStart * 1000), 'dd.MM.yyyy')}
          /></div>
      </TableCell>
    </TableRow>
  );
}

export default TableRowRender;