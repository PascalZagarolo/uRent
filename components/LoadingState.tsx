'use client';

import { ClipLoader } from "react-spinners";
import React, { useEffect } from "react";
import { useLoading } from "@/store";


const LoadingProvider = ({ children }) => {
    const { isLoading } = useLoading();

    

    useEffect(() => {
        if (isLoading) {
            // Disable scrolling
            document.body.style.overflow = 'hidden';
        } else {
            // Enable scrolling
            document.body.style.overflow = '';
        }

        // Cleanup when the component is unmounted or loading ends
        return () => {
            document.body.style.overflow = '';
        };
    }, [isLoading]);

    return (
        <div className="">
            {/* Overlay when loading */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
                    <ClipLoader color="white" loading={true} size={32} />
                </div>
            )}

            {/* Children content with opacity effect when loading */}
            <div className={isLoading ? "opacity-50" : "opacity-100"}>
                {children}
            </div>
        </div>
    );
}

export default LoadingProvider;