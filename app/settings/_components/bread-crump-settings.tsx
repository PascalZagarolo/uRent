'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

const BreadCrumpSettings = () => {
    const pathname = usePathname();
    
    const isPrivacy = pathname.includes("privacy");
    const isSafety = pathname.includes("safety");
    const isAnsicht = pathname.includes("view");
    const isSettingsMain = !isPrivacy && !isSafety && !isAnsicht;

    return (
        <div className="mb-6">
            <Breadcrumb>
                <BreadcrumbList className="text-sm">
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                            <Home className="h-3.5 w-3.5 mr-1" />
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    
                    <BreadcrumbSeparator>
                        <ChevronRight className="h-3.5 w-3.5" />
                    </BreadcrumbSeparator>
                    
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-gray-500 dark:text-gray-400">
                            Einstellungen
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    
                    <BreadcrumbSeparator>
                        <ChevronRight className="h-3.5 w-3.5" />
                    </BreadcrumbSeparator>
                    
                    {isSettingsMain && (
                        <BreadcrumbItem>
                            <BreadcrumbLink className="font-medium text-gray-900 dark:text-white">
                                Account
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )}
                    
                    {isAnsicht && (
                        <BreadcrumbItem>
                            <BreadcrumbLink className="font-medium text-gray-900 dark:text-white">
                                Ansicht
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )}
                    
                    {isPrivacy && (
                        <BreadcrumbItem>
                            <BreadcrumbLink className="font-medium text-gray-900 dark:text-white">
                                Privatsphäre
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )}
                    
                    {isSafety && (
                        <BreadcrumbItem>
                            <BreadcrumbLink className="font-medium text-gray-900 dark:text-white">
                                Sicherheit
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
 
export default BreadCrumpSettings;