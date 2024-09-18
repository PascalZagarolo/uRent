'use client';

import { ClipLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import { useLoading } from "@/store";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress"


const LoadingProvider = ({ children }) => {
    const { isLoading, changeLoading } = useLoading();
    const [currentSwitching, setCurrentSwitching] = useState(false)


    useEffect(() => {
        if (isLoading || currentSwitching) {
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
    }, [isLoading, currentSwitching]);

    let pathname = usePathname()
    let searchParams = useSearchParams()

    useEffect(() => {
        const handleStart = () => {
            setCurrentSwitching(true);
            NProgress.start(); 
        };

        const handleStop = () => {
            setCurrentSwitching(false);
            NProgress.done(); 
        };

        handleStart(); 
        handleStop();  

        return () => {
            handleStop();
        };
    }, [pathname, searchParams]);

    return (
        <div className="">
            {/* Overlay when loading */}
            {(isLoading || currentSwitching) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
                    <ClipLoader color="white" loading={true} size={32} />
                </div>
            )}

            {/* Children content with opacity effect when loading */}
            <div className={(isLoading || currentSwitching) ? "opacity-50" : "opacity-100"}>
                {children}
            </div>
        </div>
    );
}

export default LoadingProvider;