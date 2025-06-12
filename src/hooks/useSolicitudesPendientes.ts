import { useEffect, useState } from "react"
import { getDocs, collection, query, where } from "firebase/firestore"
import { db } from "@/firebase/clientApp"

export interface Solicitud {
  id: string
  cliente: string
  tipo: string
  fecha: string
  precio: number
}

export function useSolicitudesPendientes() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchSolicitudes() {
      try {
        console.log("Iniciando fetch de solicitudes...")
        setLoading(true)
        setError(null)

        const q = query(
          collection(db, "service_requests"),
          where("status", "==", "pending"),
          where("professionalId", "==", null)
        )
        
        console.log("Ejecutando consulta...")
        const querySnapshot = await getDocs(q)
        console.log("Consulta completada, documentos:", querySnapshot.size)
        
        if (!isMounted) return

        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Solicitud[]
        
        console.log("Datos procesados:", data)
        setSolicitudes(data)
      } catch (error) {
        console.error("Error al cargar solicitudes:", error)
        if (isMounted) {
          setError("Error al cargar las solicitudes")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchSolicitudes()

    return () => {
      isMounted = false
    }
  }, [])

  return { solicitudes, loading, error }
}
