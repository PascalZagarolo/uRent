'use client'

import LetterRestriction from "@/components/letter-restriction";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userTable } from "@/db/schema";
import { useUnsavedChangesSettings } from "@/store";
import { set } from 'date-fns';
import { useEffect, useRef, useState } from "react";

interface UsernameProps {
    thisUser: typeof userTable.$inferSelect
}

const UsernameInput: React.FC<UsernameProps> = ({
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

    const { currentChanges, changeCurrent } = useUnsavedChangesSettings()

    useEffect(() => {
        const setAmount = async () => {
            await changeCurrent("username", username);

        }

        setAmount();
    }, [username])


    return (
        <div>
            <div>
                <div className="sm:w-1/2 w-full">
                    <Label className="text-sm font-semibold p-2">
                        Nutzername
                    </Label>
                    {isEditing ? (
                        <>
                            <Input
                                ref={inputRef}
                                className="border-none dark:bg-[#141414] w-full border dark:border-none bg-gray-200 
                        focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none"
                                value={username}
                                placeholder="Nutzername hinzufügen..."
                                onBlur={() => { setIsEditing(false) }}
                                onChange={(e) => setUserName(e.target.value)}
                                maxLength={100}
                            />
                            <div className="ml-auto flex justify-end">
                                <LetterRestriction limit={100} currentLength={username?.length} />
                            </div>
                        </>
                    ) : (
                        <div className="w-full">
                            <div className="pl-3 p-2.5 dark:bg-[#141414] border dark:border-none bg-gray-200 text-sm rounded-md">
                                {username ? username : "Nutzername hinzufügen..."}
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

export default UsernameInput;