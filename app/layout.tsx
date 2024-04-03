
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'


import { Toaster } from '@/components/ui/toaster'
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'
import ActiveStatus from '@/components/ActiveStatus'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from '@/components/theme-provider'
import ReactGA from "react-ga4"



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mieten mit uRent',
  description: `PKW, Transporter, LKW, Anhänger und vieles mehr. Mieten oder Vermieten Sie Ihre Nutzfahrzeuge mit uRent. 
  Mieten Sie Ihr gewünschtes Fahrzeug oder Vermieten Sie schnell und bequem, ob privat oder gewerblich, auf uRent.`
  
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  ReactGA.initialize('G-CTJ3FVZ2R4')
  if (typeof window !== "undefined") {
    ReactGA.send({
      hitType : 'pageview',
      page : window?.location.pathname
    })
  }
  

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="uRent.png"/>
        
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CTJ3FVZ2R4"></script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9497499351411762"
     crossorigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <AuthContext>
            <ActiveStatus />
            <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_CLOUD_SECRET}&libraries=places&callback=initMap`} async>
            </script>
            {children}
            <ToasterContext />
            <Toaster />
          </AuthContext>
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
