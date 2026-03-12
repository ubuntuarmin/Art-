'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '@/components/ScrollReveal'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const CLASSES = [
  {
    icon: '🖌️',
    title: 'Oil Painting Fundamentals',
    desc: 'Master the foundations of oil painting — color mixing, layering techniques, composition, and glazing. Perfect for beginners ready to dive deep.',
    ages: 'Ages 14+',
    duration: '10 weeks',
    price: 'From $250',
    level: 'Beginner',
    sessions: 'Tue & Thu 6–8pm',
    accent: '#C4622D',
  },
  {
    icon: '🎨',
    title: 'Advanced Oil Painting',
    desc: 'Push your technique further with palette knives, impasto, alla prima painting, and personal style development guided by Farnaz.',
    ages: 'Ages 16+',
    duration: '8 weeks',
    price: 'From $320',
    level: 'Advanced',
    sessions: 'Mon & Wed 6–8:30pm',
    accent: '#D4A843',
  },
  {
    icon: '💧',
    title: 'Watercolor Workshop',
    desc: 'Explore the luminous world of watercolor: wet-on-wet, dry brush, resist techniques, and transparent layering for stunning results.',
    ages: 'Ages 10+',
    duration: '6 weeks',
    price: 'From $180',
    level: 'All Levels',
    sessions: 'Sat 10am–12pm',
    accent: '#7A9E7E',
  },
  {
    icon: '✨',
    title: 'Resin Art & Craft',
    desc: 'Create mesmerizing resin artworks — geode designs, ocean pours, petri art, and custom home décor pieces using professional-grade resins.',
    ages: 'Ages 14+',
    duration: '4 weeks',
    price: 'From $220',
    level: 'Beginner',
    sessions: 'Sun 1–4pm',
    accent: '#9B5DE5',
  },
  {
    icon: '✏️',
    title: 'Drawing & Sketching',
    desc: 'Build the backbone of visual art through line, form, perspective, shading, and observational drawing. Works of all complexity welcome.',
    ages: 'Ages 8+',
    duration: '8 weeks',
    price: 'From $160',
    level: 'All Levels',
    sessions: 'Wed 4–6pm',
    accent: '#C4622D',
  },
  {
    icon: '🌟',
    title: 'Kids Art Camp',
    desc: 'A joyful, imagination-first program where children explore painting, sculpture, collage, and crafts in a supportive, fun environment.',
    ages: 'Ages 5–12',
    duration: '1 week (Summer)',
    price: 'From $299',
    level: 'Beginner',
    sessions: 'Mon–Fri 9am–12pm',
    accent: '#D4A843',
  },
  {
    icon: '👑',
    title: 'Private One-on-One Lessons',
    desc: 'Fully personalized instruction tailored to your goals, pace, and chosen medium. Flexible scheduling available for all ages and levels.',
    ages: 'All Ages',
    duration: 'Ongoing',
    price: 'From $85/hr',
    level: 'All Levels',
    sessions: 'By appointment',
    accent: '#C4622D',
  },
  {
    icon: '🎉',
    title: 'Birthday Party Packages',
    desc: 'Make your child\'s birthday unforgettable with a guided art party at the studio. Includes materials, instruction, and take-home artwork.',
    ages: 'Ages 5–16',
    duration: '2 hours',
    price: 'From $450',
    level: 'N/A',
    sessions: 'Weekends',
    accent: '#7A9E7E',
  },
]

const levelColors: Record<string, string> = {
  'Beginner':   'bg-[#7A9E7E]/20 text-[#7A9E7E]',
  'Advanced':   'bg-[#C4622D]/20 text-[#C4622D]',
  'All Levels': 'bg-[#D4A843]/20 text-[#D4A843]',
  'N/A':        'bg-white/10 text-white/50',
}

export default function ClassesPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.class-card', {
      y: 60, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.classes-grid', start: 'top 80%' },
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-[#1C1C1C]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0"
             style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%,rgba(212,168,67,0.1) 0%,transparent 70%)' }} />
        <p className="text-[#D4A843] uppercase tracking-[0.3em] text-xs font-semibold mb-3">Classes &amp; Workshops</p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#FAF7F2] mb-5">
          Find Your Class
        </h1>
        <p className="text-[#FAF7F2]/55 text-lg max-w-xl mx-auto mb-8">
          From beginner workshops to advanced masterclasses, there&apos;s a place for every artist at Beyond the Canvas.
        </p>
        <a href="#classes" className="btn-terra">Browse All Classes</a>
      </section>

      {/* Classes grid */}
      <section id="classes" className="section-pad">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#FAF7F2]">Our Programs</h2>
          </ScrollReveal>

          <div className="classes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLASSES.map(({ icon, title, desc, ages, duration, price, level, sessions, accent }) => (
              <div key={title}
                   className="class-card group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4A843]/40 hover:-translate-y-1 transition-all duration-300">
                {/* Card header */}
                <div className="p-6 pb-0">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{icon}</span>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${levelColors[level] ?? 'bg-white/10 text-white/50'}`}>
                      {level}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#FAF7F2] mb-2">{title}</h3>
                  <p className="text-[#FAF7F2]/55 text-sm leading-relaxed">{desc}</p>
                </div>

                {/* Card details */}
                <div className="p-6 pt-4 space-y-2">
                  <div className="flex gap-4 text-xs text-[#FAF7F2]/40">
                    <span>👥 {ages}</span>
                    <span>⏱ {duration}</span>
                  </div>
                  <div className="text-xs text-[#FAF7F2]/40">🗓 {sessions}</div>
                </div>

                {/* Card footer */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-white/10">
                  <span className="text-[#D4A843] font-bold font-serif text-lg">{price}</span>
                  <Link
                    href="/contact"
                    className="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
                    style={{ background: accent + '22', color: accent }}
                  >
                    Book Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info section */}
      <section className="section-pad bg-[#FAF7F2]">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: '📦', title: 'All Materials Included', desc: 'Professional-grade art supplies provided for all classes. Just bring yourself and your creativity.' },
            { icon: '🔄', title: 'Flexible Scheduling', desc: 'Morning, afternoon, and evening classes available. Private lessons by appointment.' },
            { icon: '❤️', title: 'Small Class Sizes', desc: 'Maximum 8–10 students per class ensures personalized attention from Farnaz and instructors.' },
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

      {/* CTA */}
      <section className="section-pad text-center bg-[#1C1C1C]">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#FAF7F2] mb-5">
            Not Sure Where to Start?
          </h2>
          <p className="text-[#FAF7F2]/55 max-w-md mx-auto mb-8">
            Contact us for a complimentary consultation. We&apos;ll help you find the perfect class for your goals and experience level.
          </p>
          <Link href="/contact" className="btn-terra">Get Personalized Advice</Link>
        </ScrollReveal>
      </section>
    </div>
  )
}
