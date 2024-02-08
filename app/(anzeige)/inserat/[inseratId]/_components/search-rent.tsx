'use client'

import { getUserByName } from "@/actions/getUserForBooking";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { set } from 'date-fns';
import toast from "react-hot-toast";
import { useDebounce } from "@/hooks/use-debounce";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";

const SearchRent =  () => {

    const [currentValue, setCurrentValue] = useState<string>("");
    const [matchingUsers , setMatchingUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedValue = useDebounce(currentValue);

    const [selectedUser , changeSelectedUser] = useState<User | null>(null);

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
            <p className="flex"> <UserCheck className="w-4 h-4 mr-2"/> Mieter </p>
            <div className="w-full flex">
                <Input
                className="border border-gray-400 bg-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mt-2
                focus:ring-0 focus:border-0 focus:outline-none focus-visible:ring-0
                "
                value={selectedUser ? selectedUser.name : currentValue}
                onChange={(e) => {
                    
                        setCurrentValue(e.target.value);
                   
                }}
                />
            </div>

            //! Global-Statemanagement mit Zustand... ausgewählter User bleibt auch beim Verlassen des Dialogs
            
            <div className="block mt-1">
                {matchingUsers.map((user) => (
                    <Button 
                    className="w-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] bg-gray-200 border border-gray-300" 
                    variant="ghost" 
                    onClick={() => {changeSelectedUser(user)}}
                    key={user.id}
                    >
                        <div className="w-full  rounded-md p-2">
                        <div>
                            <p>{user.name}</p>
                        </div>
                    </div>
                    </Button>
                ))}
            </div>
        </div>
    );
}
 
export default SearchRent;