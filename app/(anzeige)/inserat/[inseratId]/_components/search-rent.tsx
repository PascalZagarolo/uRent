'use client'

import { getUserByName } from "@/actions/getUserForBooking";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { set } from 'date-fns';
import toast from "react-hot-toast";
import { useDebounce } from "@/hooks/use-debounce";

import { Button } from "@/components/ui/button";
import { usesearchUserByBookingStore } from "@/store";
import { usePathname, useSearchParams } from "next/navigation";
import { booking, users } from "@/db/schema";

interface SearchRentProps {
    thisBooking? : typeof booking.$inferSelect
}


const SearchRent: React.FC<SearchRentProps> =  ({
    thisBooking
}) => {

    const pathname = usePathname();

    const [currentValue, setCurrentValue] = useState<string>("");
    const [matchingUsers , setMatchingUsers] = useState<typeof users[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedValue = useDebounce(currentValue);

    const changeUser = usesearchUserByBookingStore((user) => user.changeUser);
    const selectedUser = usesearchUserByBookingStore((user) => user.user);

    const onChange = (value) => {
        setCurrentValue(value);
    }

    
    useEffect(() => {
        const fetchMatchingUsers = async () => {
            console.log(debouncedValue);
            try {
                setIsLoading(true);
                const users = await axios.patch(`/api/search/user/${debouncedValue}`);
                setMatchingUsers(users.data);
                
            } catch(error) {
                toast.error("Fehler beim Laden der Mieter", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        if (currentValue !== "") {
            fetchMatchingUsers();
        } else {
            
            setMatchingUsers([]);
        }
    }, [debouncedValue]);
    

    
    return (  
        <div>
            <p className="flex font-semibold"> <UserCheck className="w-4 h-4 mr-2"/> Mieter </p>
            <div className="w-full flex items-center">
                {selectedUser ? <img src={selectedUser.image ? selectedUser.image : "/placeholder-person.jpg"} className="w-8 h-8 rounded-full mr-2"/> : null}
                <Input
                className="border-none bg-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mt-2
                focus:ring-0 focus:border-0 focus:outline-none focus-visible:ring-0 dark:bg-[#0a0a0a]
                "
                value={selectedUser ? selectedUser.name : currentValue}
                onChange={(e) => {
                        setCurrentValue(e.target.value);
                        selectedUser ? changeUser(null) : null;    
                }}
                />
            </div>

            
            
            <div className="block mt-1">
                {matchingUsers.map((pUser) => (
                    <span 
                    className="w-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] bg-gray-200 border border-gray-300 hover:cursor-pointer " 
                     
                    onClick={() => {changeUser(pUser); setCurrentValue("")}}
                    key={pUser.id}
                    >
                        <div className="w-full  rounded-md p-2 items-center flex dark:bg-[#171717]">
                        <div className="w-[30px] h-[30px] rounded-md mr-4 ">
                            <img 
                            src={pUser.image ? pUser.image : "/placeholder-person.jpg"}
                            className="object-fill rounded-full  "
                            />
                        </div>
                        <div className="flex justify-center font-semibold text-medium">
                            <p>{pUser.name}</p>
                        </div>
                        <div className="ml-auto text-xs font-semibold italic text-gray-900/50 dark:text-gray-100/90">
                            {pUser.email}
                        </div>
                    </div>
                    </span>
                ))}
            </div>
        </div>
    );
}
 
export default SearchRent;