"use client"
import React from "react"
import { MapPin, Calendar, User, Mail } from "lucide-react"
import Link from "next/link"

interface SolicitudServicioCardProps {
  id: string
  userDisplayName: string
  userEmail: string
  tiposServicio: string[]
  descripcion: string
  ubicacion: string
  fecha: string
  estado: string
  onVerPostulaciones?: () => void
  children?: React.ReactNode
}

export default function SolicitudServicioCard({
  id,
  userDisplayName,
  userEmail,
  tiposServicio,
  descripcion,
  ubicacion,
  fecha,
  estado,
  onVerPostulaciones,
  children,
}: SolicitudServicioCardProps) {
  const estadoColor: Record<string, string> = {
    activo: "text-blue-800 bg-blue-100",
    pendiente: "text-yellow-800 bg-yellow-100",
    cancelado: "text-red-800 bg-red-100",
    finalizado: "text-green-800 bg-green-100",
  }

  const color = estadoColor[estado] || "text-gray-800 bg-gray-100"

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 flex flex-col h-full">
      {/* Header con estado */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 p-2 rounded-full">
            <User className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{userDisplayName}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Mail className="h-4 w-4 mr-1" />
              {userEmail}
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
          {estado.charAt(0).toUpperCase() + estado.slice(1)}
        </span>
      </div>

      <div className="space-y-4 flex-grow">
        {/* Servicios */}
        <div>
          <span className="text-sm font-medium text-gray-500 block mb-2">Servicios solicitados:</span>
          <div className="flex flex-wrap gap-2">
            {tiposServicio.map((tipo, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium capitalize"
              >
                {tipo.replace("-", " ").charAt(0).toUpperCase() + tipo.replace("-", " ").slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Descripción */}
        {descripcion && (
          <div className="bg-gray-50 rounded-lg p-4 group relative">
            <span className="text-sm font-medium text-gray-500 block mb-1">Descripción:</span>
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{descripcion}</p>
            {descripcion.length > 150 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <p className="text-white text-sm p-4">{descripcion}</p>
              </div>
            )}
          </div>
        )}

        {/* Ubicación y Fecha */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 group relative">
              <span className="font-medium text-gray-500 block">Ubicación</span>
              <p className="text-gray-700 truncate">{ubicacion}</p>
              {ubicacion.length > 30 && (
                <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block">
                  <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    {ubicacion}
                  </div>
                  <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute -bottom-1 left-4"></div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Calendar className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-500 block">Fecha</span>
              <p className="text-gray-700">{new Date(fecha).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="mt-6 space-y-3">
        {/* Botón de postulaciones, solo si se pasa la prop */}
        {onVerPostulaciones && (
          <Link 
            href={`/dashboard/servicios/solicitudes/${id}`}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <span>Ver postulaciones</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}

        {/* Botones de acción que vengan como children */}
        {children && (
          <div className="flex gap-3">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
