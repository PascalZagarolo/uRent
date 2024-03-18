import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { TruckIcon } from "lucide-react";

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
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn(
        "text-4xl font-semibold flex items-center",
        font.className,
      )}>
        <TruckIcon className="w-6 h-6 mr-2" /> uRent
      </h1>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  );
};