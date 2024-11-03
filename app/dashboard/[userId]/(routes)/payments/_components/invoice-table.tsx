'use client'

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { format } from "date-fns"
import TableRowRender from "./table-row"
import { metadata } from '../../../../../(dashboard)/layout';

type SortKey = 'rechnungsnr' | 'status' | 'beschreibung' | 'produkt Art' | 'preis' | 'erstellt'

interface Invoice {
  id: string
  rechnungsnr: string
  status: string
  beschreibung: string
  preis: number
  erstellt: number
  paid: boolean
  lines: { data: { price: { unit_amount: number, product: string } }[] }
  description: string
  period_start: number
  created: number
}

interface InvoiceTableProps {
  existingInvoices: Invoice[]
}

export default function InvoiceTable({ existingInvoices }: InvoiceTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('rechnungsnr')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortedInvoices, setSortedInvoices] = useState<Invoice[]>([])

  // Update sortedInvoices whenever sortKey, sortOrder, or existingInvoices change
  useEffect(() => {
    const sorted = [...existingInvoices].sort((a, b) => {
      const aValue = a[sortKey as keyof Invoice]
      const bValue = b[sortKey as keyof Invoice]

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
    setSortedInvoices(sorted)
  }, [sortKey, sortOrder, existingInvoices])

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

  const formatUnixTimestamp = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "dd/MM/yyyy")
  }

  

  

  return (
    <Table>
      <TableCaption>Eine Liste von allen ausgestellten Rechnungen in Verbindung zwischen dir und uRent.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]"><SortButton column="rechnungsnr" /></TableHead>
          <TableHead><SortButton column="status" /></TableHead>
          <TableHead><SortButton column="beschreibung" /></TableHead>
          <TableHead><SortButton column="produkt Art" /></TableHead>
          <TableHead className="w-[80px] break-all"><SortButton column="erstellt" /></TableHead>
          <TableHead className="text-right"><SortButton column="preis" /></TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedInvoices.map((invoice) => (
          <TableRowRender
            key={invoice.id}
            paid={invoice.paid}
            invoiceId={invoice.id}
            unitAmount={invoice.lines?.data[0]?.price?.unit_amount || 0}
            createdAt={formatUnixTimestamp(invoice.created)}
            description={invoice.description}
            periodStart={invoice.period_start}
            productId={invoice.lines?.data[0]?.price?.product || ''}
            //@ts-ignore
            customerId={invoice?.customer}
            //@ts-ignore
            isUpgrade={invoice?.metadata?.upgrade == 'true'}
          />
        ))}
      </TableBody>
    </Table>
  )
}
