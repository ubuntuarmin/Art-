'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '@/components/ScrollReveal'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const TIMELINE = [
  { year: '1975', event: 'Born in Los Angeles, California to an Iranian family with deep artistic roots.' },
  { year: '1987', event: 'Began formal art training at age 12, studying classical drawing and painting.' },
  { year: '1993', event: 'Graduated from the Los Angeles Art Institute with honors in Fine Art.' },
  { year: '1995', event: 'Traveled to Europe and the Middle East to study art traditions from multiple cultures.' },
  { year: '1998', event: 'First solo exhibition in Los Angeles, showcasing a series of oil paintings.' },
  { year: '1999', event: 'Founded Beyond the Canvas Art Studio, beginning 25+ years of teaching.' },
  { year: '2003', event: 'International exhibition in Paris; received the Emerging Artist Award.' },
  { year: '2008', event: 'Expanded studio program to include resin art and mixed media workshops.' },
  { year: '2012', event: 'Featured in Art & Culture magazine as one of LA\'s most influential art educators.' },
  { year: '2018', event: 'Launched online classes and summer art camp programs for children.' },
  { year: '2023', event: 'Celebrated 25 years of Beyond the Canvas with a landmark retrospective exhibition.' },
  { year: 'Today', event: 'Continues to inspire students of all ages, exhibiting internationally and teaching at the studio.' },
]

const AWARDS = [
  { year: '2003', title: 'Emerging Artist Award', org: 'Paris International Art Fair' },
  { year: '2008', title: 'Excellence in Art Education', org: 'California Arts Council' },
  { year: '2013', title: 'Cultural Ambassador Award', org: 'Iranian-American Arts Council' },
  { year: '2018', title: 'Master Teacher Recognition', org: 'LA Art Teachers Association' },
  { year: '2022', title: 'Lifetime Achievement in Arts', org: 'Beyond Borders Art Festival' },
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.timeline-item', {
      x: -60, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.timeline-section', start: 'top 80%' },
    })
    gsap.from('.award-card', {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.awards-section', start: 'top 80%' },
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative bg-[#1C1C1C] pt-32 pb-20 px-6 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0"
             style={{ background: 'radial-gradient(ellipse 60% 50% at 40% 60%,rgba(196,98,45,0.15) 0%,transparent 70%)' }} />
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#D4A843] uppercase tracking-[0.3em] text-xs font-semibold mb-3">The Artist</p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#FAF7F2] mb-6 leading-tight">
              Farnaz Amin
            </h1>
            <p className="text-[#FAF7F2]/65 text-lg leading-relaxed mb-6">
              Iranian-American artist, educator, and founder of Beyond the Canvas Art Studio. With over
              25 years of teaching experience and an international exhibition record, Farnaz brings
              cultural richness and technical mastery to every brushstroke.
            </p>
            <blockquote className="border-l-2 border-[#D4A843] pl-5 mb-8">
              <p className="font-serif text-xl italic text-[#FAF7F2]/85">
                &ldquo;Art is the universal language that bridges cultures and connects souls.&rdquo;
              </p>
            </blockquote>
            <Link href="/classes" className="btn-terra">Study with Farnaz</Link>
          </div>

          <div className="relative mx-auto max-w-md w-full">
            {/* 📷 PHOTO PLACEHOLDER — Replace with Farnaz's professional portrait photo. */}
            <div className="absolute inset-0 border-2 border-[#D4A843]/30 rounded-2xl transform translate-x-5 translate-y-5" />
            <div data-art-type="about-portrait"
                 className="art-canvas-portrait relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#C4622D]/40">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-25">
                <span className="text-5xl">👩‍🎨</span>
                <p className="text-[#FAF7F2] text-xs tracking-widest uppercase">Farnaz Amin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="section-pad bg-[#FAF7F2]">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <p className="text-[#C4622D] uppercase tracking-[0.25em] text-xs font-semibold mb-3 text-center">Biography</p>
            <h2 className="font-serif text-4xl font-bold text-[#1C1C1C] text-center mb-10">A Life Devoted to Art</h2>
          </ScrollReveal>
          <div className="prose prose-lg max-w-none text-[#1C1C1C]/70 space-y-5">
            <ScrollReveal delay={0.1}>
              <p className="leading-relaxed">
                Farnaz Amin was born in Los Angeles, California to Iranian parents who carried with them a profound
                love for art, literature, and culture. From the earliest age, she was surrounded by the visual richness
                of Persian miniature paintings, calligraphy, and the vibrant colors of traditional Iranian textiles.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="leading-relaxed">
                At twelve, she began formal training in classical drawing and painting — immersing herself in the
                techniques of the Old Masters while also exploring the modernist movements that would come to define
                her mature style. She graduated from the Los Angeles Art Institute with honors, before embarking on
                an extended period of study and travel across Europe and the Middle East.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="leading-relaxed">
                In 1998, she held her first solo exhibition in Los Angeles to critical acclaim. Energized by the
                response of the public and by a deep desire to share her knowledge, she founded Beyond the Canvas
                Art Studio in 1999 — a space that would grow over the next 25 years into one of LA&apos;s most beloved
                creative communities.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="leading-relaxed">
                Today, Farnaz continues to exhibit internationally, create new works, and — above all — teach. Her
                students range from young children discovering art for the first time to seasoned adult artists
                refining their craft. For Farnaz, there is no greater joy than watching a student fall in love with
                the creative process.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section section-pad bg-[#1C1C1C]">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#D4A843] uppercase tracking-[0.25em] text-xs font-semibold mb-3">Career Journey</p>
            <h2 className="font-serif text-4xl font-bold text-[#FAF7F2]">A Life in Art</h2>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-[#D4A843]/20 md:-translate-x-px" />

            <div className="space-y-8">
              {TIMELINE.map(({ year, event }, i) => (
                <div key={year} className={`timeline-item relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} ml-14 md:ml-0`}>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[#D4A843]/30 transition-colors">
                      <span className="text-[#D4A843] font-bold font-serif text-sm">{year}</span>
                      <p className="text-[#FAF7F2]/70 text-sm leading-relaxed mt-1">{event}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-5 w-4 h-4 rounded-full bg-[#C4622D] border-2 border-[#D4A843] shadow-lg shadow-[#C4622D]/30" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="awards-section section-pad bg-[#FAF7F2]">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[#C4622D] uppercase tracking-[0.25em] text-xs font-semibold mb-3">Recognition</p>
            <h2 className="font-serif text-4xl font-bold text-[#1C1C1C]">Awards &amp; Honors</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AWARDS.map(({ year, title, org }) => (
              <div key={title} className="award-card bg-[#1C1C1C] rounded-2xl p-6 border border-white/5">
                <span className="text-[#D4A843] font-serif font-bold text-3xl block mb-3">{year}</span>
                <h3 className="text-[#FAF7F2] font-semibold mb-1">{title}</h3>
                <p className="text-[#FAF7F2]/45 text-sm">{org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-[#1C1C1C] text-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#FAF7F2] mb-5">
            Learn from a Master Artist
          </h2>
          <p className="text-[#FAF7F2]/55 max-w-md mx-auto mb-8">
            Join one of Farnaz&apos;s classes or workshops and experience her unique teaching approach firsthand.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/classes" className="btn-terra">View Classes</Link>
            <Link href="/contact" className="btn-outline-gold">Get in Touch</Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
