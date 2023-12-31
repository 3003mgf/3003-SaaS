import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { ThemeProvider } from '@/components/theme-provider'
import ClientProviders from '@/components/ClientProviders'
import FirebaseAuthProvider from '@/components/FirebaseAuthProvider'
import SubscriptionProvider from '@/components/SubscriptionProvider'
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '3003 SaaS',
  description: 'Chat with anyone!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <body className={`${inter.className}`}>
          <FirebaseAuthProvider>
            <SubscriptionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {/* Header */}
                <Header/>


                {/* Content */}
                {children}

                {/* Toaster */}
                <Toaster/>
                
              </ThemeProvider>
            </SubscriptionProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProviders>
  )
}
