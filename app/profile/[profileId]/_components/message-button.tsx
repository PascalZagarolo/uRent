'use client'

import { Button } from "@/components/ui/button";
import axios from "axios";

import { MailIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface MessageButtonProps {
    currentUserId? : string;
}

const MessageButton : React.FC<MessageButtonProps> = ({
    currentUserId
}) => {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onClick = async () => {
        try {
            setIsLoading(true);

            if(!currentUserId){
                router.push("/login")
                setIsLoading(false);
                return;
            } else {
                const res = await axios.post(`/api/conversation/${currentUserId}/${params.profileId}`)
                    .then((res) => {
                        console.log(res.data)
                        router.push(`/conversation/${res.data.id}`)
                    })
            }
        } catch(error : any){
            console.log(error);
            toast.error("Nachricht konnte nicht gesendet werden")
        } finally {
            setIsLoading(false);
        }
    }
    return ( 
        <div>
            <Button className="gap-x-2 font-semibold" variant="ghost" onClick={onClick}>
                  <MailIcon className="w-6 h-6" /> <p className="hidden sm:block">Nachricht schreiben</p>
            </Button>
        </div>
     );
}
 
export default MessageButton;