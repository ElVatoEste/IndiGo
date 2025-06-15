"use client"

import { useAuth } from "@/contexts/AuthContext"
import { usePendientesProfesional } from "@/hooks/usePendientesProfesional"
import { useState } from "react"
import { MapPin, Calendar, User, Mail, Phone, CreditCard } from "lucide-react"

export default function ProfesionalDashboardPage() {
    const { user } = useAuth()
    const { pendientes, loading } = usePendientesProfesional(user?.uid || "")
    const [showDetails, setShowDetails] = useState<string | null>(null)

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h1 className="text-2xl font-bold text-indigo-600 mb-4">Dashboard de Profesional</h1>
                        

                        {/* Solicitudes pendientes */}
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Servicios Pendientes</h2>
                            {loading ? (
                                <div className="flex items-center justify-center py-8 bg-white rounded-xl shadow-sm">
                                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
                                    <p className="ml-3 text-gray-700">Cargando solicitudes...</p>
                                </div>
                            ) : pendientes.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
                                    <div className="text-gray-400 text-4xl mb-2">📭</div>
                                    <p className="text-gray-500">No tienes servicios pendientes en este momento.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {pendientes.map((solicitud) => (
                                        <div 
                                            key={solicitud.id} 
                                            className="bg-white shadow-md rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-shadow"
                                        >
                                            <div className="flex justify-between items-center cursor-pointer" 
                                                onClick={() => setShowDetails(showDetails === solicitud.id ? null : solicitud.id)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-indigo-100 p-2 rounded-full">
                                                        <User className="h-5 w-5 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800">
                                                            {solicitud.userDisplayName}
                                                        </h3>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <Mail className="h-4 w-4 mr-1" />
                                                            <span className="truncate max-w-[150px]" title={solicitud.userEmail}>
                                                                {solicitud.userEmail}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                                        Pendiente
                                                    </span>
                                                    <svg 
                                                        className={`w-5 h-5 text-gray-500 transition-transform ${showDetails === solicitud.id ? 'transform rotate-180' : ''}`} 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            
                                            {showDetails === solicitud.id && (
                                                <div className="mt-4 pt-4 border-t border-gray-100">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-500 mb-1">Servicios:</h4>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {solicitud.tiposServicio.map((tipo, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-medium capitalize"
                                                                    >
                                                                        {tipo.replace("-", " ")}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        
                                                        {solicitud.metodoPago && (
                                                            <div>
                                                                <h4 className="text-sm font-medium text-gray-500 mb-1">Método de pago:</h4>
                                                                <div className="flex items-center gap-1.5">
                                                                    <CreditCard className="w-4 h-4 text-gray-400" />
                                                                    <span className="text-sm capitalize text-gray-700">
                                                                        {solicitud.metodoPago === "efectivo" ? "Efectivo" : "Pago en línea"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="mb-4">
                                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Descripción:</h4>
                                                        <p 
                                                            className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 line-clamp-3 overflow-hidden cursor-pointer" 
                                                            title={solicitud.descripcion}
                                                        >
                                                            {solicitud.descripcion}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="w-4 h-4 text-gray-400" />
                                                            <span 
                                                                className="truncate max-w-[150px]" 
                                                                title={solicitud.ubicacion}
                                                            >
                                                                {solicitud.ubicacion}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar className="w-4 h-4 text-gray-400" />
                                                            <span>
                                                                {new Date(solicitud.fecha).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        {solicitud.telefono && (
                                                            <div className="flex items-center gap-1.5">
                                                                <Phone className="w-4 h-4 text-gray-400" />
                                                                <span 
                                                                    className="truncate max-w-[150px]" 
                                                                    title={solicitud.telefono}
                                                                >
                                                                    {solicitud.telefono}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* <div className="mt-4 flex gap-2">
                                                        <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-200 transition">
                                                            Completar servicio
                                                        </button>
                                                        <button className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-200 transition">
                                                            Cancelar
                                                        </button>
                                                    </div> */}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
