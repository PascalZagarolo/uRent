'use client'

import { checkIsAvailable } from "@/actions/name/check-username";
import LetterRestriction from "@/components/letter-restriction";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userTable } from "@/db/schema";
import { useDebounce } from "@/hooks/use-debounce";
import { useUnsavedChangesSettings } from "@/store";

import { CheckIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface UsernameProps {
    thisUser: typeof userTable.$inferSelect
    setNameIsTaken?: (value: boolean) => void
}

const UsernameInput: React.FC<UsernameProps> = ({
    thisUser,
    setNameIsTaken
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

    const [isLoading, setIsLoading] = useState(false);
    const [nameAvailable, setNameAvailable] = useState(false);

    const value = useDebounce(username, 100);

    useEffect(() => {
        const checkUserName = async () => {
            try {


                if (username?.trim() !== "" && (username !== thisUser?.name)) {
                    const isAvailable = await checkIsAvailable(username)
                    if (isAvailable) {
                        setNameAvailable(true)
                        setNameIsTaken(false)
                    } else {
                        setNameAvailable(false)
                        setNameIsTaken(true)
                    }
                }
            } catch (e: any) {
                console.log(e)
            }
        }
        checkUserName()

    }, [value])


    return (
        <div>
            <div>
                <div className="w-full">
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
                                onBlur={() => { setIsEditing(false); }}
                                onChange={(e) => {
                                    // Allow letters, spaces, and the specified symbols: !, &, _, ., ,, :, (), and ()
                                    let value = e.target.value;
                                    // Remove any character that isn't a letter, space, or one of the allowed symbols
                                    value = value.replace(/[^a-zA-Z\s!&_,.:()\[\]]/g, '');
                                    // Trim leading spaces
                                    value = value.replace(/^\s+/, '');
                                    setUserName(value);
                                }}
                                maxLength={100}
                            />

                            {username?.trim() !== "" && (username !== thisUser?.name) && (
                                nameAvailable ? (
                                    <span className="text-gray-200 flex flex-row items-center py-1">
                                        <CheckIcon className="h-4 w-4 text-emerald-600 mr-2" /> <p className="text-xs">Nutzername ist verfügbar</p>
                                    </span>
                                ) : (
                                    <span className="text-gray-200 flex flex-row items-center py-1">
                                        <X className="h-4 w-4 text-rose-600 mr-2" />  <p className="text-xs">Nutzername ist bereits vergeben</p>
                                    </span>
                                )
                            )}
                            <div className="ml-auto flex justify-end">
                                <LetterRestriction limit={100} currentLength={username?.length} />
                            </div>
                        </>
                    ) : (
                        <div className="w-full">
                            <div className="pl-3 p-2.5 dark:bg-[#141414] border dark:border-none bg-gray-200 text-sm rounded-md">
                                {username ? username : "Nutzername hinzufügen..."}
                            </div>
                            {username?.trim() !== "" && (username !== thisUser?.name) && (
                                nameAvailable ? (
                                    <span className="text-gray-200 flex flex-row items-center py-1">
                                        <CheckIcon className="h-4 w-4 text-emerald-600 mr-2" /> <p className="text-xs">Nutzername ist verfügbar</p>
                                    </span>
                                ) : (
                                    <span className="text-gray-200 flex flex-row items-center py-1">
                                        <X className="h-4 w-4 text-rose-600 mr-2" />  <p className="text-xs">Nutzername ist bereits vergeben</p>
                                    </span>
                                )
                            )}
                            <p className="ml-auto flex justify-end p-1  text-xs font-semibold hover:underline hover:cursor-pointer"
                                onClick={() => setIsEditing(true)}
                            >
                                Ändern
                            </p>
                        </div>
                    )}
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default UsernameInput;