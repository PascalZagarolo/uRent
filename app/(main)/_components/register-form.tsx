"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
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
import { CardWrapper } from "./card-wrapper";
import { Button } from "@/components/ui/button";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { RegisterSchema } from "./_schemas";
import { register } from "@/actions/register";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";


export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          if (data.success) {
            setTimeout(() => {
              router.push("/login")
            }, 1000)
          }
        });

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
      headerLabel="Account erstellen"
      backButtonLabel="Du besitzt bereits einen Account ?"
      backButtonHref="/login"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nutzername</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Max Mustermann"
                      className="bg-[#1a1c2c] border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <div className="flex ">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="**********"
                        type={showPassword ? "text" : "password"}
                        className="rounded-none rounded-l-md bg-[#1a1c2c] border-none"
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
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <div className="text-xs text-gray-200">
            <div>uRent schickt dir regelmäßig E-Mails mit Produktupdates, Angeboten und weiteren hilfreichen Informationen.</div> <br />
            
              

              <Accordion type="single" collapsible className=" text-xs border-none">
              
              <AccordionItem value="item-1">
              <div className="flex items-center gap-x-1">Du kannst dich jederzeit von diesen E-Mails
              <AccordionTrigger>abmelden.</AccordionTrigger>
                  </div>
                  <AccordionContent className="border-none flex items-center gap-x-2">
                    <Checkbox className="h-3 w-3" /> <Label className="text-xs"> Ich möchte keine Emails von uRent bekommen </Label>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>


            
          </div>

          <div className="text-xs text-gray-200/90">
            Durch das Erstellen eines Kontos stimmst du den Nutzungsbedingungen und Datenschutzrichtlinien zu. <br />
            <div className="flex gap-x-0.5">Es gelten die bestimmenden uRent
              <a href="/agbs" target="_blank" rel="noreferrer noopener"
                className="font-semibold hover:underline">AGBs</a>
            </div>
            <div className="gap-x-0.5">
              Weitere Informationen, wie uRent deine Daten verwendet, <br /> findest du in den <a href="/data-privacy" target="_blank" rel="noreferrer noopener"
                className="font-semibold hover:underline">Datenschutzrichtlinien</a>
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
          >
            Account erstellen
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};