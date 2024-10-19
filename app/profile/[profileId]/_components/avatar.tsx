import Image from "next/image";


interface AvatarProps {
    imageUrl? : string
}

const Avatar: React.FC<AvatarProps> = ({
    imageUrl
}) => {
    return ( 
        <div className="sm:h-[120px] sm:w-[120px] h-[80px]  w-[80px] ">
            <img 
        src={imageUrl || "/placeholder-person.jpg"} 
        className="rounded-full  object-cover   sm:h-[120px] h-[80px] sm:w-[120px] w-[80px]"
        alt="Person"
    />
    
</div>
     );
}
 
export default Avatar;