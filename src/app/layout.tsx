import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

const font = Rubik({ subsets: ['latin'], variable: '--rubik' })

export const metadata: Metadata = {
    title: '🎨 drawing idea generator',
    description: "want to draw something? don't know what? this is the place for you! 👩‍🎨",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={twMerge(font.variable, 'font-sans bg-slate-100 text-slate-800')}>
                {children}
            </body>
        </html>
    )
}
