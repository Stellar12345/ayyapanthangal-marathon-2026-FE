import { motion } from 'framer-motion'
import { fadeIn, slideUp, staggerContainer, staggerItem } from '../../animations/variants'
import Card from '../common/Card'
import Button from '../common/Button'

const ParticipantProfile = () => {
  const scrollToRegistration = () => {
    const element = document.querySelector('#registration')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const brandingOpportunities = [
    'Event T-shirts',
    'Stage backdrops',
    'Start/Finish banners',
    'Digital promotions & photographs',
    'On-stage announcements'
  ]

  return (
    <section id="participant-profile" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-12 text-center">Participant Profile & Brand Visibility</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-light-bg border-2" style={{ borderColor: '#1E5ED8' }}>
              <h3 className="text-2xl font-bold text-dark-text mb-4">Expected Participants</h3>
              <p className="text-4xl font-bold mb-2" style={{ color: '#1E5ED8' }}>300–500+</p>
              <p className="text-lg text-dark-text">Age group: Youth, working professionals, families</p>
            </Card>

            <Card className="bg-light-bg border-2" style={{ borderColor: '#2E7D32' }}>
              <h3 className="text-2xl font-bold text-dark-text mb-4">Engagement</h3>
              <p className="text-lg text-dark-text">
                High local engagement with strong word-of-mouth reach
              </p>
              <p className="text-lg text-dark-text mt-4">
                This event provides sponsors direct engagement with a health-conscious and aspirational audience.
              </p>
            </Card>
          </div>

          <motion.div variants={slideUp}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-white rounded-lg shadow-lg p-8 border-0"
              style={{ background: 'linear-gradient(to right, #1E5ED8, #1a4fc2)' }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Excellent Branding Opportunities Through:</h3>
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
              >
                {brandingOpportunities.map((opportunity, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="flex items-center"
                  >
                    <span className="mr-3 text-xl font-bold" style={{ color: '#F9A825' }}>✓</span>
                    <span className="text-lg text-white">{opportunity}</span>
                  </motion.div>
                ))}
              </motion.div>
              <div className="text-center">
                <Button
                  onClick={scrollToRegistration}
                  className="bg-white text-lg px-8 py-4 font-bold rounded-lg shadow-lg"
                  style={{ color: '#E53935' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#F5F7FA'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
                >
                  Register Now &gt;&gt;
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ParticipantProfile
