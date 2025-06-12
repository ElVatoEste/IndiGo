import type { Timestamp } from "firebase/firestore"
import {EstudianteProfile} from "@/types/EstudianteProfile";
import {ProfesionalProfile} from "@/types/ProfesionalProfile";

export type UserType = "estudiante" | "profesional"

export interface BaseUserProfile {
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

export type UserProfile = EstudianteProfile | ProfesionalProfile
