import NavBar from '@/components/Navbar'
import { GeneratingModeProvider } from '@/contexts/GeneratingModeContext'

export default function Home() {
    return (
        <main className='w-full max-w-screen-lg px-4 mx-auto'>
            <GeneratingModeProvider>
                <NavBar />
            </GeneratingModeProvider>
        </main>
    )
}
