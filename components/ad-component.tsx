'use client'

import React, { useEffect } from 'react';

const AdsComponent = (props?: any) => {



    try {

        useEffect(() => {
            try {
                
                ((window as any).adsbygoogle = (window as any)?.adsbygoogle || []).push({});
            }

            catch (e) {
            }
        }, []);

        return (

            <>
                <ins className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client="ca-pub-9497499351411762"
                    data-ad-slot="3797720061"
                    data-ad-format="auto"
                    data-full-height-responsive="true"
                    data-full-width-responsive="true"></ins>
            </>

        );
    } catch (e: any) {
        console.log(e);
        return (
            <>
            </>
        )
    }

};

export default AdsComponent;