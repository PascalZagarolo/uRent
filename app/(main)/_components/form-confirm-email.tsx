import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { LuRefreshCcw } from "react-icons/lu";

interface FormConfirmEmailProps {
  message?: string;
  email : string;
  onSend? : () => void;
};

export const FormConfirmEmail = ({
  message,
  email
}: FormConfirmEmailProps) => {
  if (!message) return null;

  const onMailSend = async () => {
    try{
      
      const verificationToken = await generateVerificationToken(
        email,
      );
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );
      toast.success("Eine neue Bestätigungs Email wurde an deine Email Adresse gesendet.");
    } catch(e : any) {
      console.log(e);

    }
  }

  return (
    <div>
      <div className="bg-indigo-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-gray-200">
        <CheckCircledIcon className="h-4 w-4" />
        <p>{message}</p>
      </div>
      <div className="text-xs mt-2 text-gray-200/80 flex flex-row items-center gap-x-2 hover:underline hover:cursor-pointer">
        <LuRefreshCcw className="w-4 h-4 mr-2" /> Neue E-Mail senden
      </div>
    </div>
  );
};