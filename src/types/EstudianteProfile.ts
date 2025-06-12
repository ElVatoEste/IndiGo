import {BaseUserProfile} from "@/types/BaseUserProfile";
import {Timestamp} from "firebase/firestore";

export interface EstudianteProfile extends BaseUserProfile {
    userType: "estudiante"
    plan: "gratuito" | "premium"
    planSince: Timestamp
    paymentMethods?: {
        metodo: "efectivo" | "tarjeta" | "transferencia"
        detalles?: string
    }[]
    descuentosActivos?: boolean
}