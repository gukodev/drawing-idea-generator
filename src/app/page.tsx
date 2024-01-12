import ModesHandler from '@/components/ModesHandler'
import NavBar from '@/components/Navbar'
import { AudioContextProvider } from '@/contexts/AudioContext'
import { GeneratingModeProvider } from '@/contexts/GeneratingModeContext'

export default function Home() {
    return (
        <GeneratingModeProvider>
            <AudioContextProvider>
                <div className='w-full max-w-screen-lg px-4 mx-auto'>
                    <NavBar />
                    <ModesHandler />
                </div>
            </AudioContextProvider>
        </GeneratingModeProvider>
    )
}
