
interface Service {
    id: string
    name: string
    description: string
    duration: string
    rating: number
    location: string
    image: string
    category: "asesoria-virtual" | "limpieza-profunda" | "mantenimiento" | "lavanderia"
    subcategory?: "finanzas" | "cocina" | "tramites"
    isVirtual?: boolean
    features: string[]
    professionalCount?: number
}

export const services: Service[] = [
    // Asesorías Virtuales - Finanzas
    {
        id: "1",
        name: "Asesoría Financiera Personal",
        description: "Consulta personalizada para manejo de finanzas en córdobas, presupuestos y ahorro.",
        duration: "1-2 horas",
        rating: 4.8,
        location: "Virtual",
        image: "/placeholder.svg?height=200&width=300",
        category: "asesoria-virtual",
        subcategory: "finanzas",
        isVirtual: true,
        features: ["Análisis de gastos", "Plan de ahorro", "Presupuesto mensual", "Consejos de inversión"],
        professionalCount: 12,
    },
    {
        id: "2",
        name: "Planificación Financiera para Estudiantes",
        description: "Aprende a manejar tu dinero como estudiante universitario en Nicaragua.",
        duration: "1 hora",
        rating: 4.7,
        location: "Virtual",
        image: "/placeholder.svg?height=200&width=300",
        category: "asesoria-virtual",
        subcategory: "finanzas",
        isVirtual: true,
        features: ["Presupuesto estudiantil", "Becas y financiamiento", "Gastos universitarios", "Ahorro básico"],
        professionalCount: 8,
    },

    // Asesorías Virtuales - Cocina
    {
        id: "3",
        name: "Clases de Cocina Nicaragüense",
        description: "Aprende a cocinar platos tradicionales nicaragüenses desde tu casa.",
        duration: "2-3 horas",
        rating: 4.9,
        location: "Virtual",
        image: "/placeholder.svg?height=200&width=300",
        category: "asesoria-virtual",
        subcategory: "cocina",
        isVirtual: true,
        features: ["Gallo pinto perfecto", "Nacatamales caseros", "Quesillo tradicional", "Lista de ingredientes"],
        professionalCount: 6,
    },
    {
        id: "4",
        name: "Cocina Rápida para Estudiantes",
        description: "Recetas fáciles, económicas y nutritivas para tu vida independiente.",
        duration: "1.5 horas",
        rating: 4.6,
        location: "Virtual",
        image: "/placeholder.svg?height=200&width=300",
        category: "asesoria-virtual",
        subcategory: "cocina",
        isVirtual: true,
        features: ["Comidas en 30 min", "Presupuesto bajo", "Meal prep", "Técnicas básicas"],
        professionalCount: 4,
    },

    // Asesorías Virtuales - Trámites
    {
        id: "5",
        name: "Gestión de Trámites INSS",
        description: "Te guiamos paso a paso para completar tus trámites del INSS sin complicaciones.",
        duration: "1-2 horas + seguimiento",
        rating: 4.8,
        location: "Virtual + Presencial",
        image: "/placeholder.svg?height=200&width=300",
        category: "asesoria-virtual",
        subcategory: "tramites",
        isVirtual: true,
        features: ["Documentos necesarios", "Citas online", "Seguimiento", "Asesoría presencial"],
        professionalCount: 5,
    },
    {
        id: "6",
        name: "Trámites Universitarios y Becas",
        description: "Ayuda completa para trámites universitarios, becas y documentación estudiantil.",
        duration: "1-3 días",
        rating: 4.7,
        location: "Virtual",
        image: "/placeholder.svg?height=200&width=300",
        category: "asesoria-virtual",
        subcategory: "tramites",
        isVirtual: true,
        features: ["Solicitud de becas", "Documentos universitarios", "Trámites CNU", "Seguimiento completo"],
        professionalCount: 7,
    },

    // Servicios de Limpieza - Limpieza Profunda
    {
        id: "7",
        name: "Limpieza Profunda de Casa",
        description: "Limpieza completa y detallada de tu hogar, ideal para mudanzas o limpieza mensual.",
        duration: "4-6 horas",
        rating: 4.9,
        location: "Managua, León, Granada",
        image: "/placeholder.svg?height=200&width=300",
        category: "limpieza-profunda",
        features: ["Limpieza de ventanas", "Desinfección completa", "Organización", "Productos incluidos"],
        professionalCount: 24,
    },
    {
        id: "8",
        name: "Limpieza Profunda de Apartamento",
        description: "Servicio especializado para apartamentos pequeños y medianos.",
        duration: "3-4 horas",
        rating: 4.8,
        location: "Managua, León",
        image: "/placeholder.svg?height=200&width=300",
        category: "limpieza-profunda",
        features: ["Cocina completa", "Baños desinfectados", "Habitaciones", "Balcón/terraza"],
        professionalCount: 18,
    },

    // Servicios de Limpieza - Mantenimiento
    {
        id: "9",
        name: "Mantenimiento Semanal",
        description: "Servicio regular de mantenimiento para mantener tu hogar siempre limpio.",
        duration: "2-3 horas",
        rating: 4.7,
        location: "Managua, León, Granada",
        image: "/placeholder.svg?height=200&width=300",
        category: "mantenimiento",
        features: ["Limpieza general", "Aspirado", "Baños básicos", "Cocina básica"],
        professionalCount: 32,
    },
    {
        id: "10",
        name: "Mantenimiento Quincenal",
        description: "Limpieza más detallada cada dos semanas para hogares ocupados.",
        duration: "3-4 horas",
        rating: 4.8,
        location: "Managua, León, Granada, Masaya",
        image: "/placeholder.svg?height=200&width=300",
        category: "mantenimiento",
        features: ["Limpieza detallada", "Organización", "Ventanas interiores", "Desinfección"],
        professionalCount: 28,
    },

    // Servicios de Limpieza - Lavandería
    {
        id: "11",
        name: "Servicio de Lavandería Completo",
        description: "Recogemos, lavamos, secamos y entregamos tu ropa limpia y doblada.",
        duration: "24-48 horas",
        rating: 4.6,
        location: "Managua, León",
        image: "/placeholder.svg?height=200&width=300",
        category: "lavanderia",
        features: ["Recogida a domicilio", "Lavado y secado", "Planchado básico", "Entrega a domicilio"],
        professionalCount: 15,
    },
    {
        id: "12",
        name: "Lavandería Express",
        description: "Servicio rápido de lavandería para cuando necesitas tu ropa urgente.",
        duration: "12-24 horas",
        rating: 4.5,
        location: "Managua",
        image: "/placeholder.svg?height=200&width=300",
        category: "lavanderia",
        features: ["Servicio express", "Recogida y entrega", "Planchado premium", "Cuidado especial"],
        professionalCount: 8,
    },
]