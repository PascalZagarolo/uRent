'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inserat } from '../../../../../../db/schema';
import qs from "query-string";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

interface SelectInseratProps {
    foundInserate : typeof inserat.$inferSelect[]
}

const SelectInserat: React.FC<SelectInseratProps> = ({
    foundInserate
}) => {

    const pathname = usePathname();
    const router = useRouter();

    const searchParams = useSearchParams();

    const currentInserat = searchParams.get("inseratId")

    const onClick = (id : string) => {
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                inseratId : id
            }
        }, { skipEmptyString : true, skipNull : true})
        router.push(url)
    }

    return ( 
        <>
        <Select 
        onValueChange={(selectedValue) => {
            onClick(selectedValue);
          }}
          value={currentInserat}
          
        >
            
                                    <SelectTrigger className="dark:border-none dark:bg-[#0F0F0F]" >
                                    <SelectValue>
                
                </SelectValue>
                                        <SelectContent className="dark:bg-[#0F0F0F] dark:border-none">
                                        <SelectItem value={null}>
                                                    Beliebig
                                            </SelectItem>
                                            {foundInserate.map((thisInserat) => (
                                                <SelectItem value={thisInserat.id} key={thisInserat.id}>
                                                    {thisInserat.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </SelectTrigger>
                                </Select>
                                
                                
        </>
     );
}
 
export default SelectInserat;