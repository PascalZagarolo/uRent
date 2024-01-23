'use client';

import { newVerification } from "@/actions/new-verification";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners"

const NewVerificationPage = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const router = useRouter();

    const onSubmit = useCallback(() => {
        console.log(token + " in Page")
        if (success || error) return;

        if (!token) {
            setError("Fehlender Token in Params!");
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Etwas ist schief gelaufen!");
            })
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, []);



    return (
        <div>

            <div className="text-2xl flex justify-center">
                Warte einen Moment..
            </div>
            <div className="flex items-center w-full justify-center">
                <BeatLoader />
            </div>
            <div className="flex justify-center">
                {error}
            </div>
            <div className="flex justify-center text-lg font-bold text-emerald-600">
                {success} ..
            </div>
            <div>
                <Button variant="ghost" onClick={() => {router.push("/")}}>
                    zurück zur Homepage
                </Button>
            </div>
        </div>
    );
}

export default NewVerificationPage;