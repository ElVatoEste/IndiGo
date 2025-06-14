import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/firebase/clientApp" // tu path real

export async function crearSolicitudServicio({
  user,
  tiposServicio,
  descripcion,
  ubicacion,
  fecha,
}: {
  user: { uid: string, displayName: string, email: string, telefono?: string }
  tiposServicio: string[]
  descripcion: string
  ubicacion: string
  fecha: string
}) {
  return await addDoc(collection(db, "service_requests"), {
    userId: user.uid,
    userDisplayName: user.displayName,
    userEmail: user.email,
    telefono: user.telefono,
    tiposServicio,
    descripcion,
    ubicacion,
    fecha,
    estado: "activo",
    createdAt: serverTimestamp(),
  })
}
