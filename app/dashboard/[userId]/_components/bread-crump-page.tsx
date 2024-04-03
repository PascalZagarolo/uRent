'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const BreadCrumpPage = () => {

    const pathname = usePathname();
    const userId = pathname.split("/")[2];

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
        {pathname.includes("bookings") && (
            <BreadcrumbItem>
            <BreadcrumbLink>Meine Inserate</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {pathname.includes("favourites") && (
            <BreadcrumbItem>
            <BreadcrumbLink>Favouriten</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        
      </BreadcrumbList>
    </Breadcrumb>
        </div>
     );
}
 
export default BreadCrumpPage;