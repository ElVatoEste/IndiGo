"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProfesionalDashboardPage() {
    const { user, loading, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
    }, [user, loading, router])

    useEffect(() => {
        if (user?.profile?.userType !== "profesional") {
            router.push("/dashboard")
        }
    }, [user, router])

    if (loading) {
        return (
            <div className="min-h-screen bg-indigo-primary flex items-center justify-center">
                <div className="text-indigo-text text-xl">Cargando...</div>
            </div>
        )
    }

    if (!user || user.profile?.userType !== "profesional") {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
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

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h1 className="text-2xl font-bold text-indigo-primary mb-4">Dashboard de Profesional de Limpieza</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-green-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-green-700 mb-2">Solicitudes Pendientes</h3>
                                <p className="text-gray-600">Revisa las nuevas solicitudes de servicio</p>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-blue-700 mb-2">Servicios Activos</h3>
                                <p className="text-gray-600">Gestiona tus servicios en curso</p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-purple-700 mb-2">Ganancias</h3>
                                <p className="text-gray-600">Revisa tus ingresos en córdobas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
