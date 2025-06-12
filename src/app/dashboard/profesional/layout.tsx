"use client"

import { useAuth } from "@/contexts/AuthContext"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProfesionalLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout } = useAuth()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (loading) return

        if (!user) {
            router.push("/login")
        } else if (user.profile?.userType !== "profesional") {
            router.push("/dashboard")
        }
    }, [user, loading, router])

    if (loading || !user || user.profile?.userType !== "profesional") {
        return null // Mientras redirige o carga, no muestra nada
    }

    const showNavbar = pathname === "/dashboard/profesional"

    return (
        <div className="min-h-screen bg-gray-50">
            {showNavbar && (
                <nav className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-indigo-secondary rounded-lg flex items-center justify-center">
                                    <span className="text-indigo-text font-bold text-sm">I</span>
                                </div>
                                <span className="text-indigo-primary font-bold text-xl">IndiGO Pro</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Hola, {user.profile?.displayName}</span>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            )}

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
    )
}
