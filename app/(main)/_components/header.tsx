'use client'

import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { TruckIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
};

export const Header = ({
  label,
}: HeaderProps) => {

  const pathname = usePathname();

  const isLogin = pathname.includes("/login");
  const isReset = pathname.includes("/forget")
 

  return (
    <div className="w-full flex flex-col gap-y-2 items-center justify-center">
      <h1 className={cn(
        "text-3xl font-semibold flex items-center",
        font.className,
      )}>
        {isLogin ? (
          "Einloggen"
        ) : (
          isReset ? (
            "Passwort zurücksetzen"
          ) : (
            "Registrieren"
          )
        )}
      </h1>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  );
};