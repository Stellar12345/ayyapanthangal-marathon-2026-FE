import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../common/Button'

const EVENT_DATE = new Date('2026-02-15T06:00:00').getTime()

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const diff = EVENT_DATE - now

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const scrollToRegistration = () => {
    document.querySelector('#registration')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1549575810-b9c14feae7f2?q=80&w=2070&auto=format&fit=crop')",
          filter: 'brightness(0.6)'
        }}
      />

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-4 text-center">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4"
        >
          AYYAPANTHANGAL <br />
          <span className="text-yellow-400">MARATHON 2026</span>
        </motion.h1>

        {/* TAGLINE */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-2xl text-white/90 mb-6"
        >
          Run for Health • Run for Discipline • Run for a Cause
        </motion.p>

        {/* DATE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl mb-6"
        >
          SUNDAY, 15 FEBRUARY 2026 | AYYAPANTHANGAL
        </motion.div>

        {/* DISTANCES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 mb-6"
        >
          <span className="bg-red-600 px-6 py-3 rounded-xl text-white font-bold">1.5K</span>
          <span className="bg-blue-600 px-6 py-3 rounded-xl text-white font-bold">3K</span>
          <span className="bg-orange-500 px-6 py-3 rounded-xl text-white font-bold">5K</span>
        </motion.div>

        {/* BENEFITS */}
        <p className="text-white font-semibold mb-6">
          👕 T-Shirt • 🏅 Medal • 📜 Certificate for all finishers
        </p>

        {/* PRIZE */}
        <div className="inline-block bg-red-600 text-white font-bold px-6 py-3 rounded-xl mb-8">
          WIN CASH PRIZES UP TO ₹25,000
        </div>

        {/* CTA */}
        <div className="mb-14">
          <Button
            onClick={scrollToRegistration}
            className="px-10 py-5 text-xl font-bold rounded-xl shadow-2xl"
            style={{ backgroundColor: '#FB8C00' }}
          >
            REGISTER NOW – ₹300
          </Button>
        </div>

        {/* COUNTDOWN */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-white text-3xl font-bold mb-6">
            Event Starts In
          </h3>

          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { label: 'DAYS', value: timeLeft.days, color: 'bg-orange-500' },
              { label: 'HOURS', value: timeLeft.hours, color: 'bg-blue-600' },
              { label: 'MINUTES', value: timeLeft.minutes, color: 'bg-red-600' },
              { label: 'SECONDS', value: timeLeft.seconds, color: 'bg-yellow-500' }
            ].map(item => (
              <div
                key={item.label}
                className={`${item.color} text-white px-6 py-5 rounded-xl text-center min-w-[100px] shadow-xl`}
              >
                <div className="text-4xl font-bold">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-sm font-semibold">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
