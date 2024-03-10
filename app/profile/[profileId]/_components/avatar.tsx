import Image from "next/image";


interface AvatarProps {
    imageUrl? : string
}

const Avatar: React.FC<AvatarProps> = ({
    imageUrl
}) => {
    return ( 
        <div className="sm:h-[120px] w-1/8  rounded-full ">
            <img 
        src={imageUrl || "/placeholder-person.jpg"} 
        className="rounded-full  object-cover  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] h-[120px] w-1/8"
        alt="Person"
    />
    
</div>
     );
}
 
export default Avatar;