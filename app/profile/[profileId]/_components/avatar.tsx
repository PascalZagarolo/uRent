import Image from "next/image";


interface AvatarProps {
    imageUrl? : string
}

const Avatar: React.FC<AvatarProps> = ({
    imageUrl
}) => {
    return ( 
        <div className="h-[120px] w-[120px] overflow-hidden ">
    <img 
        src={imageUrl || "/placeholder-person.jpg"} 
        className="rounded-full h-full w-full object-cover border-2 border-gray-700 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
        alt="Person"
    />
</div>
     );
}
 
export default Avatar;