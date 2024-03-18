'use client'

import { Button } from "@/components/ui/button";



import { useForm } from 'react-hook-form';
import { useState, useTransition } from "react";


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



import { Eye } from "lucide-react";
import { newPassword } from "@/actions/new-password";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const NewPassword = () => {

    const router = useRouter();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const NewPassword = z.object({
        password: z.string().min(3, {
            message: "Passwort ist zu kurz"
        })


    });

    const [newType, setNewType] = useState<string>("password");


    const onPasswordShow = () => {
        setNewType("text");

    }

    const onPasswordRelease = () => {
        setTimeout(() => {
            setNewType("password");
        }, 500)
    }

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPassword>>({
        resolver: zodResolver(NewPassword),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof NewPassword>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                    if (data?.success) {
                        toast.success("Passwort erfolgreich geändert!");
                        setTimeout(() => {
                            router.push("/login");
                        }, 500)
                    } else if (data.error) {
                        toast.error("Etwas ist schief gelaufen, versuche es nochmal");
                    }
                });
        });

        
    };

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
            <div
                className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
          border-gray-200
          border-2
          drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
          dark:bg-[#161616]
          dark:border-[#161616]
          
        "
            >

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 w-full"
                    >
                        <div className="space-y-4 flex w-full">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Neues Passwort</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Passwort"
                                                type={newType}
                                                className="dark:bg-[#3B3B3B] border-none w-full"
                                            />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )}

                            />
                            <div className="items-center flex ml-2">
                                <Eye className="h-4 w-4 mt-2" onMouseDown={onPasswordShow} onMouseUp={onPasswordRelease} />
                            </div>
                        </div>

                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Passwort zurücksetzen
                        </Button>
                    </form>
                </Form>



            </div>

        </div>
    );
}

export default NewPassword;