'use client'

import { Button } from "@/components/ui/button";
import axios from 'axios'


import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from "react";
import { signIn, useSession, } from "next-auth/react";

import { useRouter, useSearchParams } from "next/navigation";

import { Eye, GithubIcon } from "lucide-react";
import Input from "@/components/input";
import toast from "react-hot-toast";
import getCurrentUser from "@/actions/getCurrentUser";
import Link from "next/link";






const ResetForm = ({

}) => {


  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || "/",
    });
  }

  const session = useSession();

  type Variant = "LOGIN" | "REGISTER";

  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');

  
  const [isLoading, setIsLoading] = useState(false);

  console.log(session)

   useEffect(() => {
     if (session.status === 'authenticated' ) {
      router.push('/')
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else if (variant === 'REGISTER') {
      setVariant('LOGIN')
    }
  }, [variant])

  
  

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });


 

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  
    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
      .then(() => signIn('credentials', {
        ...data,
        redirect: false,
      }))
      .then((callback) => {
        if (callback?.error) {
          toast.error('Ungültige Anmeldedaten!');
        }

        if (callback?.ok) {
          router.push('/')
        }
      })
      .catch(() => toast.error('Etwas ist schiefgelaufen'))
      .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Ungültige Zugangsdaten');
        }

        if (callback?.ok) {
          router.push('/')
        }
      })
      .finally(() => setIsLoading(false))
    }
  }


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
        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email"
            type="email"
          />
          
          <div>
            <Button disabled={isLoading} type="submit" className="bg-[#1f2332] hover:bg-[#25293a] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
             dark:bg-[#0d0d0d] dark:hover:bg-[#171717] dark:text-gray-100">
              Email anfordern
            </Button>
          </div>
        </form>

        
        
      </div>
      
    </div>
  );
}

export default ResetForm;