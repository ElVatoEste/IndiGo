import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer id="contacto" className="bg-indigo-primary border-t border-indigo-secondary/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
                            <div className="w-8 h-8 bg-indigo-secondary rounded-lg flex items-center justify-center">
                                <span className="text-indigo-text font-bold text-sm">I</span>
                            </div>
                            <span className="text-indigo-text font-bold text-xl">IndiGO</span>
                        </div>
                        <p className="text-indigo-text/80 mb-6 max-w-sm mx-auto sm:mx-0 text-sm sm:text-base">
                            La plataforma que te ayuda a vivir de forma independiente en Nicaragua sin complicaciones. Tu nueva vida
                            comienza aquí.
                        </p>
                        <div className="flex justify-center sm:justify-start space-x-4">
                            <a href="#" className="text-indigo-text/60 hover:text-indigo-secondary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-indigo-text/60 hover:text-indigo-secondary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-indigo-text/60 hover:text-indigo-secondary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-indigo-text font-semibold mb-4 text-base sm:text-lg">Servicios</h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-indigo-text/80 hover:text-indigo-secondary transition-colors text-sm sm:text-base"
                                >
                                    Limpieza
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-indigo-text/80 hover:text-indigo-secondary transition-colors text-sm sm:text-base"
                                >
                                    Finanzas
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-indigo-text/80 hover:text-indigo-secondary transition-colors text-sm sm:text-base"
                                >
                                    Cocina Nica
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-indigo-text/80 hover:text-indigo-secondary transition-colors text-sm sm:text-base"
                                >
                                    Trámites
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-indigo-text font-semibold mb-4 text-base sm:text-lg">Empresa</h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-indigo-text/80 hover:text-indigo-secondary transition-colors text-sm sm:text-base"
                                >
                                    Sobre nosotros
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-indigo-text/80 hover:text-indigo-secondary transition-colors text-sm sm:text-base"
                                >
                                    Empleos
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-indigo-text/80 hover:text-indigo-secondary transition-colors text-sm sm:text-base"
                                >
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-indigo-text font-semibold mb-4 text-base sm:text-lg">Contacto</h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li className="flex items-center justify-center sm:justify-start text-indigo-text/80">
                                <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                                <span className="text-sm">hola@indigo.com.ni</span>
                            </li>
                            <li className="flex items-center justify-center sm:justify-start text-indigo-text/80">
                                <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                                <span className="text-sm">+505 8888 9999</span>
                            </li>
                            <li className="flex items-start justify-center sm:justify-start text-indigo-text/80">
                                <MapPin className="h-4 w-4 mr-3 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">Managua, Nicaragua</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-indigo-secondary/20 mt-8 sm:mt-12 pt-6 sm:pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-indigo-text/60 text-xs sm:text-sm text-center md:text-left">
                            © {currentYear} IndiGO Nicaragua. Todos los derechos reservados.
                        </p>
                        <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
                            <a
                                href="#"
                                className="text-indigo-text/60 hover:text-indigo-secondary text-xs sm:text-sm transition-colors"
                            >
                                Términos de Servicio
                            </a>
                            <a
                                href="#"
                                className="text-indigo-text/60 hover:text-indigo-secondary text-xs sm:text-sm transition-colors"
                            >
                                Política de Privacidad
                            </a>
                            <a
                                href="#"
                                className="text-indigo-text/60 hover:text-indigo-secondary text-xs sm:text-sm transition-colors"
                            >
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
