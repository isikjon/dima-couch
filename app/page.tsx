import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Positioning from '@/components/sections/Positioning'
import Services from '@/components/sections/Services'
import ForWhom from '@/components/sections/ForWhom'
import Offer from '@/components/sections/Offer'
import About from '@/components/sections/About'
import WhyMe from '@/components/sections/WhyMe'
import FinalCTA from '@/components/sections/FinalCTA'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="bg-[#050505] text-[#f0ece6] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Positioning />
      <Services />
      <ForWhom />
      <Offer />
      <About />
      <WhyMe />
      <FinalCTA />
      <Footer />
    </main>
  )
}
