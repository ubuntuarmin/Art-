'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '@/components/ScrollReveal'
import { CLASS_PROGRAMS } from '@/lib/classes'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const levelColors: Record<string, string> = {
  Beginner: 'bg-[#7A9E7E]/20 text-[#7A9E7E]',
  Advanced: 'bg-[#C4622D]/20 text-[#C4622D]',
  'All Levels': 'bg-[#D4A843]/20 text-[#D4A843]',
  'Beginner to Intermediate': 'bg-[#D4A843]/20 text-[#D4A843]',
  'N/A': 'bg-white/10 text-white/50',
}

export default function ClassesPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.class-card', {
      y: 60,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.classes-grid', start: 'top 80%' },
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-[#1C1C1C]">
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 40%,rgba(212,168,67,0.1) 0%,transparent 70%)',
          }}
        />
        <p className="text-[#D4A843] uppercase tracking-[0.3em] text-xs font-semibold mb-3">Classes in Katy, TX</p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#FAF7F2] mb-5">
          Choose Your Art Class
        </h1>
        <p className="text-[#FAF7F2]/55 text-lg max-w-2xl mx-auto mb-8">
          Select a class to view full details, curriculum highlights, and booking options at Beyond the Canvas Art Studio.
        </p>
        <a href="#classes" className="btn-terra">Browse Classes</a>
      </section>

      <section id="classes" className="section-pad">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#FAF7F2]">Art Programs & Workshops</h2>
          </ScrollReveal>

          <div className="classes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLASS_PROGRAMS.map(({ slug, icon, title, shortDescription, ages, duration, level, sessions, accent }) => (
              <div
                key={slug}
                className="class-card group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4A843]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-6 pb-0">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{icon}</span>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${levelColors[level] ?? 'bg-white/10 text-white/50'}`}>
                      {level}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#FAF7F2] mb-2">{title}</h3>
                  <p className="text-[#FAF7F2]/55 text-sm leading-relaxed">{shortDescription}</p>
                </div>

                <div className="p-6 pt-4 space-y-2">
                  <div className="flex gap-4 text-xs text-[#FAF7F2]/40">
                    <span>👥 {ages}</span>
                    <span>⏱ {duration}</span>
                  </div>
                  <div className="text-xs text-[#FAF7F2]/40">🗓 {sessions}</div>
                </div>

                <div className="p-6 pt-0 border-t border-white/10">
                  <Link
                    href={`/classes/${slug}`}
                    className="inline-flex items-center justify-center w-full text-sm font-medium px-4 py-3 rounded-lg transition-all duration-200"
                    style={{ background: `${accent}22`, color: accent }}
                  >
                    View Class Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#FAF7F2]">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: '📦',
              title: 'All Materials Included',
              desc: 'Professional-grade art supplies are available for each workshop so students can focus fully on creating.',
            },
            {
              icon: '🔄',
              title: 'Flexible Scheduling',
              desc: 'Weekday and weekend options are available, with private sessions by appointment.',
            },
            {
              icon: '❤️',
              title: 'Small Class Sizes',
              desc: 'Small groups ensure personalized support and meaningful progress in every session.',
            },
          ].map(({ icon, title, desc }) => (
            <ScrollReveal key={title}>
              <div className="p-6">
                <span className="text-4xl block mb-4">{icon}</span>
                <h3 className="font-serif text-xl font-bold text-[#1C1C1C] mb-3">{title}</h3>
                <p className="text-[#1C1C1C]/60 text-sm leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section-pad text-center bg-[#1C1C1C]">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#FAF7F2] mb-5">
            Need Help Choosing a Class?
          </h2>
          <p className="text-[#FAF7F2]/55 max-w-md mx-auto mb-8">
            Contact our Katy studio and we&apos;ll recommend the best class for your goals, schedule, and experience level.
          </p>
          <Link href="/contact" className="btn-terra">Get Personalized Advice</Link>
        </ScrollReveal>
      </section>
    </div>
  )
}
