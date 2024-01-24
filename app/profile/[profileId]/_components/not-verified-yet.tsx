'use client';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import axios from "axios";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface NotVerifiedYetProps {
    email : string
}

const NotVerifiedYet: React.FC<NotVerifiedYetProps> = ({
    email,
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const onResendEmail = async () => {
        try {
            setIsLoading(true)
            axios.post("/api/resend-confirmation", { email : email })
            toast.success("E-Mail erfolgreich versendet")
        } catch {
            toast.error("Fehler beim Versenden der E-Mail")
        }
    }

    return (
        <Alert className="mt-2 mr-16 bg-yellow-100">
            <AlertTitle className="flex">
                <AlertCircleIcon /> <p className="ml-2"> Dein Account wurde noch nicht bestätigt</p>
            </AlertTitle>
            <AlertDescription>
                Bitte bestätige deinen Account über den Link in der E-Mail, die wir dir geschickt haben.
                <div className="flex"> Solltest du keine E-Mail bekommen haben, überprüfe deinen Spam-Ordner oder
                    <p className="underline font-semibold ml-2 hover:cursor-pointer" onClick={onResendEmail}> klicke hier </p>

                </div>
            </AlertDescription>
        </Alert>
    );
}

export default NotVerifiedYet;