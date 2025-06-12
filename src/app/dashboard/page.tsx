"use client"



export default function DashboardPage() {

    return (
        <div className="min-h-screen bg-gray-50">
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
