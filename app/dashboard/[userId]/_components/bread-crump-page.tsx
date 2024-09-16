'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

interface BreadCrumpPageProps {
  changeCurrentTab?: (tab: string) => void;
  currentTab?: string;
}

const BreadCrumpPage = ({ changeCurrentTab, currentTab } : BreadCrumpPageProps) => {

    const pathname = usePathname();
    const userId = pathname.split("/")[2];

    const tabOptions = [
      {
        value : "dashboard",
        label : "Dashboard"
      },
      {
        value : "manage",
        label : "Meine Fahrzeuge"
      },
      {
        value : "inserate",
        label : "Meine Inserate"
      },
      {
        value : "payments",
        label : "Zahlungsverkehr"
      },
      {
        value : "favourites",
        label : "Favouriten"
      }
    ]

    return ( 
        <div className="w-full px-4 py-2">
            <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/dashboard/${userId}`}>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        {pathname.includes("manage") && (
            <BreadcrumbItem>
            <BreadcrumbLink>Meine Fahrzeuge</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {pathname.includes("inserate") && (
            <BreadcrumbItem>
            <BreadcrumbLink>Meine Inserate</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {pathname.includes("payments") && (
            <BreadcrumbItem>
            <BreadcrumbLink>Zahlungsverkehr</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {pathname.includes("bookings") && (
            <BreadcrumbItem>
            <BreadcrumbLink>Meine Inserate</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {pathname.includes("favourites") && (
            <BreadcrumbItem>
            <BreadcrumbLink>Favoriten</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        
      </BreadcrumbList>
    </Breadcrumb>
        </div>
     );
}
 
export default BreadCrumpPage;