import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockIcon } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { GiConfirmed } from "react-icons/gi";
import { TbMailShare } from "react-icons/tb";

interface ConfirmChangeProps {
    newMail: string,
}

const ConfirmChanges = ({ newMail }: ConfirmChangeProps) => {
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [codeSent, codeWasSent] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const sendCode = async () => {
        try {
            if(isLoading) return;

            setIsLoading(true);

            const values = {};

            codeWasSent(true);
        } catch(e : any) {
            console.log(e);
            toast.error("Etwas ist schiefgelaufen, bitte versuche es erneut.");
        } finally {
            setIsLoading(false);
        }
    }

    
    

    return (
        <div>
            <div className="text-lg font-semibold flex flex-row items-center">
                <GiConfirmed
                    className="w-4 h-4 mr-2"
                />
                Änderungen bestätigen
            </div>


            {!codeSent ? (
                <div className="mt-4 flex flex-col">
                    <Label className="font-semibold">Bestätigungscode anfordern </Label>
                    <p className="text-xs text-gray-200/60 mt-1">
                    An die von dir angegebene neue E-Mail-Adresse <span className="text-indigo-400 font-semibold">{newMail}</span> wird ein Bestätigungscode gesendet werden.
                    </p>
                    <Button className="bg-indigo-800 hover:bg-indigo-900 mt-4 text-gray-200" 
                    disabled={!newMail} 
                    onClick={sendCode}
                    >
                        <TbMailShare 
                        className="w-4 h-4 mr-2"
                        />
                        Email senden
                    </Button>
                </div>
            ) : (
                <div className="mt-4">
                    <Label className="font-semibold">Bestätigungscode eingeben</Label>
                    <Input
                        className="bg-[#222222] shadow-lg border-none"
                        placeholder=""
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} // Confirm password change handler
                    />
                </div>
            )}

            <div>

            </div>


        </div>
    );
};

export default ConfirmChanges;
