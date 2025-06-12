"use client"

import { useRouter } from "next/navigation"
import { Home } from "lucide-react"
import Image from "next/image"

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-indigo-primary flex flex-col items-center justify-center text-center px-4 py-12">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-2 mb-8">
                <Image
                    src="/logos/logocompletopng.png"
                    alt="Logo IndiGo"
                    width={300}
                    height={300}
                />
            </div>

            <div className="mb-8">
                <h1 className="text-7xl sm:text-9xl font-extrabold text-indigo-text leading-none">404</h1>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-text mb-4">Página no encontrada</h2>
            <p className="text-lg sm:text-xl text-indigo-text/80 max-w-md mb-8">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>
            <button
                onClick={() => router.back()}
                className="inline-flex items-center bg-indigo-secondary hover:bg-indigo-secondary/90 text-white px-6 py-3 rounded-md text-base font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
                <Home className="h-5 w-5 mr-2" />
                Volver a la anterior
            </button>
        </div>
    )
}
