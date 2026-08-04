import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CLASS_PROGRAMS, CLASS_PROGRAMS_BY_SLUG } from '@/lib/classes'

interface ClassDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return CLASS_PROGRAMS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: ClassDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const classProgram = CLASS_PROGRAMS_BY_SLUG[slug]

  if (!classProgram) {
    return {
      title: 'Class Not Found | Beyond the Canvas Art Studio',
      description: 'The requested class page could not be found.',
    }
  }

  return {
    title: classProgram.seoTitle,
    description: classProgram.seoDescription,
    alternates: {
      canonical: `/classes/${classProgram.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `/classes/${classProgram.slug}`,
      title: classProgram.seoTitle,
      description: classProgram.seoDescription,
    },
  }
}

export default async function ClassDetailPage({ params }: ClassDetailPageProps) {
  const { slug } = await params
  const classProgram = CLASS_PROGRAMS_BY_SLUG[slug]

  if (!classProgram) {
    notFound()
  }

  const {
    title,
    icon,
    heroDescription,
    longDescription,
    ages,
    duration,
    price,
    level,
    sessions,
    accent,
    subject,
    whatYouLearn,
    process,
    benefits,
  } = classProgram

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-[#FAF7F2]">
      <section className="section-pad pt-28 pb-14">
        <div className="mx-auto max-w-5xl">
          <Link href="/classes" className="text-sm text-[#FAF7F2]/60 hover:text-[#D4A843] transition-colors">
            ← Back to all classes
          </Link>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-3">Katy, TX Art Classes</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
              <span>{icon}</span>
              {title}
            </h1>
            <p className="text-[#FAF7F2]/75 text-lg leading-relaxed mb-7">{heroDescription}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-sm">
              <div className="rounded-xl bg-white/5 border border-white/10 p-3"><span className="text-[#FAF7F2]/60">Ages:</span> {ages}</div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3"><span className="text-[#FAF7F2]/60">Duration:</span> {duration}</div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3"><span className="text-[#FAF7F2]/60">Level:</span> {level}</div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3"><span className="text-[#FAF7F2]/60">Schedule:</span> {sessions}</div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3"><span className="text-[#FAF7F2]/60">Price:</span> {price}</div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/contact?class=${encodeURIComponent(title)}&subject=${encodeURIComponent(subject)}`}
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: accent, color: '#1C1C1C' }}
              >
                Book This Class
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold border border-white/20 text-[#FAF7F2]"
              >
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad pt-0 pb-16">
        <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-5">
          <article className="md:col-span-3 rounded-3xl bg-white/5 border border-white/10 p-8">
            <h2 className="font-serif text-2xl font-bold mb-4">About this class</h2>
            <p className="text-[#FAF7F2]/75 leading-relaxed">{longDescription}</p>
          </article>

          <aside className="md:col-span-2 rounded-3xl bg-white/5 border border-white/10 p-8">
            <h2 className="font-serif text-2xl font-bold mb-4">What you&apos;ll learn</h2>
            <ul className="space-y-3 text-sm text-[#FAF7F2]/80">
              {whatYouLearn.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#D4A843]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {process && process.length > 0 && (
        <section className="section-pad pt-0 pb-16">
          <div className="mx-auto max-w-5xl rounded-3xl bg-[#FAF7F2] text-[#1C1C1C] p-8 md:p-10">
            <h2 className="font-serif text-3xl font-bold mb-6">Class process</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {process.map((step) => (
                <div key={step.title} className="rounded-2xl border border-[#1C1C1C]/10 bg-white p-5">
                  <h3 className="font-serif text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-[#1C1C1C]/70 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-pad pt-0 pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <h2 className="font-serif text-2xl font-bold mb-4">Why families and artists in Katy choose us</h2>
          <ul className="space-y-3 text-[#FAF7F2]/80 mb-8">
            {benefits.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[#D4A843]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/contact?class=${encodeURIComponent(title)}&subject=${encodeURIComponent(subject)}`}
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold"
              style={{ backgroundColor: accent, color: '#1C1C1C' }}
            >
              Reserve Your Spot
            </Link>
            <Link href="/classes" className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold border border-white/20">
              Explore Other Classes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
