"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";


import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { login } from "@/actions/login";
import { CardWrapper } from "./card-wrapper";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { LoginSchema } from "./_schemas";
import { EyeIcon } from "lucide-react";
import toast from "react-hot-toast";

import { ClipLoader } from "react-spinners";
import { FormConfirmEmail } from "./form-confirm-email";
import { GrPowerReset } from "react-icons/gr";
import { resend2Fa } from "@/actions/2fa/2fa-actions";
import { set } from "lodash";



interface LoginFormProps {
  existingMessage?: string
}


export const LoginForm = ({ existingMessage }: LoginFormProps) => {
  const searchParams = useSearchParams();

  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Diese Email wurde schon mit einem anderen Account verknüpft. Bitte logge dich mit dem anderen Account ein."
    : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>(existingMessage ? existingMessage : "");
  const [success, setSuccess] = useState<string | undefined>("");

  const [confirmEmail, setConfirmEmail] = useState<string | undefined>("");
  const [accountEmail, setAccountEmail] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if(showTwoFactor) {
      setTimeout(() => {
        setShowResend(true)
      }, 5000)
    }
  },[showTwoFactor])

  const [showPassword, setShowPassword] = useState(false);
  const [showResend, setShowResend] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    setConfirmEmail("");
    startTransition(() => {

      login(values)

        .then((data) => {
          if (data?.error) {
            setIsLoading(false);
            if (!showTwoFactor) {
              form.reset()
            }
            setError(data.error)
          }


          if (data?.success) {

            setSuccess(data.success);
            form.reset();
            toast.success("Erfolgreich eingeloggt");

            setTimeout(() => {
              router.push("/")
              setIsLoading(false)
            })

          }

          if (data?.confirmEmail) {
            setConfirmEmail(data.confirmEmail);
            setAccountEmail(values.email);
            setIsLoading(false);
          }

          if (data?.twoFactor) {
            setAccountEmail(values.email);
            setIsLoading(false);
            setShowTwoFactor(true);
          }

          //eventually delete later
          if (!data?.success && !data?.twoFactor && !data?.confirmEmail) {
            setIsLoading(false);

            toast.error("Falsche Anmeldedaten");
            //form.reset();
          }
        }).catch((error) => {
          toast.error("Fehler beim Einloggen");
          setIsLoading(false);
        })





    });
  };

  const onNewMailSend = () => {
    setConfirmEmail("");
    setAccountEmail("");
  }

  const onHold = () => {
    setShowPassword(true)
  }

  const onRelease = () => {
    setTimeout(() => {
      setShowPassword(false)
    }, 200)
  }

  const onResend = async () => {
      try { 
        setIsLoading(true)
        console.log(accountEmail)
        await resend2Fa(accountEmail)
        setShowResend(false);
        toast.success("Dir wurde ein neuer Code an deine Email gesendet.")
      } catch(e : any) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
  }

  return (
    <CardWrapper
      headerLabel="Melde dich mit deinem bestehenden uRent Account oder Google Profil an."
      backButtonLabel="Noch keinen Account?"
      backButtonHref="/register"
      showSocial={!showTwoFactor}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <div>
                      <FormLabel>2FA Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder=""
                          className="bg-[#1B1F2C] border-none"
                          maxLength={100}

                        />
                      </FormControl>
                      <FormMessage />
                      {showResend && (
                        <div className="flex flex-row items-center mt-2 text-gray-200/60 text-sm text-center w-full hover:underline hover:text-gray-200" onClick={onResend}>
                          <GrPowerReset className="w-4 h-4 mr-2 " /> <span className=""> Keinen Code erhalten? </span>
                        </div>
                      )}
                    </div>
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                         {...field}
                          disabled={isPending}
                          placeholder=""
                          type="email"
                          className="bg-[#1B1F2C] border border-[#1f2234]"
                          maxLength={100}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel>Passwort</FormLabel>
                      <div className="flex rounded-lg w-full ">
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder=""
                            type={showPassword ? "text" : "password"}
                            className="bg-[#1B1F2C] border-none rounded-none rounded-l-md"
                          />

                        </FormControl>
                        <Button variant="ghost" className="bg-[#1a1c2c] rounded-none rounded-r-md"
                          onMouseDown={onHold}
                          onMouseUp={onRelease}
                          type="button"
                          onClick={() => { }}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </div>

                      <Link href="/forget" className="text-xs text-gray-200/90 font-medium hover:underline">
                        Password vergessen?
                      </Link>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <FormConfirmEmail message={confirmEmail} email={form.watch("email")} onSend={onNewMailSend} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-indigo-800 text-gray-200 hover:bg-indigo-900 hover:text-gray-300 shadow-lg"
          >
            {isLoading ?
              (
                <ClipLoader color="#fff" loading={isLoading} size={20} />
              ) :
              (
                showTwoFactor ? "Bestätigen" : "Anmelden"
              )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};