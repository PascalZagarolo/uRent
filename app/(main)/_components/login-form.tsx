'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";

interface CredFormProps {
    registration?: boolean;
}

const CredForm: React.FC<CredFormProps> = ({
    registration
}) => {
    return (
        <div>
            {
                registration && (
                    <div className=" mb-2">
                        <label className="text-sm font-semibold flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            E-Mail Addresse
                        </label>
                        <Input placeholder="test@test.com"
                            className="mt-2" />
                    </div>
                )
            }


            <div className="mt-4 mb-2">

                <label className="text-sm font-semibold flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Nutzername
                </label>
                <Input placeholder="test@test.com"
                    className="mt-2" />
            </div>

            <div className="mt-4 mb-2">
                <label className="text-sm font-semibold flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Passwort
                </label>
                <Input placeholder="Passwort"
                    className="mt-2"
                    type="password" />
            </div>
            <div>
                {!registration ? (
                    <Link href="/register" className="text-xs font-semibold text-blue-800/50">
                        neu hier? Registriere einen neuen Account
                    </Link>
                ) : (
                    <Link href="/" className="text-xs font-semibold text-blue-800/50">
                        oder mit einem bestehendem Konto anmelden
                    </Link>
                )}
            </div>
            <Button className="mt-4 bg-blue-800">
                {
                    registration ? "Registrieren" : "Einloggen"
                }
            </Button>

        </div>
    );
}

export default CredForm;