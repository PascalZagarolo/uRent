'use client'

import { Button } from "@/components/ui/button";
import axios from 'axios'


import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from "react";
import { signIn, useSession, } from "next-auth/react";

import { useRouter } from "next/navigation";

import { GithubIcon } from "lucide-react";
import Input from "@/components/input";
import toast from "react-hot-toast";






const CredForm = ({

}) => {

  const session = useSession();

  type Variant = "LOGIN" | "REGISTER";

  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');

  
  const [isLoading, setIsLoading] = useState(false);

  console.log(session)

  /* useEffect(() => {
     if (session.status === 'authenticated' ) {
      router.push('/')
    }
  }, [session?.status, router]); */

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
      .catch(() => toast.error('Etwas ist schief gelaufen'))
      .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/')
        }
      })
      .finally(() => setIsLoading(false))
    }
  }


  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form
          className="space-y-6"
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
          <div>
            <Button disabled={isLoading} type="submit" className="bg-blue-800 hover:bg-blue-800/50">
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
              <span className="bg-white px-2 text-gray-500">
                sonstige Anmeldemöglichkeiten
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2 justify-center">
            <Button variant="ghost">
              <GithubIcon />
            </Button>

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