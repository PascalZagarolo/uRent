import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface ChangeMailProps {
    setIsDisabled : (e : boolean) => void;
    setNewMail : (newMail : string) => void;
    currentMail : string;
 }

const ChangeMail = ({ setIsDisabled, setNewMail, currentMail } : ChangeMailProps) => {
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isEmailsMatch, setIsEmailsMatch] = useState(false);
    const [email, setEmail] = useState(currentMail ? currentMail : "");
    const [confirmEmail, setConfirmEmail] = useState(currentMail ? currentMail : "");

    // Email validation regex
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    // useEffect to trigger validation whenever email or confirmEmail changes
    useEffect(() => {
        const emailValid = validateEmail(email);
        const emailsMatch = (email === confirmEmail) && email != "" && confirmEmail != "";

        setIsValidEmail(emailValid); 
        setIsEmailsMatch(emailsMatch); 
        
        if(!emailValid || !emailsMatch) {
            setIsDisabled(true);
        }
        
        if(emailValid && emailsMatch) {
            setIsDisabled(false)
        }
    }, [email, confirmEmail]); 

    return (
        <div>
            <div className="text-lg font-semibold flex flex-row items-center">
                <MailIcon 
                className="w-4 h-4 mr-2"
                />
                Email ändern
            </div>
            <div className="mt-4">
                <Label className="font-semibold">Neue Email-Adresse</Label>
                <Input
                    className="bg-[#222222] shadow-lg border-none"
                    placeholder=""
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setNewMail(e.target.value)
                    }} // Email change handler
                />
            </div>

            <div className="mt-4">
                <Label className="font-semibold">Email-Adresse bestätigen</Label>
                <Input
                    className="bg-[#222222] shadow-lg border-none"
                    placeholder=""
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)} // Confirm email change handler
                />
            </div>

            <div className="mt-8 space-y-4">
                <div className="flex flex-row items-center space-x-4">
                    <Checkbox 
                    checked={isValidEmail}
                    />
                    <Label className="font-semibold">
                        Email ist gültig
                    </Label>
                </div>
                <div className="flex flex-row items-center space-x-4">
                    <Checkbox 
                    checked={isEmailsMatch}
                    />
                    <Label className="font-semibold">
                        Emails stimmen überein
                    </Label>
                </div>
            </div>

            
        </div>
    );
};

export default ChangeMail;
