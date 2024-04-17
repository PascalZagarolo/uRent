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

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {

    setError("");
    setSuccess("");
    
    startTransition(() => {
      
      login(values)
      
        .then((data) => {
          if (data?.error) {
            if (!showTwoFactor) { 
                form.reset()
            }
            setError(data.error) 
        } 

          
          if (data?.success) {
            console.log("this");
            setSuccess(data.success);
            form.reset();
            toast.success("Erfolgreich eingeloggt");
            setTimeout(() => {
              router.push("/")
            })
            
          }

          if (data?.twoFactor) {
            console.log("this");
            setShowTwoFactor(true);
          }
          
        })
        .catch(() => setError("Etwas ist schief gelaufen.."));

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
      showSocial
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
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
                        placeholder="123456"
                        className="bg-[#1F2332]"
                        
                       
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
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="max.muster@email.com"
                          type="email"
                          className="bg-[#1a1c2c] border-none"
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
                    <FormItem>
                      <FormLabel>Passwort</FormLabel>
                      <div className="flex rounded-lg w-full gap-x-1">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="**********"
                          type={showPassword ? "text" : "password"}
                          className="bg-[#1a1c2c] border-none rounded-none"
                        />
                        
                      </FormControl>
                      <Button variant="ghost" className="bg-[#1a1c2c] rounded-none " 
                      onMouseDown={onHold} 
                      onMouseUp={onRelease}
                      type="button"
                      onClick={() => {}}
                      >
                          <EyeIcon className="h-4 w-4"/>
                        </Button>
                        </div>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/forget">
                          Password vergessen?
                        </Link>
                      </Button>
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
            className="w-full"
          >
            {showTwoFactor ? "Bestätigen" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};