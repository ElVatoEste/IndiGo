import type React from "react"
import { Sparkles, DollarSign, ChefHat, FileText, Users } from "lucide-react"

interface Feature {
    icon: React.ReactNode
    title: string
    description: string
}

const features: Feature[] = [
    {
        icon: <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />,
        title: "Servicios de Limpieza",
        description:
            "Profesionales verificados en Managua, León y Granada. Agenda servicios de limpieza cuando los necesites.",
    },
    {
        icon: <Users className="h-6 w-6 sm:h-8 sm:w-8" />,
        title: "Asesorías Personalizadas",
        description: "Expertos nicaragüenses en finanzas, carrera y vida independiente listos para ayudarte.",
    },
    {
        icon: <DollarSign className="h-6 w-6 sm:h-8 sm:w-8" />,
        title: "Finanzas en Córdobas",
        description: "Controla tus gastos en córdobas, crea presupuestos y aprende a ahorrar en el contexto nicaragüense.",
    },
    {
        icon: <ChefHat className="h-6 w-6 sm:h-8 sm:w-8" />,
        title: "Cocina Nicaragüense",
        description: "Recetas tradicionales y modernas, listas de compras con precios locales y tips de cocina nica.",
    },
    {
        icon: <FileText className="h-6 w-6 sm:h-8 sm:w-8" />,
        title: "Trámites Locales",
        description: "Te ayudamos con documentos, citas en el INSS, pagos de servicios y trámites gubernamentales.",
    },
]

export default function FeaturesSection() {
    return (
        <section id="funcionalidades" className="py-16 sm:py-20 bg-indigo-text">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-primary mb-3 sm:mb-4">
                        Todo lo que necesitas para vivir independiente en Nicaragua
                    </h2>
                    <p className="text-base sm:text-lg text-indigo-primary/70 max-w-3xl mx-auto px-4">
                        Desde servicios básicos hasta asesorías especializadas, IndiGO tiene las herramientas que necesitas para tu
                        nueva vida independiente en territorio nica.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                        >
                            <div className="text-indigo-secondary mb-3 sm:mb-4">{feature.icon}</div>
                            <h3 className="text-lg sm:text-xl font-semibold text-indigo-primary mb-2 sm:mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
