
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'


import { Toaster } from '@/components/ui/toaster'
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'
import ActiveStatus from '@/components/ActiveStatus'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from '@/components/theme-provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'uRent - Rental Service',
  description: 'uRent',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
      
      <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      >
      
      <AuthContext>
      <ActiveStatus/>
      <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_CLOUD_SECRET}&libraries=places&callback=initMap`} async></script>
      
      {children}
      
      <ToasterContext/>
    <Toaster/>
    </AuthContext>
    <SpeedInsights/>
    </ThemeProvider>
      
    
    
    
      
      </body>
    </html>
  )
}
