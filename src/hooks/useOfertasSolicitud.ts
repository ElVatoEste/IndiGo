import { useState, useEffect } from "react"
import { collection, query, where, onSnapshot, collectionGroup } from "firebase/firestore"
import { db } from "@/firebase/clientApp"
import { AuthUser } from "@/types/AuthUser"
import { Timestamp } from "firebase/firestore"

interface SolicitudServicio {
  id: string
  userId: string
  userDisplayName: string
  userEmail: string
  tiposServicio: string[]
  descripcion: string
  ubicacion: string
  fecha: string
  estado: "activo" | "pendiente" | "cancelado" | "finalizado"
  createdAt?: any
  profesionalId?: string
  profesionalNombre?: string
  profesionalCalificacion?: number
}

interface Oferta {
  id: string
  profesionalId: string
  nombreProfesional: string
  precio: number
  mensaje: string
  createdAt: Timestamp
  calificacionPromedio: number | null
}

export function useOfertasSolicitudes(tiposServicio: string[], user: AuthUser | null) {
  const [solicitudesData, setSolicitudesData] = useState<SolicitudServicio[]>([])
  const [ofertasEnviadas, setOfertasEnviadas] = useState<string[]>([])
  const [solicitudes, setSolicitudes] = useState<SolicitudServicio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!tiposServicio.length || !user) {
      setSolicitudes([])
      setSolicitudesData([])
      setOfertasEnviadas([])
      setLoading(false)
      return
    }

    const qSolicitudes = query(
      collection(db, "service_requests"),
      where("estado", "==", "activo")
    )
    const qOfertas = query(
      collectionGroup(db, "ofertas"),
      where("profesionalId", "==", user.uid)
    )

    const unsubscribeSolicitudes = onSnapshot(qSolicitudes, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as SolicitudServicio[]
      // Solo filtra por tipos aquí, no por ofertas
      const filtradas = data.filter((solicitud) =>
        solicitud.tiposServicio.some((tipo) => tiposServicio.includes(tipo))
      )
      setSolicitudesData(filtradas)
    })

    const unsubscribeOfertas = onSnapshot(qOfertas, (snapshot) => {
      const ofertas = snapshot.docs.map(doc => doc.ref.parent.parent?.id).filter(Boolean) as string[]
      setOfertasEnviadas(ofertas)
    })

    setLoading(true)
    return () => {
      unsubscribeSolicitudes()
      unsubscribeOfertas()
    }
  }, [tiposServicio, user])

  useEffect(() => {
    // Filtra solicitudes que NO tienen oferta enviada
    setSolicitudes(
      solicitudesData.filter(sol => !ofertasEnviadas.includes(sol.id))
    )
    setLoading(false)
  }, [solicitudesData, ofertasEnviadas])

  return { solicitudes, loading }
}

export function useOfertasSolicitud(solicitudId: string) {
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!solicitudId) {
      setOfertas([])
      setLoading(false)
      return
    }

    const q = query(collection(db, "service_requests", solicitudId, "ofertas"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Oferta[]
      setOfertas(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [solicitudId])

  return { ofertas, loading }
}
