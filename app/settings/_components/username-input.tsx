'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { users } from "@/db/schema";
import { useUnsavedChangesSettings } from "@/store";
import { set } from 'date-fns';
import { useEffect, useRef, useState } from "react";

interface UsernameProps {
    thisUser : typeof users.$inferSelect
}

const Username: React.FC<UsernameProps> = ({
    thisUser
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [username, setUserName] = useState(thisUser.name);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const {currentChanges, changeCurrent} = useUnsavedChangesSettings()

    useEffect(() => {
        const setAmount = async () => {
            await changeCurrent("username", username);
        
        }

        setAmount();
    }, [username])


    return ( 
        <div>
            <div>
                <div className="w-1/2">
                    <Label className="text-sm font-semibold p-2">
                        Nutzername
                    </Label>
                    {isEditing ? (
                        <Input 
                        ref={inputRef}
                        className="border-none bg-[#141414] w-full"
                        value={username}
                        placeholder="Nutzername hinzufügen..."
                        onBlur={() => {setIsEditing(false)}}
                        onChange={(e) => setUserName(e.target.value)}
                        />
                    ) : (
                        <div className="w-full">
                            <div className="pl-3 p-2.5 bg-[#141414] text-sm rounded-md">
                            {username ? username : "Nutzername hinzufügen..."}
                        </div>
                        <p className="ml-auto flex justify-end p-1 w-full text-xs font-semibold hover:underline hover:cursor-pointer"
                        onClick={() => setIsEditing(true)}
                        >
                            Ändern
                        </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default Username;