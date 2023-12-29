import Image from "next/image";

const Avatar = () => {
    return ( 
        <div>
            <Image
            className="flex justify-center rounded-full"
            src="/placeholder-person.jpg"
            height="120"
            width="120"
            alt="profilepic"
            />
        </div>
     );
}
 
export default Avatar;