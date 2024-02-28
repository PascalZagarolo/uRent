import { Button } from "@/components/ui/button";
import { BookingRequest, Images, Inserat, User } from "@prisma/client";
import { format } from "date-fns";
import { CarFrontIcon, Check, MailCheck, X } from "lucide-react";
import Image from "next/image";


interface BookingRequestRenderProps {
    request : BookingRequest & {inserat : Inserat & {images : Images[]}, user : User};
}

const BookingRequestRender: React.FC<BookingRequestRenderProps> = ({
    request
}) => {
    return ( 
        <div className="bg-[#141414] p-4 mt-2 rounded-md ">
            <div className="flex w-full truncate font-semibold items-center">
             <CarFrontIcon className="w-4 h-4 mr-2"/>    <p className="w-[200px] truncate">
             {request.inserat.title} 
             </p>
             <div className="ml-auto">
                <Button className=" p-4 mr-2" variant="ghost" size="sm">
                    <Check className="h-4 w-4 text-emerald-600"/>
                </Button>
                <Button className=" p-4" variant="ghost" size="sm">
                    <X className="h-4 w-4 text-rose-600"/>
                </Button>
            </div>
            </div>
            <div className="justify-center flex w-full h-[100px] mt-2">
                <Image 
                className="min-h-[50px] min-w-[300px] object-cover flex justify-center"
                src={request.inserat.images[0].url}
                alt="Inserat-Bild"
                width={200}
                height={50}
                />
            </div>
            <div className="flex w-full mt-2">
                
                <div className="text-sm w-3/5 flex items-center">
                
                <div className="mr-2">
                    <Image 
                    className="w-[30px] h-[30px] rounded-full"
                    src={request.user.image}
                    alt="Profilbild"
                    width={30}
                    height={30}
                    />
                </div>
                    <div>
                   
                    <p className="font-semibold">{request.user.name}</p>
                    </div>
                
                </div>
                <div className="text-sm w-2/5">
                <p className="text-xs font-semibold">Datum:</p>
                    <div className="flex">
                    <p className="mr-1">{format(new Date(request.startDate), "dd.MM")}</p>
                    -
                    <p className="ml-1">{format(new Date(request.endDate), "dd.MM.yy")}</p>
                    </div>
                </div>
            
            
            </div>
            <div className="w-full mt-2">
                <Button className="w-full bg-[#1C1C1C] text-gray-200 flex">
                   <MailCheck className="mr-2 h-4 w-4" /> Anfragensteller kontaktieren
                </Button>
            </div>
        </div>
     );
}
 
export default BookingRequestRender;