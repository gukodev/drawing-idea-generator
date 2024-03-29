import ModesHandler from '@/components/ModesHandler'
import NavBar from '@/components/Navbar'
import { AudioContextProvider } from '@/contexts/AudioContext'
import { GeneratingModeProvider } from '@/contexts/GeneratingModeContext'
import { Toaster } from 'react-hot-toast'

export default function Home() {
    return (
        <GeneratingModeProvider>
            <AudioContextProvider>
                <div className='w-full max-w-screen-lg px-4 mx-auto'>
                    <NavBar />
                    <ModesHandler />
                </div>
                <Toaster
                    toastOptions={{
                        className: '!bg-white !border-2 !border-slate-300 !shadow-none',
                    }}
                />
            </AudioContextProvider>
        </GeneratingModeProvider>
    )
}
