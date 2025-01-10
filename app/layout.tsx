

import { Inter } from 'next/font/google'
import './globals.css'


import { Toaster } from '@/components/ui/toaster'
import ToasterContext from './context/ToasterContext'

import ActiveStatus from '@/components/ActiveStatus'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from '@/components/theme-provider'
import LoadingProvider from '@/components/LoadingState'
import { Suspense } from 'react'
import LoadingFallBack from '@/components/loading-fallback'


const inter = Inter({ subsets: ['latin'] })




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {




  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/uRent.png" />
        <meta name="keywords" content="mieten, vermieten, Nutzfahrzeuge, Pkw, Lkw, Transporter, Anhaenger" />




        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16814367985"></script>

        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16814367985"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag() {
                        dataLayer.push(arguments);
                        }
                    gtag('js', new Date());

                    gtag('config', 'AW-16814367985');
                    `
        }} async>

        </script>
        <script dangerouslySetInnerHTML={{
          __html: `
                    !function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1328385231485028');
fbq('track', 'PageView');
                    `
        }} async>

        </script>




        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CTJ3FVZ2R4"></script>

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9497499351411762" //@ts-ignore
          crossorigin="anonymous"></script>
        <noscript><img height="1" width="1" className="display:none"
          src="https://www.facebook.com/tr?id=1328385231485028&ev=PageView&noscript=1"
        /></noscript>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>

          <LoadingProvider>
            <ActiveStatus />
            
            <Suspense fallback={<LoadingFallBack />}>
              {children}
            </Suspense>
            <ToasterContext />
            <Toaster

            />

            <SpeedInsights />
            <Analytics />
          </LoadingProvider>

        </ThemeProvider>
      </body>
    </html>
  )
}
