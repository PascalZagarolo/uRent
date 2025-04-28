import { Button } from "@/components/ui/button";
import { userTable } from "@/db/schema";
import axios from "axios";
import { SendIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiSendPlaneFill } from "react-icons/ri";


interface ContactUserProps {
    currentUser : typeof userTable.$inferSelect;
}

const ContactUser = ({ currentUser }) => {

    const otherUser = useParams().profileId;

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const onConversation = async () => {
        try {
            if(!currentUser || !currentUser.id) {
                return router.push("/login");
            }

            if(!otherUser) {
                return toast.error("Nutzer nicht gefunden");
            }

            const response = await axios.post(`/api/conversation/${currentUser.id}/${otherUser}`);
            
            if(response.data?.id) {
                return router.push(`/conversation?conversationId=${response.data.id}`);
            } else {
                return toast.error("Fehler beim Kontaktieren des Nutzers");
            }
            

        } catch(e : any) {
            console.log(e);
            return toast.error("Fehler beim Kontaktieren des Nutzers");
        }
    }

    return ( 
        <div>
            <Button 
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white 
                shadow-lg sm:text-sm text-xs transition-all duration-300 hover:shadow-indigo-900/20"  
                variant="ghost"
                disabled={isLoading} 
                onClick={onConversation}
            >
                <RiSendPlaneFill className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                Nutzer kontaktieren
            </Button>
        </div>
     );
}
 
export default ContactUser;