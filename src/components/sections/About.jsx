import { motion } from 'framer-motion'
import { fadeIn, slideUp, staggerContainer, staggerItem } from '../../animations/variants'
import Button from '../common/Button'

const About = () => {
  const scrollToRegistration = () => {
    const element = document.querySelector('#registration')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const reasons = [
    {
      title: 'To Tick Off A Long-held Ambition',
      icon: '🎯',
      description: 'Achieve your marathon goal'
    },
    {
      title: 'To Meet New People',
      icon: '👥',
      description: 'Join a vibrant community'
    },
    {
      title: 'To Enhance Your Life Success',
      icon: '📈',
      description: 'Build discipline and confidence'
    },
    {
      title: 'To Improve Fitness',
      icon: '💪',
      description: 'Boost your physical health'
    },
    {
      title: 'To Experience Something New',
      icon: '💡',
      description: 'Create unforgettable memories'
    },
    {
      title: 'Because You Can!',
      icon: '👍',
      description: 'Prove to yourself that you can do it'
    }
  ]

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(251,140,0,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          {/* Banner Section */}
          <motion.div
            variants={slideUp}
            className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12 shadow-2xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?q=80&w=2070&auto=format&fit=crop)'
              }}
            />
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, rgba(30, 94, 216, 0.85), rgba(251, 140, 0, 0.75))'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
                  Reason For Marathon
                </h2>
                <p className="text-xl md:text-2xl" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
                  How many people can say they've run a marathon?
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={slideUp}
            className="space-y-6 text-lg text-dark-text mb-12 max-w-4xl mx-auto"
          >
            <p>
              The Ayyapanthangal Marathon 2026 is a community-driven fitness initiative aimed at promoting health awareness, discipline, and an active lifestyle among students, youngsters, working professionals, and families.
            </p>
            <p>
              The event is designed to bring together people from different age groups to celebrate fitness, endurance, and community bonding through running.
            </p>
            <p className="font-semibold text-dark-text text-xl">
              Our mission is to inspire and motivate individuals to adopt a healthier lifestyle while building a stronger, more connected community.
            </p>
          </motion.div>

          {/* Reasons Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white border-2 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all"
                style={{ borderColor: '#FB8C00' }}
              >
                <div className="text-5xl mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold text-dark-text mb-2">{reason.title}</h3>
                <p className="text-dark-text">{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={slideUp} className="text-center">
            <Button
              onClick={scrollToRegistration}
              variant="orange"
              className="text-lg px-8 py-4 font-bold rounded-lg shadow-lg"
            >
              Join Us Now &gt;&gt;
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
