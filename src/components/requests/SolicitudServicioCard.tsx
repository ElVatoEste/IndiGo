"use client"
import type React from "react"
import { MapPin, Calendar, User, Mail } from "lucide-react"

interface SolicitudServicioCardProps {
  userDisplayName: string
  userEmail: string
  telefono?: string
  tiposServicio: string[]
  descripcion: string
  ubicacion: string
  fecha: string
  estado: string
  children?: React.ReactNode
  onVerPostulaciones?: () => void
}

export default function SolicitudServicioCard({
                                                userDisplayName,
                                                userEmail,
                                                telefono,
                                                tiposServicio,
                                                descripcion,
                                                ubicacion,
                                                fecha,
                                                estado,
                                                children,
                                                onVerPostulaciones,
                                              }: SolicitudServicioCardProps) {
  const color = estado === "activa" ? "bg-green-100 text-green-800" :
    estado === "pendiente" ? "bg-yellow-100 text-yellow-800" :
    "bg-gray-100 text-gray-800"

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 flex flex-col h-[500px]">
      {/* Header con estado - fixed height */}
      <div className="flex justify-between items-start h-[80px]">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 p-2 rounded-full">
            <User className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{userDisplayName}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Mail className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate max-w-[150px]">{userEmail}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="truncate max-w-[150px]">{telefono ?? "N/A"}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${color} flex-shrink-0`}>
          {estado.charAt(0).toUpperCase() + estado.slice(1)}
        </span>
      </div>

      {/* Content area with fixed heights for each section */}
      <div className="flex flex-col h-[320px]">
        {/* Servicios - fixed height */}
        <div className="h-[120px] py-4 mb-6">
          <span className="text-sm font-medium text-gray-500 block mb-2">Servicios solicitados:</span>
          <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[100px]">
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

        {/* Descripción - fixed height */}
        <div className="h-[100px] bg-gray-50 rounded-lg p-4 group relative">
          <span className="text-sm font-medium text-gray-500 block mb-1">Descripción:</span>
          <div className="h-[40px] overflow-hidden relative">
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">{descripcion}</p>
            {descripcion.length > 150 && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 opacity-0 group-hover:opacity-0"></div>
            )}
          </div>
          {descripcion.length > 150 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <p className="text-white text-sm p-4 max-h-[80px] overflow-y-auto">{descripcion}</p>
            </div>
          )}
        </div>

        {/* Ubicación y Fecha - fixed height */}
        <div className="grid grid-cols-2 gap-4 text-sm h-[110px] py-4">
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 group relative">
              <span className="font-medium text-gray-500 block">Ubicación</span>
              <p className="text-gray-700 truncate max-w-[120px]">{ubicacion}</p>
              {ubicacion.length > 20 && (
                <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">{ubicacion}</div>
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

      {/* Botones de acción - fixed height */}
      <div className="mt-auto h-[80px] pt-4 flex flex-col justify-end">
        {/* Botón de postulaciones, solo si se pasa la prop */}
        {onVerPostulaciones && (
          <button
            onClick={onVerPostulaciones}
            className="w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors mb-2"
          >
            Ver postulaciones
          </button>
        )}
        {/* Botones de acción que vengan como children */}
        {children && <div className="flex gap-3">{children}</div>}
      </div>
    </div>
  )
}
