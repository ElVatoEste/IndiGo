import { Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"
import {blogPosts} from "@/data/BlogPost";

export default function BlogTeaser() {
    return (
        <section className="py-16 sm:py-20 bg-indigo-text">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-primary mb-3 sm:mb-4">
                        Aprende sobre vida independiente en Nicaragua
                    </h2>
                    <p className="text-base sm:text-lg text-indigo-primary/70 max-w-3xl mx-auto px-4">
                        Consejos, guías y recursos específicos para hacer tu vida independiente más fácil y exitosa en territorio
                        nica.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {blogPosts.map((post, index) => (
                        <article
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative">
                                <Image
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.title}
                                    width={300}
                                    height={200}
                                    className="w-full h-40 sm:h-48 object-cover"
                                />
                                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className="bg-indigo-secondary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {post.category}
                  </span>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6">
                                <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
                                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                    {post.date}
                                </div>

                                <h3 className="text-lg sm:text-xl font-semibold text-indigo-primary mb-2 sm:mb-3 line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base">{post.excerpt}</p>

                                <button className="text-indigo-secondary hover:text-indigo-secondary/80 flex items-center font-medium transition-colors duration-200 text-sm sm:text-base">
                                    Leer más
                                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="text-center mt-8 sm:mt-12">
                    <button className="border border-indigo-secondary text-indigo-secondary hover:bg-indigo-secondary hover:text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-md transition-colors duration-200 text-sm sm:text-base">
                        Ver todos los artículos
                    </button>
                </div>
            </div>
        </section>
    )
}
