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
import { booking, userTable } from "@/db/schema";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IoIosInformationCircleOutline } from "react-icons/io";

interface SearchRentProps {
    thisBooking? : typeof booking.$inferSelect;
    initialUser? : typeof userTable.$inferSelect;
}


const SearchRent: React.FC<SearchRentProps> =  ({
    thisBooking,
    initialUser
}) => {

    const pathname = usePathname();

    console.log(initialUser)

    const [currentValue, setCurrentValue] = useState<string>("");
    const [matchingUsers , setMatchingUsers] = useState<typeof userTable[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedValue = useDebounce(currentValue, 200);

    const changeUser = usesearchUserByBookingStore((user) => user.changeUser);
    const selectedUser = usesearchUserByBookingStore((user) => user.user);

    const onChange = (value : string) => {
        setCurrentValue(value);
    }

    useEffect(() => {
        if(initialUser) {
            console.log(initialUser)
            setCurrentValue("");
            changeUser(initialUser);
        }
    },[])

    
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
            <p className="flex font-semibold items-center"> 
            <UserCheck className="w-4 h-4 mr-2"/> Mieter 
            <Popover>
                <PopoverTrigger>
                    <IoIosInformationCircleOutline className="w-4 h-4 ml-2" />
                </PopoverTrigger>
                <PopoverContent className="dark:border-none dark:bg-indigo-900 text-xs">
                    <div className="space-y-1">
                    <IoIosInformationCircleOutline className="w-4 h-4" />
                    <div>
                        Falls dein Mieter einen Account auf uRent besitzt, 
                        kannst du ihn zur Buchung hinzufügen, dieser bekommt dann 
                        eine Benachrichtung auf sein uRent Konto.
                    </div>
                    </div>
                </PopoverContent>
            </Popover>
            </p>
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
                            className="object-fill rounded-full w-[30px] h-[30px]"
                            />
                        </div>
                        <div className="flex justify-center font-semibold text-medium">
                            <p>{pUser.name}</p>
                        </div>
                       
                    </div>
                    </span>
                ))}
            </div>
        </div>
    );
}
 
export default SearchRent;