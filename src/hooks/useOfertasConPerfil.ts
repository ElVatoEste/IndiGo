import { useEffect, useState } from "react"
import { collection, onSnapshot, getDoc, doc, Timestamp } from "firebase/firestore"
import { db } from "@/firebase/clientApp"

export interface OfertaConPerfil {
  id: string
  profesionalId: string
  profesionalNombre: string
  precio: number
  mensaje: string
  createdAt: Timestamp
  edad?: number
  genero?: string
  trabajosRealizados?: number
  promedioCalificacion?: number
}

export function useOfertasConPerfil(solicitudId: string) {
  const [ofertas, setOfertas] = useState<OfertaConPerfil[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!solicitudId) return

    // Usar collection en lugar de collectionGroup para obtener solo las ofertas de esta solicitud
    const ofertasRef = collection(db, "service_requests", solicitudId, "ofertas")
    
    const unsub = onSnapshot(ofertasRef, async (snap) => {
      const arr: OfertaConPerfil[] = []

      // Trae las ofertas y los perfiles de profesional
      for (const docu of snap.docs) {
        const data = docu.data()
        let perfil = {}
        if (data.profesionalId) {
          const perfilSnap = await getDoc(doc(db, "users", data.profesionalId))
          if (perfilSnap.exists()) {
            const d = perfilSnap.data()
            perfil = {
              edad: d.edad,
              genero: d.genero,
              trabajosRealizados: d.trabajosRealizados,
              promedioCalificacion: d.calificacionPromedio,
            }
          }
        }
        arr.push({
          id: docu.id,
          profesionalId: data.profesionalId,
          profesionalNombre: data.nombreProfesional,
          precio: data.precio,
          mensaje: data.mensaje,
          createdAt: data.createdAt,
          ...perfil,
        })
      }

      setOfertas(arr)
      setLoading(false)
    })
    return () => unsub()
  }, [solicitudId])

  return { ofertas, loading }
}
