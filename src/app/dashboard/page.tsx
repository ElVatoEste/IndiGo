"use client"
import { useAuth } from "@/contexts/AuthContext"
import { usePendientesSolicitudes } from "@/hooks/usePendientesSolicitudes"
import SolicitudPendienteCard from "@/components/requests/SolicitudPendienteCard" // asumiendo que lo creaste
import { useEffect } from "react"

export default function DashboardPage() {
    const { user } = useAuth()
    const { pendientes, loading } = usePendientesSolicitudes(user?.uid || "")

    useEffect(() => {
        console.log(pendientes) })
    // Función para refrescar: por ser onSnapshot, refresca solo
    const refrescar = () => {}

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h1 className="text-2xl font-bold text-indigo-primary mb-4">Dashboard de Estudiante</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* ... tus cards fijas ... */}
                        </div>
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4 text-indigo-primary">Servicios pendientes</h2>
                            {loading ? (
                                <div className="text-gray-600">Cargando...</div>
                            ) : pendientes.length === 0 ? (
                                <div className="text-gray-400">No tienes servicios pendientes.</div>
                            ) : (
                                pendientes.map((sol) => (
                                    <SolicitudPendienteCard
                                        key={sol.id}
                                        solicitud={sol}
                                        onActualizar={refrescar}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
