'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const BreadCrumpSettings = () => {

    const pathname = usePathname();
    
    const isPrivacy = pathname.includes("privacy");
    const isSafety = pathname.includes("safety");
    const isAnsicht = pathname.includes("view")
    const isSettingsMain = !isPrivacy && !isSafety && !isAnsicht;

    return ( 
        <div className="w-full px-4 py-2">
            <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/`}>Einstellungen</BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        {isSettingsMain && (
            <BreadcrumbItem>
            <BreadcrumbLink>Account</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {isAnsicht && (
            <BreadcrumbItem>
            <BreadcrumbLink>Ansicht</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {isPrivacy && (
            <BreadcrumbItem>
            <BreadcrumbLink>Privatsphäre</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {isSafety && (
            <BreadcrumbItem>
            <BreadcrumbLink>Sicherheit</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        
      </BreadcrumbList>
    </Breadcrumb>
        </div>
     );
}
 
export default BreadCrumpSettings;