import { useState } from 'react'
import { SiGmail, SiLeetcode, SiKaggle } from 'react-icons/si'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import SectionHeading from './SectionHeading'
import GlassCard from './GlassCard'

// Web3Forms access key (safe to be public, per Web3Forms docs)
const WEB3FORMS_KEY = 'a4ee1cff-2b54-4e64-b35b-bd8f62a9932e'

const contactLinks = [
  {
    Icon: SiGmail,
    color: '#EA4335',
    label: 'Email',
    value: 'vishalbariar001@gmail.com',
    href: 'mailto:vishalbariar001@gmail.com',
  },
  {
    Icon: FaLinkedin,
    color: '#0A66C2',
    label: 'LinkedIn',
    value: 'Vishal Bariar',
    href: 'https://www.linkedin.com/in/vishal-bariar-431772349',
  },
  {
    Icon: FaGithub,
    color: '#FFFFFF',
    label: 'GitHub',
    value: 'Vishalbariar',
    href: 'https://github.com/Vishalbariar',
  },
  {
    Icon: SiLeetcode,
    color: '#FFA116',
    label: 'LeetCode',
    value: '165+ problems solved',
    href: 'https://leetcode.com/u/qaAvmg8NQf',
  },
  {
    Icon: SiKaggle,
    color: '#20BEFF',
    label: 'Kaggle',
    value: 'vishalbariar',
    href: 'https://www.kaggle.com/vishalbariar',
  },
]

const initialValues = { name: '', email: '', subject: '', message: '' }

// Returns an object of error messages. Empty object = everything is valid.
function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please enter your name.'
  else if (values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'

  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address (like name@example.com).'

  if (values.subject.trim().length > 100) errors.subject = 'Subject must be under 100 characters.'

  if (!values.message.trim()) errors.message = 'Please write a message.'
  else if (values.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  else if (values.message.length > 1000) errors.message = 'Message must be under 1000 characters.'

  return errors
}

// Input styling: glows blue normally, red when there's an error
const fieldClass = (hasError) =>
  `w-full rounded-2xl border bg-black/30 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:bg-black/40 ${
    hasError
      ? 'border-red-400/70 focus:border-red-400 focus:shadow-[0_0_16px_rgba(248,113,113,0.3)]'
      : 'border-white/10 focus:border-sky-200/60 focus:shadow-[0_0_16px_rgba(125,211,252,0.25)]'
  }`

function Contact() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  // Only show an error after the user has left that field (or tried to submit)
  const showError = (field) => touched[field] && errors[field]

  const handleChange = (e) => {
    const { name, value } = e.target
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name]) setErrors(validate(next))
    if (status !== 'idle' && status !== 'sending') setStatus('idle')
  }

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, email: true, subject: true, message: true })

    const firstError = Object.keys(found)[0]
    if (firstError) {
      document.getElementById(firstError)?.focus()
      return
    }

    if (e.target.botcheck.checked) return

    setStatus('sending')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: values.subject.trim() || `New portfolio message from ${values.name}`,
          from_name: 'Portfolio Contact Form',
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setValues(initialValues)
        setTouched({})
        setErrors({})
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Contact"
          title="Let's Connect"
          subtitle="Have an opportunity, a project idea or a question? My inbox is open."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Contact links with real brand icons */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={`${link.label}: ${link.value}`}
              >
                <GlassCard className="flex items-center gap-4 !p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <link.Icon
                      aria-hidden="true"
                      className="text-2xl transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_currentColor]"
                      style={{ color: link.color }}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium uppercase tracking-widest text-sky-200/80">
                      {link.label}
                    </span>
                    <span className="block truncate text-slate-200">{link.value}</span>
                  </span>
                  <span className="ml-auto text-slate-500 transition group-hover:translate-x-1 group-hover:text-sky-200">
                    ↗
                  </span>
                </GlassCard>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8 lg:col-span-3">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-sky-200/60 to-transparent" />

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Honeypot: hidden from humans, bots fill it in */}
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
                    Name <span className="text-sky-200">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(showError('name'))}
                    aria-describedby={showError('name') ? 'name-error' : undefined}
                    className={fieldClass(showError('name'))}
                  />
                  {showError('name') && (
                    <p id="name-error" className="mt-2 text-sm text-red-300">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                    Email <span className="text-sky-200">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(showError('email'))}
                    aria-describedby={showError('email') ? 'email-error' : undefined}
                    className={fieldClass(showError('email'))}
                  />
                  {showError('email') && (
                    <p id="email-error" className="mt-2 text-sm text-red-300">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-200">
                  Subject <span className="text-slate-500">(optional)</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Internship opportunity"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(showError('subject'))}
                  aria-describedby={showError('subject') ? 'subject-error' : undefined}
                  className={fieldClass(showError('subject'))}
                />
                {showError('subject') && (
                  <p id="subject-error" className="mt-2 text-sm text-red-300">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
                  Message <span className="text-sky-200">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me a bit about what you have in mind..."
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(showError('message'))}
                  aria-describedby="message-hint"
                  className={`${fieldClass(showError('message'))} resize-none`}
                />
                <div id="message-hint" className="mt-2 flex justify-between gap-4 text-sm">
                  <span className="text-red-300">{showError('message') ? errors.message : ''}</span>
                  <span className={values.message.length > 1000 ? 'text-red-300' : 'text-slate-500'}>
                    {values.message.length}/1000
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-full bg-linear-to-r from-white via-slate-200 to-sky-200 px-7 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-200/30 transition hover:shadow-sky-200/60 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>

              {/* Status message (announced to screen readers) */}
              <div role="status" aria-live="polite">
                {status === 'success' && (
                  <p className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-200">
                    ✅ Thanks! Your message has been sent. I'll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="rounded-2xl border border-red-300/30 bg-red-300/10 px-4 py-3 text-sm text-red-200">
                    Something went wrong. Please try again, or email me directly at vishalbariar001@gmail.com.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact