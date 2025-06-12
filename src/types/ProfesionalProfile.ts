import {BaseUserProfile} from "@/types/BaseUserProfile";

export interface ProfesionalProfile extends BaseUserProfile {
    userType: "profesional"
    calificacionPromedio: number
    trabajosRealizados: number
    tiposServicio: string[]
    aceptaMaterialesPropios: boolean
    aceptaTransporte: boolean
    descripcionProfesional: string
}