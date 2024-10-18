'use client'

import React, { useEffect } from 'react';
import AdSense from 'react-adsense';
const AdsComponent = (props: any) => {
    const { dataAdSlot } = props;



    useEffect(() => {

        try {
            //@ts-ignore
            (window.adsbygoogle = window?.adsbygoogle || []).push({});
        }

        catch (e) {
            console.log(e)
        }

    }, []);



    return (
        <>
            <AdSense.Google
                client='ca-pub-9497499351411762'
                slot='3797720061'
                style={{ display: 'block' }}
                format='auto'
                responsive='true'
                layoutKey='-gw-1+2a-9x+5c'
            />
        </>
    );
};

export default AdsComponent;