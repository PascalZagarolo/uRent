import { MessageCircleIcon, XIcon } from "lucide-react";
import toast from "react-hot-toast";
import { TbMailExclamation } from "react-icons/tb";


interface BookingRequestToastProps {
  t: any;
  usedImageUrl: string;
  notification: any;
}

const BookingRequestToast: React.FC<BookingRequestToastProps> = ({
  t,
  usedImageUrl,
  notification
}) => {
  return (
    <div
      className={`${t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-[#191919] shadow-lg rounded-lg border-yellow-500 border pointer-events-auto flex ring-1 ring-black ring-opacity-5 ml-auto `}
    >
      <div className="flex bg-yellow-500 rounded-l-md">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium
           text-gray-200 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <TbMailExclamation  className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">

          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-8 w-8 rounded-md"
              src={usedImageUrl}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-gray-200">
              Buchungsvorschlag
            </p>
            <div className="mt-1 text-sm text-gray-500">
              <span className="text-gray-200/60 font-semibold hover:underline hover:cursor-pointer">{notification?.content}</span> wurde für eine Buchung angefragt
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

export default BookingRequestToast;