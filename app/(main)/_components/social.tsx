"use client";


import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { createAuthorizationURL } from "@/actions/register";
import toast from "react-hot-toast";


export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
 
  const onGoogle = async () => {
    const res = await createAuthorizationURL();

    if(res.error) {
      toast.error("Etwas ist schief gelaufen")
    } else if (res.success) {
      window.location.href = res.data.toString();
    }
  }
  

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="default"
        className="w-full bg-[#1a1c2c] border-none gap-x-4"
        variant="outline"
        onClick={onGoogle}
      >
        <FcGoogle className="h-4 w-4" />
        Mit Google einloggen
      </Button>
      
    </div>
  );
};