import { MessageCircleIcon, SettingsIcon, X, XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


interface NewMessageToastProps {
  t: any;
  usedImageUrl: string;
  notification: any;
  startedConversation?: boolean;
}

const NewMessageToast: React.FC<NewMessageToastProps> = ({
  t,
  usedImageUrl,
  notification,
  startedConversation
}) => {

  const router = useRouter();

  return (
    <div
      className={`${t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-[#191919] shadow-lg rounded-lg border-indigo-800 border pointer-events-auto flex ring-1 ring-black ring-opacity-5 ml-auto `}
    >
      <div className="flex bg-indigo-800 rounded-l-md">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent hover:cursor-pointer rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium
           text-gray-200 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <MessageCircleIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">

          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-8 w-8 rounded-md object-cover"
              src={usedImageUrl}
              alt=""

            />
          </div>
          <div className="ml-3 flex-1">
            <div className="flex flex-row">
              <p className="text-sm font-medium text-gray-200/60">
                <span className="text-gray-200 font-bold hover:underline hover:cursor-pointer break-all">
                  <a className="" onClick={() => router.push(`/conversation?conversationId=${notification?.conversationId}`)}
                    target="_blank" rel="noreferrer"
                  >
                    {notification?.content}</a></span> hat dir eine Nachricht gesendet
              </p>
              <div className="ml-auto px-2 gap-x-2 flex flex-row" onClick={() => toast.dismiss(t.id)}>
                <SettingsIcon 
                className="w-4 h-4"
                />
                <XIcon className="w-4 h-4 text-gray-200 hover:text-gray-600 hover:cursor-pointer" />
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              {startedConversation ? (
                "Hat eine Konversation mit dir gestartet"
              ) : (
                "Dir wurde eine neue Nachricht gesendet."
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="flex bg-[#131620]">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium
           text-rose-800 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <XIcon className="w-8 h-8" />
        </button>
      </div>
      */}
    </div>
  );
}

export default NewMessageToast;