"use client"
import { useState } from "react"
import { OfertaConPerfil } from "@/hooks/useOfertasConPerfil"
import { useOfertasConPerfil } from "@/hooks/useOfertasConPerfil"
import { MapPin, Calendar, User, Mail, Phone } from "lucide-react"

interface SolicitudConOfertasCardProps {
  id: string
  userDisplayName: string
  userEmail: string
  telefono?: string
  tiposServicio: string[]
  descripcion: string
  ubicacion: string
  fecha: string
  estado: string
  onAceptarOferta: (solicitudId: string, oferta: OfertaConPerfil, metodoPago: "efectivo" | "linea") => void
}

export default function SolicitudConOfertasCard({
  id,
  userDisplayName,
  userEmail,
  telefono,
  tiposServicio,
  descripcion,
  ubicacion,
  fecha,
  estado,
  onAceptarOferta,
}: SolicitudConOfertasCardProps) {
  const { ofertas, loading } = useOfertasConPerfil(id)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const nextOferta = () => {
    setCurrentIndex((prev) => (prev + 1) % ofertas.length)
  }

  const prevOferta = () => {
    setCurrentIndex((prev) => (prev - 1 + ofertas.length) % ofertas.length)
  }

  const estadoColor: Record<string, string> = {
    activo: "text-blue-800 bg-blue-100",
    pendiente: "text-yellow-800 bg-yellow-100",
    cancelado: "text-red-800 bg-red-100",
    finalizado: "text-green-800 bg-green-100",
  }

  const color = estadoColor[estado] || "text-gray-800 bg-gray-100"

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Columna de detalles */}
        <div className="p-6 border-r border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <User className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{userDisplayName}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate max-w-[150px]">{userEmail}</span>
                  {telefono && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="truncate max-w-[150px]">{telefono}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${color} flex-shrink-0`}>
              {estado.charAt(0).toUpperCase() + estado.slice(1)}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-sm font-medium text-gray-500 block mb-2">Servicios solicitados:</span>
              <div className="flex flex-wrap gap-2">
                {tiposServicio.map((tipo, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium capitalize"
                  >
                    {tipo.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-500 block mb-2">Descripción:</span>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{descripcion}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-5 w-5" />
              <span>{ubicacion}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-5 w-5" />
              <span>Fecha solicitada: {new Date(fecha).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Columna de ofertas */}
        <div className="p-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ofertas recibidas</h3>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
              <p className="ml-3 text-gray-700">Cargando ofertas...</p>
            </div>
          ) : ofertas.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg">
              <div className="text-gray-400 text-4xl mb-2">📭</div>
              <p className="text-gray-500">No hay ofertas para esta solicitud aún.</p>
            </div>
          ) : (
            <div className="relative">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="border rounded-lg p-5 bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="font-semibold text-lg text-gray-900">
                          {ofertas[currentIndex].profesionalNombre}
                        </div>
                        {ofertas[currentIndex].promedioCalificacion !== undefined && (
                          <div className="flex items-center text-yellow-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-sm font-medium">
                              {ofertas[currentIndex].promedioCalificacion.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {ofertas[currentIndex].edad ?? "N/A"} años
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {ofertas[currentIndex].genero ?? "N/A"}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {ofertas[currentIndex].trabajosRealizados ?? 0} trabajos
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {ofertas[currentIndex].telefono ?? "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600">C${ofertas[currentIndex].precio}</div>
                      <div className="text-xs text-gray-500">Precio total</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500 block mb-2">Mensaje del profesional:</span>
                    <p className="text-gray-700">{ofertas[currentIndex].mensaje || <span className="italic text-gray-400">Sin mensaje</span>}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      Oferta enviada: {(() => {
                        const date = ofertas[currentIndex].createdAt?.toDate();
                        return date ? new Date(date).toLocaleString() : "";
                      })()}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors"
                        onClick={() => {/* lógica para ocultar de la lista o eliminar del backend */}}
                      >
                        Rechazar
                      </button>
                      <button
                        className="bg-yellow-50 text-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-100 text-sm font-medium transition-colors"
                        onClick={() => onAceptarOferta(id, ofertas[currentIndex], "efectivo")}
                      >
                        Pagar en efectivo
                      </button>
                      <button
                        className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 text-sm font-medium transition-colors"
                        onClick={() => onAceptarOferta(id, ofertas[currentIndex], "linea")}
                      >
                        Pagar en línea
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {ofertas.length > 1 && (
                <>
                  <button
                    onClick={prevOferta}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextOferta}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="flex justify-center gap-2 mt-4">
                    {ofertas.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentIndex ? "bg-indigo-600" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 