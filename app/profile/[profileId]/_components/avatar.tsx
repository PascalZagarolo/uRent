import Image from "next/image";


interface AvatarProps {
    imageUrl? : string
}

const Avatar: React.FC<AvatarProps> = ({
    imageUrl
}) => {
    return ( 
        <div className="h-[120px] w-[120px]  rounded-full ">
            <img 
        src={imageUrl || "/placeholder-person.jpg"} 
        className="rounded-full  object-cover border-2 border-gray-700 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] h-[120px] w-[120px]"
        alt="Person"
    />
    
</div>
     );
}
 
export default Avatar;