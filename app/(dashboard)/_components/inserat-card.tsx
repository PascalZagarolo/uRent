import { Separator } from "@/components/ui/separator";
import { Images, Inserat, User } from "@prisma/client";
import { CarFront } from "lucide-react";
import Image from "next/image";

interface InseratCardProps {
    inserat: Inserat & { images : Images[], user : User }
}

const InseratCard: React.FC<InseratCardProps> = ({
    inserat
}) => {

    const formatDate = (inputDate: Date): string => {
        const day = inputDate.getDate().toString().padStart(2, '0');
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
      };

    return (
        <div className="w-[400px] h-[300px]  border-black border-2 rounded-md">
            <h3 className="flex justify-start font-semibold mt-1 ml-2">
                <CarFront className="mr-2" /> {inserat.title} 
            </h3>
            <Separator
            className="w-8 bg-black rounded-lg ml-2 mt-2"
            />
            <div className="flex justify-center mt-4">
                <Image
                src={inserat.images[0].url}
                height={200}
                width={300}
                alt = "Car-Vorschau"
                className="rounded-md border border-black"
                />
            </div>

            <div className="ml-2 mt-2">
                <Separator
                className="ml-2 w-8 bg-black"
                />
                <div className="flex mt-2">
                    <p className="text-gray-900/80 font-black mr-4 ">
                        Zeitraum : 
                    </p>
                    <p className="font-semibold">
                        {formatDate(inserat.begin)}
                    </p>
                    <p className="font-bold text-blue-800 mr-2 ml-2">
                        -
                    </p>
                    <p className="font-semibold">
                    {formatDate(inserat.end)}
                    </p>
                </div>

                <div className="font-semibold text-gray-900 flex ">
                    <p className="mr-2">
                        Preis : 
                    </p>
                    {inserat.price} €
                </div>
            </div>
            <div className="rounded-md bg-[#6e7ab3]">
                <div className="flex mt-4 items-center border border-black rounded-md">
                    <Image
                    className="rounded-full ml-2 mt-2 mb-2 border border-[#555e89] "
                    src={inserat.user.image}
                    height={40}
                    width={40}
                    alt="User-Bild"
                    />
                    <p className="ml-4 font-semibold text-gray-900">
                        {inserat.user.name}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default InseratCard;