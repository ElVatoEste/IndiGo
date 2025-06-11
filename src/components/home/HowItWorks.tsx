import { UserPlus, Search, Heart } from "lucide-react"

const steps = [
    {
        icon: <UserPlus className="h-12 w-12" />,
        title: "Crear cuenta",
        description: "Regístrate en menos de 2 minutos y personaliza tu perfil según tus necesidades.",
    },
    {
        icon: <Search className="h-12 w-12" />,
        title: "Elegir servicio",
        description: "Explora nuestros servicios y elige el que mejor se adapte a lo que necesitas.",
    },
    {
        icon: <Heart className="h-12 w-12" />,
        title: "Disfrutar",
        description: "Relájate mientras nosotros nos encargamos de hacer tu vida más fácil y organizada.",
    },
]

export default function HowItWorks() {
    return (
        <section className="py-20 bg-indigo-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-indigo-text mb-4">¿Cómo funciona IndiGO?</h2>
                    <p className="text-lg text-indigo-text/80 max-w-2xl mx-auto">
                        En solo tres simples pasos puedes empezar a disfrutar de una vida independiente sin
                        complicaciones.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center relative flex flex-col items-center">
                            {/* Línea conectiva: solo visible entre los pasos */}
                            {index < steps.length - 1 && (
                                <div
                                    className="hidden md:block absolute top-12 right-[-50%] w-[88%] h-0.5 bg-indigo-secondary/30 z-0"></div>
                            )}

                            <div className="relative z-10">
                                <div
                                    className="bg-indigo-secondary/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 border-4 border-indigo-secondary">
                                    <div className="text-indigo-secondary">{step.icon}</div>
                                </div>
                                <div
                                    className="bg-indigo-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-semibold text-indigo-text mb-3">{step.title}</h3>
                                <p className="text-indigo-text/80 leading-relaxed max-w-sm mx-auto">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
