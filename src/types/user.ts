import type { Timestamp } from "firebase/firestore"

export type UserType = "estudiante" | "profesional"

export interface UserProfile {
    uid: string
    email: string
    displayName: string
    cedula: string
    telefono: string
    direccion: string
    nacionalidad: string
    edad: number
    genero: "masculino" | "femenino" | "otro"
    userType: UserType
    createdAt: Timestamp
    updatedAt: Timestamp
}

export interface AuthUser {
    uid: string
    email: string | null
    displayName: string | null
    profile?: UserProfile
}
