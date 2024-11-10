'use client'

import LetterRestriction from "@/components/letter-restriction";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userTable } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useUnsavedChangesSettings } from "@/store";
import { set } from 'date-fns';
import { useEffect, useRef, useState } from "react";

interface UsernameProps {
    thisUser : typeof userTable.$inferSelect
}

const Nachname: React.FC<UsernameProps> = ({
    thisUser
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [username, setUserName] = useState(thisUser.nachname);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const {currentChanges, changeCurrent} = useUnsavedChangesSettings()

    useEffect(() => {
        const setAmount = async () => {
            await changeCurrent("nachname", username);
        
        }

        setAmount();
    }, [username])


    return ( 
        <div>
            <div>
                <div className="sm:w-1/2 w-full">
                    <Label className="text-sm font-semibold p-2">
                        Nachname
                    </Label>
                    {isEditing ? (
                        <>
                        <Input 
                        ref={inputRef}
                        className={cn(`border-none dark:bg-[#141414] w-full border dark:border-none bg-gray-200 
                        focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none`)}
                        value={username}
                        placeholder="Nachname hinzufügen..."
                        onBlur={() => {setIsEditing(false)}}
                        onChange={(e) => {
                            // Allow letters, spaces, and the specified symbols: !, &, _, ., ,, :, (), and ()
                            let value = e.target.value;
                            // Remove any character that isn't a letter, space, or one of the allowed symbols
                            value = value.replace(/[^a-zA-Z\s!&_,.:()\[\]]/g, '');
                            // Trim leading spaces
                            value = value.replace(/^\s+/, '');
                            setUserName(value);
                        }}
                        maxLength={60}
                        />
                        <div className="ml-auto flex justify-end">
                                <LetterRestriction limit={60} currentLength={username?.length} />
                            </div>
                        </>
                    ) : (
                        <div className="w-full">
                            <div className=
                            {cn("pl-3 p-2.5 dark:bg-[#141414] border dark:border-none bg-gray-200 text-sm rounded-md",
                            !username && "dark:text-gray-200/70")}>
                            {username ? username : "Nachname hinzufügen..."}
                        </div>
                        <p className="ml-auto flex justify-end p-1  text-xs font-semibold hover:underline hover:cursor-pointer"
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
 
export default Nachname;