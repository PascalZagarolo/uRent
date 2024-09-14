"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";


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

import { newPassword } from "@/actions/new-password";
import { CardWrapper } from "./card-wrapper";
import { NewPasswordSchema } from "@/schemas/new-password-schema";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { CheckIcon, X } from "lucide-react";
import { Label } from "@/components/ui/label";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const passwordMatch = password1 === password2 && password1.length > 0 && password2.length > 0;

  var format1 = /^.*[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?-].*$/;
  const hasSymbol = format1.test(password1) && password1.length >= 6;

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      password2: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Gebe dein neues Passwort ein"
      backButtonLabel="Zurück zum Login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Passwort</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      className="bg-[#1B1F2C] border-none"
                      onChange={(e) => {
                        setPassword1(e.target.value);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Passwort bestätigen</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      className="bg-[#1B1F2C] border-none"
                      onChange={(e) => {
                        setPassword2(e.target.value);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center space-x-4">
              {hasSymbol ? (
                <CheckIcon className="h-4 w-4 text-emerald-600" />
              ) : (
                <X className="w-4 h-4 text-rose-600" />
              )}
              <Label className="text-sm">
                6 - 20 Zeichen (+ Sonderzeichen)
              </Label>
            </div>
            <div className="flex flex-row items-center space-x-4">
              {passwordMatch ? (
                <CheckIcon className="h-4 w-4 text-emerald-600" />
              ) : (
                <X className="w-4 h-4 text-rose-600" />
              )}
              <Label className="text-sm">
                Passwörter stimmen überein
              </Label>
            </div>

          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending || !passwordMatch || !hasSymbol}
            type="submit"
            className="w-full shadow-lg bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300"
          >
            Passwort zurücksetzen
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};