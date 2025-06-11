import { Check, Star } from "lucide-react"

interface PricingPlan {
    name: string
    price: string
    period: string
    description: string
    features: string[]
    isPopular?: boolean
    buttonText: string
    buttonVariant: "default" | "outline"
}

const plans: PricingPlan[] = [
    {
        name: "Gratuito",
        price: "C$0",
        period: "/mes",
        description: "Perfecto para empezar tu vida independiente",
        features: [
            "Acceso a recetas nicaragüenses",
            "Tips de finanzas en córdobas",
            "Calculadora de gastos local",
            "Comunidad de usuarios nicas",
            "Soporte por WhatsApp",
        ],
        buttonText: "Empezar gratis",
        buttonVariant: "outline",
    },
    {
        name: "Premium",
        price: "C$350",
        period: "/mes",
        description: "La solución completa para jóvenes nicaragüenses",
        features: [
            "Todo del plan gratuito",
            "Servicios de limpieza con descuento",
            "Asesorías ilimitadas con expertos locales",
            "Gestión de trámites gubernamentales",
            "Recetas premium y listas de mercado",
            "Análisis financiero en córdobas",
            "Soporte prioritario 24/7",
        ],
        isPopular: true,
        buttonText: "Suscribirse ahora",
        buttonVariant: "default",
    },
    {
        name: "Por Demanda",
        price: "C$150-600",
        period: "/servicio",
        description: "Paga solo por lo que necesitas",
        features: [
            "Sin suscripción mensual",
            "Servicios individuales",
            "Precios en córdobas",
            "Flexibilidad total",
            "Ideal para uso ocasional",
        ],
        buttonText: "Ver servicios",
        buttonVariant: "outline",
    },
]

export default function PricingPlans() {
    return (
        <section id="precios" className="py-16 sm:py-20 bg-indigo-text">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-primary mb-3 sm:mb-4">
                        Planes accesibles para Nicaragua
                    </h2>
                    <p className="text-base sm:text-lg text-indigo-primary/70 max-w-3xl mx-auto px-4">
                        Precios justos en córdobas que se ajustan al presupuesto nicaragüense. Siempre puedes cambiar o cancelar
                        cuando quieras.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                                plan.isPopular ? "ring-2 ring-indigo-secondary md:scale-105" : ""
                            }`}
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-indigo-secondary text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium flex items-center">
                                        <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                        Más popular
                                    </div>
                                </div>
                            )}

                            <div className="text-center mb-6 sm:mb-8">
                                <h3 className="text-xl sm:text-2xl font-bold text-indigo-primary mb-2">{plan.name}</h3>
                                <div className="flex items-baseline justify-center mb-2">
                                    <span className="text-3xl sm:text-4xl font-bold text-indigo-primary">{plan.price}</span>
                                    <span className="text-indigo-primary/60 ml-1 text-sm sm:text-base">{plan.period}</span>
                                </div>
                                <p className="text-gray-600 text-sm sm:text-base px-2">{plan.description}</p>
                            </div>

                            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start">
                                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-secondary mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
                                        <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-2.5 sm:py-3 px-4 rounded-md transition-colors duration-200 text-sm sm:text-base font-medium ${
                                    plan.buttonVariant === "default"
                                        ? "bg-indigo-secondary hover:bg-indigo-secondary/90 text-white"
                                        : "border border-indigo-secondary text-indigo-secondary hover:bg-indigo-secondary hover:text-white"
                                }`}
                            >
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8 sm:mt-12">
                    <p className="text-indigo-primary/70 text-sm sm:text-base">
                        ¿Tienes dudas sobre los planes?{" "}
                        <a href="#contacto" className="text-indigo-secondary hover:underline font-medium">
                            Contáctanos por WhatsApp
                        </a>
                    </p>
                </div>
            </div>
        </section>
    )
}
