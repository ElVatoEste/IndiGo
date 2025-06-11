"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQ {
    question: string
    answer: string
}

const faqs: FAQ[] = [
    {
        question: "¿Cómo funciona el servicio de limpieza en Nicaragua?",
        answer:
            "Conectamos con profesionales verificados en Managua, León, Granada y otras ciudades principales. Puedes agendar servicios de limpieza regular o por demanda a través de la app. Todos nuestros profesionales están verificados y tienen referencias comprobables.",
    },
    {
        question: "¿Qué tipo de asesorías ofrecen para jóvenes nicaragüenses?",
        answer:
            "Ofrecemos asesorías especializadas en finanzas personales en córdobas, carrera profesional en el mercado nicaragüense, trámites gubernamentales, y vida independiente adaptada al contexto local. Nuestros asesores conocen la realidad del país.",
    },
    {
        question: "¿Puedo pagar en córdobas y cancelar cuando quiera?",
        answer:
            "Sí, todos nuestros precios están en córdobas nicaragüenses. Puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta sin penalizaciones ni cargos adicionales.",
    },
    {
        question: "¿Los servicios están disponibles en mi ciudad?",
        answer:
            "Actualmente operamos en Managua, León, Granada, Masaya, Estelí y Matagalpa. Estamos expandiéndonos a más ciudades. Puedes verificar disponibilidad descargando la app e ingresando tu ubicación.",
    },
    {
        question: "¿Cómo garantizan la calidad en Nicaragua?",
        answer:
            "Todos nuestros proveedores pasan por verificación de antecedentes y referencias locales. Tenemos un sistema de calificaciones de usuarios nicaragüenses y ofrecemos garantía de satisfacción en todos nuestros servicios.",
    },
    {
        question: "¿Qué métodos de pago aceptan en Nicaragua?",
        answer:
            "Aceptamos tarjetas de crédito y débito locales, transferencias bancarias, Tigo Money, y próximamente otros métodos de pago digital populares en Nicaragua. Todos los pagos son procesados de forma segura.",
    },
]

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-16 sm:py-20 bg-indigo-primary">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-text mb-3 sm:mb-4">
                        Preguntas Frecuentes
                    </h2>
                    <p className="text-base sm:text-lg text-indigo-text/80 max-w-2xl mx-auto px-4">
                        Resolvemos las dudas más comunes sobre IndiGO y nuestros servicios en Nicaragua.
                    </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                            >
                                <span className="font-semibold text-indigo-primary pr-4 text-sm sm:text-base">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-secondary flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-secondary flex-shrink-0" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8 sm:mt-12">
                    <p className="text-indigo-text/80 mb-3 sm:mb-4 text-sm sm:text-base">
                        ¿No encontraste la respuesta que buscabas?
                    </p>
                    <button className="bg-indigo-secondary hover:bg-indigo-secondary/90 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-md transition-colors duration-200 text-sm sm:text-base">
                        Contactar por WhatsApp
                    </button>
                </div>
            </div>
        </section>
    )
}
