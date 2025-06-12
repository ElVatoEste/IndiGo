"use client"

import { FC, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const LoadingScreen: FC = () => {
    const [particles, setParticles] = useState<{ x: number; y: number; duration: number; delay: number }[]>([])

    useEffect(() => {
        const width = window.innerWidth
        const height = window.innerHeight

        const newParticles = [...Array(6)].map(() => ({
            x: Math.random() * width,
            y: height + 50,
            duration: Math.random() * 3 + 4,
            delay: Math.random() * 2,
        }))
        setParticles(newParticles)
    }, [])

    return (
        <div className="min-h-screen bg-indigo-primary flex flex-col items-center justify-center space-y-8 overflow-hidden">
            {/* Logo animado */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.2,
                }}
                className="relative"
            >
                {/* Círculo de fondo con pulso */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 w-24 h-24 bg-indigo-secondary rounded-full blur-sm"
                />

                {/* Logo principal */}
                <motion.div
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="relative w-24 h-24 bg-indigo-secondary rounded-full flex items-center justify-center shadow-2xl"
                >
                    <Image src="/isotipo.png" alt="Isotipo IndiGO" width={48} height={48} className="relative z-10" />
                </motion.div>
            </motion.div>

            {/* Nombre de la marca */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.6,
                    delay: 0.8,
                    ease: "easeOut",
                }}
                className="text-center"
            >
                <h1 className="text-indigo-text font-bold text-3xl sm:text-4xl tracking-wide">IndiGO</h1>
            </motion.div>

            {/* Barra de progreso animada */}
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{
                    duration: 1,
                    delay: 1.2,
                    ease: "easeOut",
                }}
                className="w-64 h-1 bg-white/20 rounded-full overflow-hidden"
            >
                <motion.div
                    animate={{
                        x: ["-100%", "100%"],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
                />
            </motion.div>

            {/* Texto de carga con animación */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 1.5,
                }}
                className="text-center"
            >
                <motion.p
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="text-indigo-text/80 text-lg font-medium tracking-wide"
                >
                    Preparando tu experiencia...
                </motion.p>
            </motion.div>

            {/* Partículas flotantes de fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: p.x, y: p.y, opacity: 0 }}
                        animate={{
                            y: -50,
                            opacity: [0, 0.3, 0],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "linear",
                        }}
                        className="absolute w-2 h-2 bg-white/20 rounded-full"
                    />
                ))}
            </div>
        </div>
    )
}

export default LoadingScreen
