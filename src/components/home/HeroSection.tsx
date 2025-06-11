import { ArrowRight } from 'lucide-react'
import Image from "next/image"

export default function HeroSection() {
    return (
        <section id="inicio" className="bg-indigo-primary py-16 sm:py-20 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left order-2 lg:order-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-text leading-tight">
                            Vive tu <span className="text-indigo-secondary">independencia</span> en Nicaragua
                        </h1>
                        <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-indigo-text/80 max-w-2xl mx-auto lg:mx-0">
                            IndiGO te ayuda a gestionar tu vida independiente en Managua, León, Granada y todo Nicaragua.
                            Servicios de limpieza, asesorías, finanzas personales y mucho más en una sola plataforma.
                        </p>
                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">

                            <button
                                className="bg-indigo-secondary hover:bg-indigo-secondary/90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-md flex items-center justify-center transition-colors duration-200 w-full sm:w-auto">
                                Regístrate
                                gratis
                                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5"/>
                            </button>
                        </div>
                        <div
                            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 text-indigo-text/60">
                        <div className="flex items-center">
                                <span className="text-xl sm:text-2xl font-bold text-indigo-secondary">5k+</span>
                                <span className="ml-2 text-sm">Usuarios en Nicaragua</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-xl sm:text-2xl font-bold text-indigo-secondary">4.9</span>
                                <span className="ml-2 text-sm">Rating promedio</span>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative order-1 lg:order-2">
                        <div className="relative z-10 max-w-md mx-auto lg:max-w-none">
                            <Image
                                src="/placeholder.svg?height=600&width=500"
                                alt="IndiGO App Preview - Nicaragua"
                                width={500}
                                height={600}
                                className="w-full h-auto rounded-2xl shadow-2xl"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-indigo-secondary/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 sm:w-64 sm:h-64 bg-indigo-secondary/10 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
