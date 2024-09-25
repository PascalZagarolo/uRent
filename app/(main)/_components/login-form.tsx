"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
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
import { set } from "lodash";
import { Label } from "@/components/ui/label";
import { useLoading } from "@/store";


export const LoginForm = () => {
  const searchParams = useSearchParams();
 
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Diese Email wurde schon mit einem anderen Account verknüpft. Bitte logge dich mit dem anderen Account ein."
    : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const { isLoading, changeLoading } = useLoading();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {

    setError("");
    setSuccess("");
    
    startTransition(() => {
      changeLoading(true);
      login(values)
      
        .then((data) => {
          if (data?.error) {
            if (!showTwoFactor) { 
                form.reset()
            }
            setError(data.error) 
        } 

          
          if (data?.success) {
            //changeLoading(false);
            setSuccess(data.success);
            form.reset();
            toast.success("Erfolgreich eingeloggt");
            changeLoading(true);
            setTimeout(() => {
              router.push("/")
              changeLoading(false)
            })
            
          }

          if (data?.twoFactor) {
            
            changeLoading(false);
            setShowTwoFactor(true);
          }
          
          //eventually delete later
          if(!data?.success && !data?.twoFactor) {
            changeLoading(false);
            
            toast.error("Falsche Anmeldedaten");
           //form.reset();
          }
        }).catch((error) => {
          toast.error("Fehler beim Einloggen");
          changeLoading(false);
        })
          
        
        
        

    });
  };

  const onHold = () => {
    setShowPassword(true)
  }

  const onRelease = () => {
    setTimeout(() => {
      setShowPassword(false)
    }, 200)
  }

  return (
    <CardWrapper
      headerLabel="Willkommen zurück"
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
                  <FormItem>
                    <FormLabel>2FA Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder=""
                        className="bg-[#1B1F2C]"
                        maxLength={100}
                       
                      />
                    </FormControl>
                    <FormMessage />
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
                      onClick={() => {}}
                      >
                          <EyeIcon className="h-4 w-4"/>
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
          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-indigo-800 text-gray-200 hover:bg-indigo-900 hover:text-gray-300 shadow-lg"
          >
            {showTwoFactor ? "Bestätigen" : "Anmelden"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};