import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, staggerItem } from '../../animations/variants'
import Card from '../common/Card'
import Button from '../common/Button'

const Objectives = () => {
  const scrollToRegistration = () => {
    const element = document.querySelector('#registration')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const objectives = [
    'Promote physical and mental well-being',
    'Encourage daily discipline through fitness',
    'Create health awareness among youngsters and families',
    'Build a strong community connect through sports'
  ]

  return (
    <section id="objectives" className="py-20 bg-light-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-12 text-center">Event Objectives</h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8"
          >
            {objectives.map((objective, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full bg-white border-2" style={{ borderColor: '#1E5ED8' }}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4" style={{ backgroundColor: '#1E5ED8' }}>
                      {index + 1}
                    </div>
                    <p className="text-lg text-dark-text pt-2 flex-1">{objective}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="text-center"
          >
            <Button
              onClick={scrollToRegistration}
              variant="orange"
              className="text-lg px-8 py-4 font-bold"
            >
              Join the Movement - Register Now &gt;&gt;
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Objectives
