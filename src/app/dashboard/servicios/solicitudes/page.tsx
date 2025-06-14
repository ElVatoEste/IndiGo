"use client"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useSolicitudesActivas } from "@/hooks/useSolicitudesActivas"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "@/firebase/clientApp"
import SolicitudConOfertasCard from "@/components/requests/SolicitudConOfertasCard"
import SolicitarServicioModal from "@/components/requests/SolicitarServicioModal"
import { crearSolicitudServicio } from "@/lib/firestoreSolicitudes"
import { OfertaConPerfil } from "@/hooks/useOfertasConPerfil"

interface SolicitudData {
  tiposServicio: string[]
  descripcion: string
  ubicacion: string
  fecha: string
}

export default function SolicitudesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const { user } = useAuth()
  const { solicitudes, loading } = useSolicitudesActivas(user?.uid)

  const handleSolicitar = async (data: SolicitudData) => {
    if (!user) return
    await crearSolicitudServicio({
      user: {
        uid: user.uid,
        displayName: user.displayName || user.email || "Usuario",
        email: user.email || "",
        telefono: user.profile?.telefono,
      },
      ...data,
    })
    setModalOpen(false)
  }

  const handleAceptarOferta = async (
    solicitudId: string,
    oferta: OfertaConPerfil,
    metodoPago: "efectivo" | "linea"
  ) => {
    await updateDoc(doc(db, "service_requests", solicitudId), {
      estado: "pendiente",
      profesionalId: oferta.profesionalId,
      profesionalNombre: oferta.profesionalNombre,
      metodoPago,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header con botón */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Mis Solicitudes
            </h1>
            <p className="text-gray-600">
              Gestiona tus solicitudes de servicio y ofertas recibidas
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md text-lg font-medium flex items-center gap-2 transition-all duration-200 hover:shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Solicitar servicio
          </button>
        </div>

        {/* Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="flex items-center justify-center py-12 bg-white rounded-xl shadow-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
              <p className="ml-3 text-gray-700">Cargando solicitudes...</p>
            </div>
          ) : solicitudes.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <div className="text-gray-500 text-7xl mb-6">📝</div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                No tienes solicitudes activas
              </h3>
              <p className="text-gray-700 mb-8 max-w-md mx-auto">
                Solicita un nuevo servicio para comenzar a recibir ofertas de profesionales
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
              >
                Crear nueva solicitud
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {solicitudes.map((solicitud) => (
                <SolicitudConOfertasCard
                  key={solicitud.id}
                  id={solicitud.id}
                  userDisplayName={solicitud.userDisplayName}
                  userEmail={solicitud.userEmail}
                  telefono={solicitud.telefono}
                  tiposServicio={solicitud.tiposServicio || []}
                  descripcion={solicitud.descripcion || ""}
                  estado={solicitud.estado}
                  fecha={solicitud.fecha}
                  ubicacion={solicitud.ubicacion}
                  onAceptarOferta={handleAceptarOferta}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <SolicitarServicioModal
        open={modalOpen}
        onCloseAction={() => setModalOpen(false)}
        onSubmitAction={handleSolicitar}
      />
    </div>
  )
} 