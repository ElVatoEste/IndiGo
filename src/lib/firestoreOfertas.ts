import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/firebase/clientApp"

export async function crearOfertaSolicitud({
  solicitudId,
  profesional,
  precio,
  mensaje
}: {
  solicitudId: string
  profesional: { uid: string; nombre: string }
  precio: number
  mensaje: string
}) {
  return await addDoc(
    collection(db, "service_requests", solicitudId, "ofertas"),
    {
      profesionalId: profesional.uid,
      nombreProfesional: profesional.nombre,
      precio,
      mensaje,
      createdAt: serverTimestamp(),
    }
  )
}
