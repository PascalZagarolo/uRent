"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
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

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Diese Email wurde schon mit einem anderen Account verknüpft. Bitte logge dich mit dem anderen Account ein."
    : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

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
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          
        })
        .catch(() => setError("Something went wrong"));
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
                    <FormLabel>Two Factor Code</FormLabel>
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
                          placeholder="john.doe@example.com"
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
                          placeholder="******"
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
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};