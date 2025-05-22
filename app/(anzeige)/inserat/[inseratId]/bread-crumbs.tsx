'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { inserat } from "@/db/schema";
import { Slash } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { MdArrowRight } from "react-icons/md";
import { useEffect } from "react";

interface BreadCrumbsProps {
    thisCategory : string;
    thisTitle : string;
    inseratId?: string;
}


const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
    thisCategory,
    thisTitle,
    inseratId
}) => {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const router = useRouter();
    const onClick = () => {
        const url = qs.stringifyUrl({
            url : baseUrl,
            query : {
                category : thisCategory
            }
        })

        router.push(url);
    }

    // Track last 10 visited inserate in localStorage
    useEffect(() => {
        const id = inseratId || thisTitle;
        if (!id) return;
        const key = "visitedInserate";
        let visited: string[] = [];
        try {
            visited = JSON.parse(localStorage.getItem(key) || "[]");
        } catch {}
        visited = visited.filter((v) => v !== id);
        visited.unshift(id);
        if (visited.length > 10) visited = visited.slice(0, 10);
        localStorage.setItem(key, JSON.stringify(visited));
    }, [inseratId, thisTitle]);

    return ( 
        <Breadcrumb className="dark:text-gray-200 ml-2">
  <BreadcrumbList className="dark:text-gray-200">
    <BreadcrumbItem>
      <BreadcrumbLink href="/" className="hover:cursor-pointer hover:underline">Startseite</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
    <MdArrowRight />
    </BreadcrumbSeparator>
    <BreadcrumbItem className="font-semibold dark:text-gray-200">
      <BreadcrumbLink onClick={onClick} className="hover:cursor-pointer hover:underline">
        {
            {
                "PKW" : "Pkw",
                "LKW" : "Lkw",
                "TRAILER" : "Anhänger",
                "TRANSPORT" : "Transporter"
            }[thisCategory]
        }
        </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
    <MdArrowRight />
    </BreadcrumbSeparator>
    <BreadcrumbItem className="font-semibold dark:text-gray-200 max-w-[248px] line-clamp-1">
      <BreadcrumbLink>{thisTitle}</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

     );
}
 
export default BreadCrumbs;