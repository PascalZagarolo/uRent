'use client'

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown, CheckIcon, XIcon } from "lucide-react"
import { format } from "date-fns"
import RenderAsHtml from "./render-as-html"
import TableRowRender from "./table-row"
import { metadata } from '../../../../../(dashboard)/layout';

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

type SortKey = 'rechnungsnr' | 'paymentStatus' | 'beschreibung' | 'preis' | 'erstellt' | 'upgrade'

interface InvoiceTableProps {
  existingInvoices: any
}

export default function InvoiceTable({ existingInvoices }: InvoiceTableProps) {


  const [sortKey, setSortKey] = useState<SortKey>('rechnungsnr')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const sortedInvoices = [...invoices].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const SortButton = ({ column }: { column: SortKey }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(column)}
      className="h-8 p-0 hover:bg-transparent break-all"
    >
      {column.charAt(0).toUpperCase() + column.slice(1)}
      {sortKey === column ? (
        sortOrder === 'asc' ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  )

  function formatUnixTimestamp(timestamp: number): string {
    // Convert the Unix timestamp (in seconds) to milliseconds and format as locale string
    return format(new Date(timestamp * 1000), "dd.MM.yyyy")
  }


  existingInvoices.map((invoice) => {
    console.log(invoice?.metadata?.isUpgrade !== undefined)
    console.log(invoice?.lines?.data[0]?.description)
  })

  return (
    <Table>
      <TableCaption>Eine Liste von allen ausgestellten Rechnungen in Verbindung zwischen dir und uRent.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]"><SortButton column="rechnungsnr" /></TableHead>
          <TableHead><SortButton column="paymentStatus" /></TableHead>
          <TableHead><SortButton column="beschreibung" /></TableHead>
          <TableHead className="w-[80px] break-all"><SortButton column="erstellt" /></TableHead>
          <TableHead className="text-right"><SortButton column="preis" /></TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {existingInvoices.map((invoice) => (
         
          <TableRowRender
            invoiceId={invoice.id}
            unitAmount={Number(invoice?.lines?.data[0]?.price?.unit_amount ?? 0)}
            createdAt={
              formatUnixTimestamp(invoice.created)
            }
            description={invoice?.metadata?.isUpgrade !== undefined ? invoice?.lines?.data[0]?.description : undefined}
            periodStart={invoice.period_start}
            productId={invoice?.lines?.data[0]?.price?.product}
            
          />
         
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">$2,250.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}