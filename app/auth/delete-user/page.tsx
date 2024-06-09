'use client';

import { confirmDeleteUser } from "@/actions/confirm-delete-user";
import { newVerification } from "@/actions/new-verification";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader, ClipLoader } from "react-spinners"

const DeleteUserPage = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false)

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
                } else {
                    setError(data.error);
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
<h3 className="font-semibold text-5xl p-16 rounded-md flex justify-center">
        <Link href="/" className="flex drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] text-[#414c78] dark:text-gray-100">
            <p className="dark:text-[#414c78]">u</p> Rent
        </Link>
    </h3>
            <div className="p-8">
            {isLoading && (
                <div className="text-2xl flex justify-center ">
                Warte einen Moment..
            </div>
            )}
            <div className="flex items-center w-full justify-center ">
                <ClipLoader loading={isLoading} />
            </div>
            <div className="flex justify-center">
                {error}
            </div>
            <div className="flex justify-center text-lg font-bold text-emerald-600">
                {success}
            </div>
            <div className="flex justify-center">
                <Button variant="ghost" onClick={() => {router.push("/")}} className="dark:bg-[#080808] mt-4">
                    zurück zur Homepage
                </Button>
            </div>
            </div>
        </div>
    );
}

export default DeleteUserPage;