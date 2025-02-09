"use client";

import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createAuthorizationURL } from "@/actions/register";
import toast from "react-hot-toast";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const currentPath = window.location.pathname;

  const buttonText = currentPath === "/login"
    ? "Mit Google einloggen"
    : "Mit Google registrieren";




  const onGoogle = async () => {
    const res = await createAuthorizationURL();
    console.log(res);
    if (res.error) {
      toast.error("Etwas ist schief gelaufen");
    } else if (res.success) {
      window.location.href = res.data.toString();
    }
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="default"
        className="w-full bg-[#161825] border hover:bg-black/80 border-none gap-x-4 shadow-2xl"
        variant="outline"
        onClick={onGoogle}
      >
        <FcGoogle className="h-4 w-4" />
        {buttonText}
      </Button>
    </div>
  );
};
