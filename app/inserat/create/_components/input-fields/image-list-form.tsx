import { Image } from "@prisma/client";

interface ImageListFormProps {
    image : Image;
}

const ImageListForm: React.FC<ImageListFormProps> = ({
    image
}) => {
    return ( 
        <div key={image.id} className="mt-2">
            <div>
                <div>
                    {image.url}
                </div>
            </div>
        </div>
     );
}
 
export default ImageListForm;