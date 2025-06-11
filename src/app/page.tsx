import Navbar from '@/components/home/Navbar'
import HeroSection from '@/components/home/HeroSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import HowItWorks from '@/components/home/HowItWorks'
import PricingPlans from '@/components/home/PricingPlans'
import FAQSection from '@/components/home/FAQSection'
import BlogTeaser from '@/components/home/BlogTeaser'
import Footer from '@/components/home/Footer'

export default function Home() {
  return (
      <div className="min-h-screen bg-indigo-primary">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <PricingPlans />
        <FAQSection />
        <BlogTeaser />
        <Footer />
      </div>
  )
}
