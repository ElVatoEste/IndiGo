"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
    const { user, loading, logout, needsProfileCompletion } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/login")
            } else if (needsProfileCompletion) {
                router.push("/complete-profile")
            } else if (user.profile?.userType === "profesional") {
                router.push("/dashboard/profesional")
            }
        }
    }, [user, loading, needsProfileCompletion, router])

    if (loading) {
        return (
            <div className="min-h-screen bg-indigo-primary flex items-center justify-center">
                <div className="text-indigo-text text-xl">Cargando...</div>
            </div>
        )
    }

    if (!user || needsProfileCompletion) {
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
                            <span className="text-indigo-primary font-bold text-xl">IndiGO</span>
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
                        <h1 className="text-2xl font-bold text-indigo-primary mb-4">Dashboard de Estudiante</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-indigo-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-indigo-primary mb-2">Servicios de Limpieza</h3>
                                <p className="text-gray-600">Encuentra profesionales de limpieza verificados</p>
                            </div>
                            <div className="bg-indigo-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-indigo-primary mb-2">Asesorías</h3>
                                <p className="text-gray-600">Recibe consejos de expertos</p>
                            </div>
                            <div className="bg-indigo-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-indigo-primary mb-2">Finanzas</h3>
                                <p className="text-gray-600">Controla tus gastos en córdobas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
