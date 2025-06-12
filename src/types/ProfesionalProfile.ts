import {BaseUserProfile} from "@/types/BaseUserProfile";
import {Timestamp} from "firebase/firestore";

export interface ProfesionalProfile extends BaseUserProfile {
    userType: "profesional"
    calificacionPromedio: number
    trabajosRealizados: number
    fechaIngreso: Date
    tiposServicio: string[]
    aceptaMaterialesPropios: boolean
    aceptaTransporte: boolean
    descripcionProfesional: string
}