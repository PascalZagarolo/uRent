"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
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
import { CheckIcon, EyeIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useDebounce } from "@/hooks/use-debounce";
import { checkIsAvailable } from "@/actions/name/check-username";



export const RegisterForm = () => {
  const [name , setName] = useState<string>("")
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [receivesEmails, setReceivesEmails] = useState<boolean>(true);

  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [nameAvailable, setNameAvailable] = useState<boolean>(false);

  const passwordMatch = password1 === password2 && password1.length > 0 && password2.length > 0;

  var format1 = /^.*[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?-].*$/;
  const hasSymbol = format1.test(password1) && password1.length >= 6;

  const value = useDebounce(name, 100);

  useEffect(() => {
    const checkUserName = async () => {
      try {
      
        setIsLoading(true)
        if(name?.trim() !== "") {
          const isAvailable = await checkIsAvailable(name)
          if(isAvailable) {
            setNameAvailable(true)
          } else {
            setNameAvailable(false)
          }
        }
      } catch(e : any) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }
    checkUserName()

  },[value])

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      password2: "",
      name: "",
      receivesEmails: true
    },
  });

  const onSubmit = async(values: z.infer<typeof RegisterSchema>) => {

    setError("");
    setSuccess("");

    const value = {
      email: values.email,
      password: values.password,
      name: values.name,
      receivesEmails: receivesEmails
    }
    const isAvailable = await checkIsAvailable(name)
    
    if(!isAvailable) {
      setError("Nutzername ist bereits vergeben")
      setNameAvailable(false)
      return
    }
    

    startTransition(() => {
      
      register(value)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          if(data.success) {
            toast.success("Account erfolgreich erstellt. Wir haben dir eine E-Mail geschickt, um deine E-Mail-Adresse zu bestätigen.")
          }
        });

    });
  };

  const onHold = (index : number) => {
    if(index === 1) {
      setShowPassword(true)
    } else {
      setShowPassword2(true)
    }
  }

  const onRelease = (index : number) => {
    if(index === 1) {
      setTimeout(() => {
        setShowPassword(false)
      }, 200)
    } else {
      setTimeout(() => {
        setShowPassword2(false)
      }, 200)
    }
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
          className="space-y-4"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Nutzername</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Max Mustermann"
                      className="bg-[#1B1F2C] border-none"
                      maxLength={60}
                      onChange={(e) => {
                        field.onChange(e);
                        setName(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {name?.trim() !== "" && (
                    nameAvailable ? (
                      <span className="text-gray-200 flex flex-row items-center py-1">
                        <CheckIcon className="h-4 w-4 text-emerald-600 mr-2" /> <p className="text-xs">Nutzername ist verfügbar</p>
                      </span>
                    ) : (
                      <span className="text-gray-200 flex flex-row items-center py-1">
                        <X className="h-4 w-4 text-rose-600 mr-2" />  <p className="text-xs">Nutzername ist bereits vergeben</p>
                      </span>
                    )
                  )}
                </FormItem>
              )}
            />

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
                      placeholder="max.muster@email.com"
                      type="email"
                      className="bg-[#1B1F2C] border-none"
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
                  <div className="flex ">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="**********"
                        maxLength={20}
                        type={showPassword ? "text" : "password"}
                        className="rounded-none rounded-l-md bg-[#1B1F2C] border-none"
                        onChange={(e) => {
                          setPassword1(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <Button variant="ghost" className="bg-[#1a1c2c] rounded-none rounded-r-md"
                      onMouseDown={() => {onHold(1)}}
                      onMouseUp={() => {onRelease(1)}}
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
            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Passwort bestätigen</FormLabel>
                  <div className="flex ">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="**********"
                        maxLength={20}
                        type={showPassword2 ? "text" : "password"}
                        className="rounded-none rounded-l-md bg-[#1B1F2C] border-none"
                        onChange={(e) => {
                          setPassword2(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <Button variant="ghost" className="bg-[#1a1c2c] rounded-none rounded-r-md"
                      onMouseDown={() => {onHold(2)}}
                      onMouseUp={() => {onRelease(2)}}
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
          <div className="text-xs text-gray-200 space-y-0">
            <div>uRent schickt dir regelmäßig E-Mails mit Produktupdates, Angeboten und weiteren hilfreichen Informationen.</div> <br />



            <Accordion type="single" collapsible className=" text-xs border-none space-y-0 p-0 ">

              <AccordionItem value="item-1" className="border-none">
                <div className="flex items-center gap-x-1">Du kannst dich jederzeit von diesen E-Mails
                  <AccordionTrigger className="p-0 ">abmelden.</AccordionTrigger>
                </div>
                <AccordionContent className="border-none flex items-center gap-x-2 mt-4">
                  <Checkbox className="h-3 w-3"
                    checked={!receivesEmails}
                    onCheckedChange={() => setReceivesEmails(!receivesEmails)}
                  /> <Label className="text-xs"> Ich möchte keine Emails von uRent bekommen </Label>
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
            disabled={isPending || !passwordMatch || !hasSymbol || !nameAvailable}
            type="submit"
            className="w-full bg-indigo-800 hover:bg-indigo-900
             text-gray-200 hover:text-gray-300 shadow-lg"
             
          >
            Account erstellen
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};