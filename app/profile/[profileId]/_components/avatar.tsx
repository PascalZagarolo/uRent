import Image from "next/image";


interface AvatarProps {
    imageUrl? : string
}

const Avatar: React.FC<AvatarProps> = ({
    imageUrl
}) => {
    return ( 
        <div className="sm:h-[100px] sm:w-[100px] h-[80px]  w-[80px] ">
            <img 
        src={imageUrl || "/placeholder-person.jpg"} 
        className="rounded-full  object-cover  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] sm:h-[100px] h-[80px] sm:w-[100px] w-[80px]"
        alt="Person"
    />
    
</div>
     );
}
 
export default Avatar;