import Image from "next/image";


interface AvatarProps {
    imageUrl? : string
}

const Avatar: React.FC<AvatarProps> = ({
    imageUrl
}) => {
    return ( 
        <div>
            <Image
            className="flex justify-center rounded-full"
            src={imageUrl || "/placeholder-person.jpg"} 
            height="120"
            width="120"
            alt="profilepic"
            />
        </div>
     );
}
 
export default Avatar;