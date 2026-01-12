import { motion } from 'framer-motion'
import { fadeIn, slideUp } from '../../animations/variants'
import Card from '../common/Card'
import Button from '../common/Button'

const Contact = () => {
  const scrollToSponsorship = () => {
    const element = document.querySelector('#sponsorship')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToRegistration = () => {
    const element = document.querySelector('#registration')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #1E5ED8, #1a4fc2, #0d3a9e)' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={slideUp}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Conclusion
          </motion.h2>

          <motion.div
            variants={slideUp}
            className="space-y-6 text-lg md:text-xl mb-8"
            style={{ color: '#E3F2FD' }}
          >
            <p>
              We believe that the Ayyapanthangal Marathon 2026 is more than just a run—it is a movement towards healthier living and disciplined lifestyles.
            </p>
            <p className="font-semibold text-white text-2xl">
              We invite you to partner with us and be a part of this meaningful community initiative.
            </p>
            <p>
              We look forward to your support and association.
            </p>
          </motion.div>

          <motion.div variants={slideUp} className="space-y-4">
            <Card className="bg-white">
              <h3 className="text-2xl font-bold text-dark-text mb-4">Get In Touch</h3>
              <p className="text-dark-text mb-6">
                For sponsorship inquiries and partnership opportunities, please contact us
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={scrollToRegistration}
                  variant="red"
                  className="text-lg px-8 py-4 font-bold rounded-lg"
                >
                  REGISTER NOW &gt;&gt;
                </Button>
                <Button
                  onClick={scrollToSponsorship}
                  variant="orange"
                  className="text-lg px-8 py-4 font-bold rounded-lg"
                >
                  View Sponsorship Options
                </Button>
                <Button
                  variant="outline"
                  className="border-2 text-lg px-8 py-4 font-bold rounded-lg"
                  style={{ 
                    borderColor: '#1E5ED8',
                    color: '#1E5ED8'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1E5ED8'
                    e.target.style.color = '#FFFFFF'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#1E5ED8'
                  }}
                  onClick={() => window.location.href = 'mailto:info@marathon2026.com'}
                >
                  Contact Us
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
