'use client'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const HOURS = [
  { day: 'Monday – Friday', hours: '10:00 AM – 7:00 PM' },
  { day: 'Saturday',        hours: '10:00 AM – 5:00 PM' },
  { day: 'Sunday',          hours: '11:00 AM – 4:00 PM' },
]

const SUBJECTS = [
  'General Inquiry',
  'Book a Class',
  'Private Lesson',
  'Birthday Party',
  'Corporate Event',
  'Commission a Painting',
  'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    /* TODO: Replace this simulation with a real API call (e.g. /api/contact) that
       validates input server-side and sends the email before going to production. */
    await new Promise(r => setTimeout(r, 1500))
    setStatus('sent')
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative bg-[#1C1C1C] pt-32 pb-20 px-6 text-center overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0"
             style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%,rgba(196,98,45,0.12) 0%,transparent 70%)' }} />
        <p className="text-[#D4A843] uppercase tracking-[0.3em] text-xs font-semibold mb-3">Get in Touch</p>
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#FAF7F2] mb-5">Contact Us</h1>
        <p className="text-[#FAF7F2]/55 text-lg max-w-xl mx-auto">
          Ready to start your art journey? Have a question or want to plan an event? We&apos;d love to hear from you.
        </p>
      </section>

      {/* Main content */}
      <section className="section-pad">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Contact form */}
          <ScrollReveal direction="left">
            <div className="bg-white rounded-2xl shadow-xl shadow-black/5 p-8 md:p-10">
              <h2 className="font-serif text-2xl font-bold text-[#1C1C1C] mb-7">Send a Message</h2>

              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <span className="text-5xl block mb-4">🎨</span>
                  <h3 className="font-serif text-2xl font-bold text-[#1C1C1C] mb-2">Message Sent!</h3>
                  <p className="text-[#1C1C1C]/60">
                    Thank you for reaching out. Farnaz or a team member will reply within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-[#1C1C1C]/60 uppercase tracking-wide mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="name" name="name" type="text" required
                        value={form.name} onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-lg border border-[#1C1C1C]/15 bg-[#FAF7F2] text-[#1C1C1C] placeholder-[#1C1C1C]/30 focus:outline-none focus:border-[#C4622D] transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[#1C1C1C]/60 uppercase tracking-wide mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="email" name="email" type="email" required
                        value={form.email} onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-lg border border-[#1C1C1C]/15 bg-[#FAF7F2] text-[#1C1C1C] placeholder-[#1C1C1C]/30 focus:outline-none focus:border-[#C4622D] transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-[#1C1C1C]/60 uppercase tracking-wide mb-1.5">
                        Phone (optional)
                      </label>
                      <input
                        id="phone" name="phone" type="tel"
                        value={form.phone} onChange={handleChange}
                        placeholder="(310) 000-0000"
                        className="w-full px-4 py-3 rounded-lg border border-[#1C1C1C]/15 bg-[#FAF7F2] text-[#1C1C1C] placeholder-[#1C1C1C]/30 focus:outline-none focus:border-[#C4622D] transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-[#1C1C1C]/60 uppercase tracking-wide mb-1.5">
                        Subject *
                      </label>
                      <select
                        id="subject" name="subject" required
                        value={form.subject} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-[#1C1C1C]/15 bg-[#FAF7F2] text-[#1C1C1C] focus:outline-none focus:border-[#C4622D] transition-colors text-sm appearance-none"
                      >
                        <option value="" disabled>Select a topic</option>
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-[#1C1C1C]/60 uppercase tracking-wide mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="message" name="message" required rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder="Tell us about yourself or what you're interested in..."
                      className="w-full px-4 py-3 rounded-lg border border-[#1C1C1C]/15 bg-[#FAF7F2] text-[#1C1C1C] placeholder-[#1C1C1C]/30 focus:outline-none focus:border-[#C4622D] transition-colors text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-terra w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Info column */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              {/* Contact details */}
              <div className="bg-[#1C1C1C] rounded-2xl p-8 text-[#FAF7F2]">
                <h3 className="font-serif text-xl font-bold mb-6 text-[#D4A843]">Studio Details</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <span className="text-xl shrink-0">📍</span>
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-[#FAF7F2]/55 mt-0.5">1234 Artisan Blvd, Suite 200<br/>Los Angeles, CA 90028</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xl shrink-0">📞</span>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+13101234567" className="text-[#D4A843] hover:underline mt-0.5 block">(310) 123-4567</a>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xl shrink-0">✉️</span>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:hello@beyondthecanvas.art" className="text-[#D4A843] hover:underline mt-0.5 block">
                        hello@beyondthecanvas.art
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-[#1C1C1C] rounded-2xl p-8 text-[#FAF7F2]">
                <h3 className="font-serif text-xl font-bold mb-6 text-[#D4A843]">Studio Hours</h3>
                <div className="space-y-3">
                  {HOURS.map(({ day, hours }) => (
                    <div key={day} className="flex justify-between text-sm py-2 border-b border-white/10 last:border-0">
                      <span className="text-[#FAF7F2]/60">{day}</span>
                      <span className="font-medium">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="bg-[#1C1C1C] rounded-2xl p-8 text-[#FAF7F2]">
                <h3 className="font-serif text-xl font-bold mb-4 text-[#D4A843]">Follow Our Journey</h3>
                <p className="text-[#FAF7F2]/55 text-sm mb-5">
                  Stay inspired — follow us on social media for behind-the-scenes content, student work, and studio updates.
                </p>
                <div className="flex gap-3">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-[#D4A843]/50 transition-colors">
                    📸 Instagram
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-[#D4A843]/50 transition-colors">
                    👍 Facebook
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
