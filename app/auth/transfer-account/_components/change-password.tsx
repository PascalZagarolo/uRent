import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface ChangePasswordProps {
    setIsDisabled : (e : boolean) => void;
    setCurrentPassword : (newPassword : string) => void;
    currentPassword : string;
}

const ChangePassword = ({ setIsDisabled, setCurrentPassword, currentPassword } : ChangePasswordProps) => {
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [password, setPassword] = useState(currentPassword ? currentPassword : "");
    const [confirmPassword, setConfirmPassword] = useState(currentPassword ? currentPassword : "");

    // Password validation regex
    const validatePassword = (password) => {
        const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,20}$/; // Ensures 6-20 characters with at least one special character
        return regex.test(password);
    };

    // useEffect to trigger validation whenever password or confirmPassword changes
    useEffect(() => {
        const passwordValid = validatePassword(password);
        const passwordsMatch = (password === confirmPassword) && password != "" && confirmPassword != "";

        setIsValidPassword(passwordValid); // Set checkbox for valid password
        setPasswordsMatch(passwordsMatch); // Set checkbox for matching passwords

        if(passwordValid && passwordsMatch) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }

    }, [password, confirmPassword]); // Only run when password or confirmPassword changes

    return (
        <div>
            <div className="text-lg font-semibold flex flex-row items-center">
                <LockIcon 
                className="w-4 h-4 mr-2"
                />
                Passwort ändern
            </div>
            <div className="mt-4">
                <Label className="font-semibold">Neues Passwort festlegen</Label>
                <Input
                    className="bg-[#222222] shadow-lg border-none"
                    placeholder=""
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setCurrentPassword(e.target.value)
                    }} // Password change handler
                />
            </div>

            <div className="mt-4">
                <Label className="font-semibold">Passwort wiederholen</Label>
                <Input
                    className="bg-[#222222] shadow-lg border-none"
                    placeholder=""
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} // Confirm password change handler
                />
            </div>

            <div className="mt-8 space-y-4">
                <div className="flex flex-row items-center space-x-4">
                    <Checkbox 
                    checked={isValidPassword}
                    />
                    <Label className="font-semibold">
                        6 - 20 Zeichen (+ Sonderzeichen)
                    </Label>
                </div>
                <div className="flex flex-row items-center space-x-4">
                    <Checkbox 
                    checked={passwordsMatch}
                    />
                    <Label className="font-semibold">
                    Passwörter stimmen überein
                    </Label>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
