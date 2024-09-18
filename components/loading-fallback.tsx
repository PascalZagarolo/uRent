import { ClipLoader } from "react-spinners";

const LoadingFallBack = () => {
    return ( 
        <div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
                    <ClipLoader color="white" loading={true} size={32} />
                </div>
        </div>
     );
}
 
export default LoadingFallBack;