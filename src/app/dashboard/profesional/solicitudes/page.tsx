// app/dashboard/profesional/solicitudes/page.tsx

"use client"

import React from "react"
import { useSolicitudesPendientes } from "@/hooks/useSolicitudesPendientes"
import SolicitudCard from "@/components/home/SolicitudCard"

export default function SolicitudesPendientesPage() {
  const { solicitudes, loading } = useSolicitudesPendientes()

  const handleAccept = (id: string) => {
    // Acá luego vamos a conectar Firestore
    console.log("Aceptar:", id)
  }

  const handleReject = (id: string) => {
    // Acá luego vamos a conectar Firestore
    console.log("Rechazar:", id)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-indigo-primary mb-6">
        Solicitudes Pendientes
      </h1>

      {loading ? (
        <p className="text-gray-600">Cargando solicitudes...</p>
      ) : solicitudes.length === 0 ? (
        <p className="text-gray-600">No hay solicitudes pendientes.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solicitudes.map((solicitud) => (
            <SolicitudCard
              key={solicitud.id}
              cliente={solicitud.cliente}
              tipo={solicitud.tipo}
              fecha={solicitud.fecha}
              precio={solicitud.precio}
              onAccept={() => handleAccept(solicitud.id)}
              onReject={() => handleReject(solicitud.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
