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
          <BreadcrumbLink href={`/admin`}>Admin</BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        {pathname.includes("reports") && (
            <BreadcrumbItem>
            <BreadcrumbLink>Reports</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {pathname.includes("notifications") && (
            <BreadcrumbItem>
            <BreadcrumbLink>Notifikationen</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {pathname.includes("popup") && (
            <BreadcrumbItem>
            <BreadcrumbLink>Popups / Benachrichtigungen</BreadcrumbLink>
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
        {pathname.includes("blogs") && (
            <BreadcrumbItem>
            <BreadcrumbLink>Blogs</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {pathname.includes("faqs") && (
            <BreadcrumbItem>
            <BreadcrumbLink>FAQS</BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
        </div>
     );
}
 
export default BreadCrumpPage;