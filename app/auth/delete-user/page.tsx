'use client';

import { confirmDeleteUser } from "@/actions/confirm-delete-user";
import { newVerification } from "@/actions/new-verification";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader, ClipLoader } from "react-spinners"
import { set } from 'lodash';
import { Textarea } from "@/components/ui/textarea";
import { check } from "drizzle-orm/mysql-core";

const DeleteUserPage = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    const [cancelReason, setCancelReason] = useState<string | undefined>();
    const [currentContent, setCurrentContent] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const router = useRouter();

    const onSubmit = useCallback(() => {
        setIsLoading(true)

        if (success || error) {
            setIsLoading(false)
            return;
        };
        
        if (!token) {
            setError("Fehlender Löschungs-Code!");
            setIsLoading(false)
            return;
        }

        confirmDeleteUser(token)
            .then((data) => {
                setIsLoading(false)
                if(data?.success) {
                    setError("")
                    setSuccess(data.success);
                } else if(!data?.success){
                    setError(data.error);
                } else {
                    setError("Etwas ist schief gelaufen!");
                }
                
                
            })
            .catch(() => {
                setError("Etwas ist schief gelaufen!");
                setIsLoading(false)
            })
            setIsLoading(false)
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, []);



    return (
        <div className="dark:bg-[#0F0F0F] min-h-screen">
<h3 className="font-semibold text-5xl pt-4 pb-4 rounded-md flex justify-center">
        <Link href="/" className="flex drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] text-[#414c78] dark:text-gray-100">
            <p className="dark:text-[#414c78]">u</p> Rent
        </Link>
    </h3>
            <div className="">
            {isLoading && (
                <div className="text-2xl flex justify-center ">
                Warte einen Moment..
            </div>
            )}
            <div className="flex items-center w-full justify-center ">
                <ClipLoader loading={isLoading} />
            </div>
            <div className="flex justify-center">
                {error && !success && error}
            </div>
            
            <div>
                {success && (
                    <div className="w-full">
                        <div className="flex justify-center">
                        <h3 className="text-2xl font-semibold flex justify-between">
                            Schade, dass du gehst. <br />
                        </h3>
                        
                        </div>
                        <h1 className="flex text-sm justify-center">
                            Möchtest du uns sagen warum?
                        </h1>
                        <div className="space-y-4 w-full flex justify-center">
                        	<div className="space-y-4 w-1/4">
                            <div className="rounded-md dark:bg-[#191919] w-full flex mt-2 p-8 space-x-4">
                                <Checkbox 
                                onCheckedChange={(check) => {
                                    setCancelReason("Ich brauche mein Konto nicht mehr.")
                                }}
                                checked={cancelReason === "Ich brauche mein Konto nicht mehr."}
                                />
                                <Label>
                                    Ich brauche mein Konto nicht mehr.
                                </Label>
                            </div>

                            <div className="rounded-md dark:bg-[#191919] w-full flex mt-2 p-8 space-x-4">
                                <Checkbox 
                                onCheckedChange={(check) => {
                                    setCancelReason("Ich hatte falsche Erwartungen an die Plattform.")
                                }}
                                checked={cancelReason === "Ich hatte falsche Erwartungen an die Plattform."}
                                />
                                <Label>
                                    Ich hatte falsche Erwartungen an die Plattform.
                                </Label>
                            </div>

                            <div className="rounded-md dark:bg-[#191919] w-full flex mt-2 p-8 space-x-4">
                                <Checkbox 
                                onCheckedChange={(check) => {
                                    setCancelReason("Schlechte Erfahrungen mit anderen Nutzern oder anderen Vermietern.")
                                }}
                                checked={cancelReason === "Schlechte Erfahrungen mit anderen Nutzern oder anderen Vermietern."}
                                />
                                <Label>
                                    Schlechte Erfahrungen mit anderen Nutzern oder anderen Vermietern.
                                </Label>
                            </div>

                            <div className="rounded-md dark:bg-[#191919] w-full flex mt-2 p-8 space-x-4">
                                <Checkbox 
                                onCheckedChange={(check) => {
                                    setCancelReason("Schlechte Erfahrungen mit der Plattform, oder mit uRent.")
                                }}
                                checked={cancelReason === "Schlechte Erfahrungen mit der Plattform, oder mit uRent."}
                                />
                                <Label>
                                    Schlechte Erfahrungen mit der Plattform, oder mit uRent.
                                </Label>
                            </div>

                            <div className="rounded-md dark:bg-[#191919] w-full flex mt-2 p-8 space-x-4">
                                <Checkbox 
                                onCheckedChange={(check) => {
                                    setCancelReason("Ich habe nicht das gefunden, was ich gesucht habe.")
                                }}
                                checked={cancelReason === "Ich habe nicht das gefunden, was ich gesucht habe."}
                                />
                                <Label>
                                    Ich habe nicht das gefunden, was ich gesucht habe.
                                </Label>
                            </div>

                            <div className="rounded-md dark:bg-[#191919] w-full flex mt-2 p-8 space-x-4">
                                <Checkbox 
                                onCheckedChange={(check) => {
                                    setCancelReason("Sonstiges")
                                }}
                                checked={cancelReason === "Sonstiges"}
                                />
                                <Label>
                                    Sonstiges
                                </Label>
                            </div>
                            <div className="">
                                <Textarea
                                value={currentContent}
                                onChange={(e) => {setCurrentContent(e.target.value)}} 
                                placeholder="Möchtest du uns noch etwas erzählen?"
                                className="dark:bg-[#191919] dark:border-none h-[200px]"
                                />
                            </div>
                            </div>
                            
                            
                        </div>
                    </div>
                )}
            </div>
            {success && (
                <div className="text-xs dark:text-gray-200/60 flex justify-center">
                <div className="w-1/4 mt-2">
                Wir würden uns freuen, wenn du uns sagst, warum du gehst. <br />
                Das hilft uns, uRent zu verbessern. <br/>
                Du kannst auch eine E-Mail schreiben an : support@urent-rental.de <br/>
                Falls du deine Meinung änderst kannst du auch jederzeit wieder zurückkommen und ein neues Konto erstellen.
                </div>
            </div>
            )}
            <div className="flex w-full justify-center mt-4 ">
                {success && (
                    <Button className="w-1/4 bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300">
                        Informationen absenden
                    </Button>
                )}
            </div>
            <div className="flex justify-center pb-4">
                <Button variant="ghost" onClick={() => {router.push("/")}} className="dark:bg-[#080808] mt-2 w-1/4 ">
                    zurück zur Homepage
                </Button>
            </div>
            </div>
        </div>
    );
}

export default DeleteUserPage;