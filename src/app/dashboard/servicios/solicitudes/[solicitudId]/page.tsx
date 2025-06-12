"use client"
import { useState } from "react"
import PostulacionesModal from "@/components/requests/PostulacionesModal"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "@/firebase/clientApp"

export default function MisSolicitudesPage() {
  // ... tu hook para solicitudes
  const [modalOpen, setModalOpen] = useState(false)
  const [solicitudId, setSolicitudId] = useState<string | null>(null)

  const handleVerPostulaciones = (id: string) => {
    setSolicitudId(id)
    setModalOpen(true)
  }

  // Lógica para aceptar oferta:
  const handleAceptarOferta = async (ofertaId: string, profesionalId: string, nombreProfesional: string) => {
    if (!solicitudId) return
    // Actualizar la solicitud: cambia estado y guarda el profesional
    await updateDoc(doc(db, "service_requests", solicitudId), {
      estado: "pendiente",
      profesionalId,
      profesionalNombre: nombreProfesional,
    })
    setModalOpen(false)
    setSolicitudId(null)
    // (opcional: notificar al usuario, refrescar lista, etc.)
  }

  // ...
  // En el render, por cada tarjeta de solicitud:
  // <SolicitudServicioCard ... onVerPostulaciones={() => handleVerPostulaciones(solicitud.id)} />

  // Modal global:
  <PostulacionesModal
    open={modalOpen}
    onClose={() => setModalOpen(false)}
    solicitudId={solicitudId || ""}
    onAceptar={handleAceptarOferta}
  />
}
