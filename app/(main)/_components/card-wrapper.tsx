"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Social } from "./social";
import { Header } from "./header";
import { BackButton } from "./back-button";
import { Label } from "@/components/ui/label";
import RegisterWrapper from "./card-wrappers/register-wrapper";
import LoginWrapper from "./card-wrappers/login-wrapper";
import { useEffect, useState } from "react";


interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps) => {


  const currentPath = window.location.pathname;

  
  const [isRegister, setIsRegister] = useState(currentPath === "/register");

  useEffect(() => {
    setIsRegister(window.location.pathname === "/register");
  }, []);

  return (
    <div className="flex flex-row items-center shadow-lg">
      <div className="h-full bg-indigo-800 rounded-r-none rounded-l-md hidden lg:block">
        { isRegister ? (
          <RegisterWrapper />
        ) : (
          <LoginWrapper />
        )}
      </div>
      <Card className="xl:w-[640px] sm:w-[600px] flex-wrap  h-full lg:px-12 shadow-md bg-[#1F2332] dark:border-none rounded-none rounded-r-none">
      <CardHeader className="text-left">
          <Header label={headerLabel} />
        </CardHeader>
        <CardContent className="py-0">
          {children}
        </CardContent>
        {showSocial && (
          <div className="mt-2">
            <CardFooter className="">
              <Social />
            </CardFooter>
          </div>
        )}
        <CardFooter className="mt-4">
          <BackButton
            label={backButtonLabel}
            href={backButtonHref}
          />
        </CardFooter>
      </Card>
    </div>
  );
};