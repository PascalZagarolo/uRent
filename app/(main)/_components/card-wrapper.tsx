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
  return (
    <Card className="w-[400px] shadow-md bg-[#1F2332] dark:border-none">
      <CardHeader>
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
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};