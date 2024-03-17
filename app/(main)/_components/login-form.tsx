'use client'

import { Button } from "@/components/ui/button";
import axios from 'axios'


import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from "react";
import { signIn, useSession, } from "next-auth/react";

import { useRouter, useSearchParams } from "next/navigation";


import Input from "@/components/input";
import toast from "react-hot-toast";
import Link from "next/link";






const CredForm = ({

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
          
            toast.success('Erfolgreich angemeldet');
            
          
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
          
            toast.success('Erfolgreich angemeldet');
          
        }
      })
      .finally(() => setIsLoading(false))
    }

    
  }


  return (
    <div className="mt-8 w-full px-2 sm:px-0 sm:mx-auto sm:w-full sm:max-w-md ">
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
          {variant === 'REGISTER' && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Nutzername"
            
              
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email"
            type="email"
          />
          
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Passwort"
            type="password"
            
          /> 
          
            
              <Link href={"/forget"} className="underline text-xs">
                Passwort vergessen?
              </Link>
            
          
          
          <div>
            <Button disabled={isLoading} type="submit" className="bg-[#1f2332] hover:bg-[#25293a] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
             dark:bg-[#0d0d0d] dark:hover:bg-[#171717] dark:text-gray-100">
              {variant === 'LOGIN' ? 'Einloggen' : 'Registrieren'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500  dark:bg-[#161616] dark:text-gray-100/70">
                sonstige Anmeldemöglichkeiten
              </span>
            </div>
          </div>

          <div className="flex mt-4  justify-center ">
            <div className="w-full gap-y-4">
            
            <Button variant="ghost" className="text-medium w-full  bg-gray-100  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
             dark:bg-[#0d0d0d] dark:hover:bg-[#171717]" 
            onClick={() => {onClick("google")}}>
              Google
            </Button>
            </div>
          </div>
        </div>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {variant === 'LOGIN' ? 'Neu auf uRent?' : 'Ich besitze schon einen Account'}
          </div>
          <div
            onClick={toggleVariant}
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Erstelle einen Account' : 'Einloggen'}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default CredForm;