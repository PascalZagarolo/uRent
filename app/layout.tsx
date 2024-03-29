
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
  return (
    <html lang="en">
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9497499351411762" //@ts-ignore
     crossorigin="anonymous"></script>
      </head>
      <body className={inter.className}>  
      <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange> 
      <AuthContext>
      <ActiveStatus/>
      
      <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_CLOUD_SECRET}&libraries=places&callback=initMap`} async>
        </script>  
        {children}
      <ToasterContext/>
    <Toaster/>
    </AuthContext>
    <SpeedInsights/>
    <Analytics/>
    </ThemeProvider>
      </body>
    </html>
  )
}
