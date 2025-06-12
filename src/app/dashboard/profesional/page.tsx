"use client"

import Link from "next/link"

export default function ProfesionalDashboardPage() {

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h1 className="text-2xl font-bold text-indigo-primary mb-4">Dashboard de Profesional de Limpieza</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Link href="/dashboard/profesional/solicitudes" className="block">
                                <div className="bg-green-50 p-6 rounded-lg hover:bg-green-100 cursor-pointer transition">
                                    <h3 className="font-semibold text-green-700 mb-2">Solicitudes Pendientes</h3>
                                    <p className="text-gray-600">Revisa las nuevas solicitudes de servicio</p>
                                </div>
                            </Link>
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
