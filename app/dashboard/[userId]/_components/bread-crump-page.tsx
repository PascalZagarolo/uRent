'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

interface BreadCrumpPageProps {
  setCurrentTab?: (tab: string) => void;
  currentTab?: string;
}

const BreadCrumpPage = ({ setCurrentTab, currentTab } : BreadCrumpPageProps) => {

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
        {currentTab == "manage" && (
            <BreadcrumbItem>
            <BreadcrumbLink>Meine Fahrzeuge</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {currentTab == "inserate" && (
            <BreadcrumbItem>
            <BreadcrumbLink>Meine Inserate</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {currentTab == "payments" && (
            <BreadcrumbItem>
            <BreadcrumbLink>Zahlungsverkehr</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {currentTab == "bookings" && (
            <BreadcrumbItem>
            <BreadcrumbLink>Meine Inserate</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {currentTab == "favourites" && (
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