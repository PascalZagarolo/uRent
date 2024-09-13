"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
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

import { reset } from "@/actions/reset";
import { ResetSchema } from "@/schemas/reset-password-schema";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Gebe deine Email ein mit der du dich auf uRent registriert hast, um dein Passwort zurückzusetzen."
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
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                    className="bg-[#1B1F2C] border-none"
                      {...field}
                      disabled={isPending}
                      placeholder=""
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300 shadow-lg"
          >
            Email senden
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};