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
}

const TableRowRender = ({
  invoiceId,
  unitAmount,
  description,
  createdAt,
  periodStart,
  productId
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
      <TableCell className="font-medium break-all">{invoiceId}</TableCell>
      <TableCell>!!!!</TableCell>
      <TableCell>{description ? description : "ist Abo"}</TableCell>
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