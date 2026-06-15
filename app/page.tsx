import { Hero }         from '@/components/sections/Hero'
import { Services }     from '@/components/sections/Services'
import { Projects }     from '@/components/sections/Projects'
import { About }        from '@/components/sections/About'
import { Process }      from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact }      from '@/components/sections/Contact'
import { Footer }       from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <About />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}
