'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { BarChart3, CreditCard, ChevronRight, Heart, Home, ListChecks, TruckIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadCrumpPageProps {
  setCurrentTab?: (tab: string) => void;
  currentTab?: string;
}

const BreadCrumpPage = ({ setCurrentTab, currentTab }: BreadCrumpPageProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const userId = pathname.split("/")[2];
    const tabParam = searchParams.get('tab') || 'dashboard';
    
    // Use the passed currentTab or fallback to the URL query parameter
    const activeTab = currentTab || tabParam;

    const tabOptions = [
      {
        value: "dashboard",
        label: "Dashboard",
        icon: <BarChart3 className="h-4 w-4" />
      },
      {
        value: "manage",
        label: "Buchungen",
        icon: <ListChecks className="h-4 w-4" />
      },
      {
        value: "inserate",
        label: "Meine Inserate",
        icon: <TruckIcon className="h-4 w-4" />
      },
      {
        value: "payments",
        label: "Zahlungsverkehr",
        icon: <CreditCard className="h-4 w-4" />
      },
      {
        value: "favourites",
        label: "Favoriten",
        icon: <Heart className="h-4 w-4" />
      }
    ];
    
    // Find current tab details
    const currentTabDetails = tabOptions.find(tab => tab.value === activeTab) || tabOptions[0];

    return ( 
        <div className="w-full mb-4 px-1">
            <Breadcrumb>
                <BreadcrumbList className="shadow-sm dark:shadow-none  rounded-md px-3 py-1.5">
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link 
                                href="/" 
                                className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                <Home className="h-3.5 w-3.5 mr-1" />
                                Home
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    
                    <BreadcrumbSeparator>
                        <ChevronRight className="h-3.5 w-3.5 text-gray-400 dark:text-gray-600" />
                    </BreadcrumbSeparator>
                    
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link 
                                href={`/dashboard/${userId}?tab=dashboard`}
                                className={cn(
                                    "text-sm flex items-center transition-colors",
                                    activeTab === "dashboard" 
                                        ? "text-indigo-600 dark:text-indigo-400 font-medium"
                                        : "text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                                )}
                            >
                                <BarChart3 className="h-3.5 w-3.5 mr-1" />
                                Dashboard
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    
                    {activeTab && activeTab !== "dashboard" && (
                        <>
                            <BreadcrumbSeparator>
                                <ChevronRight className="h-3.5 w-3.5 text-gray-400 dark:text-gray-600" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                    {currentTabDetails.icon && (
                                        <span className="mr-1">{currentTabDetails.icon}</span>
                                    )}
                                    {currentTabDetails.label}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
 
export default BreadCrumpPage;