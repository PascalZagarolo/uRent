'use client'

import { Button } from "@/components/ui/button";



import {  useForm } from 'react-hook-form';
import { useState, useTransition } from "react";


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import { reset } from "@/actions/reset";
import toast from "react-hot-toast";

const ResetForm = () => {

  const ResetSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    }),
  });

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
          if(data?.success) {
            toast.success("Email wurde gesendet");
          } else if(data?.error) {
            toast.error(data.error);
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
          className="space-y-6"
        >
          <div className="space-y-4">
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
                      className="dark:bg-[#3B3B3B] "
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default ResetForm;