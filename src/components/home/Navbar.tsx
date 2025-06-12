"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const navLinks = [
        { href: "#inicio", label: "Inicio" },
        { href: "#funcionalidades", label: "Funcionalidades" },
        { href: "#precios", label: "Precios" },
        { href: "#contacto", label: "Contacto" },
    ];

    const handleRedirect = (path: string) => {
        setIsMenuOpen(false); // cerrar el menú en mobile
        router.push(path);
    };

    return (
        <nav className="bg-indigo-primary border-b border-indigo-secondary/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <div className="flex items-center space-x-2">
                                <Image src="/isotipo.png" alt="Isotipo IndiGO" width={32} height={32} />
                                <span className="text-indigo-text font-bold text-lg sm:text-xl">IndiGO</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6 lg:space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-indigo-text/80 hover:text-indigo-text transition-colors duration-200 px-3 py-2 text-sm font-medium"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
                        <button
                            onClick={() => handleRedirect("/login")}
                            className="text-indigo-text hover:text-indigo-text hover:bg-indigo-secondary/10 px-3 lg:px-4 py-2 rounded-md transition-colors duration-200 text-sm"
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            onClick={() => handleRedirect("/register")}
                            className="bg-indigo-secondary hover:bg-indigo-secondary/90 text-white px-3 lg:px-4 py-2 rounded-md transition-colors duration-200 text-sm"
                        >
                            Registrarse
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-indigo-text hover:text-indigo-text/80 p-2"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-indigo-secondary/20">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-indigo-text/80 hover:text-indigo-text block px-3 py-2 text-base font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="pt-4 space-y-2">
                                <button
                                    onClick={() => handleRedirect("/login")}
                                    className="w-full text-indigo-text hover:text-indigo-text hover:bg-indigo-secondary/10 px-4 py-2 rounded-md transition-colors duration-200 text-sm"
                                >
                                    Iniciar Sesión
                                </button>
                                <button
                                    onClick={() => handleRedirect("/register")}
                                    className="w-full bg-indigo-secondary hover:bg-indigo-secondary/90 text-white px-4 py-2 rounded-md transition-colors duration-200 text-sm"
                                >
                                    Registrarse
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
