import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, staggerItem } from '../../animations/variants'
import Card from '../common/Card'

const WhyPartner = () => {
  const reasons = [
    'Strong local visibility and goodwill',
    'Direct engagement with a health-focused audience',
    'Positive brand association with fitness & community service',
    'Long-term partnership opportunities for future editions'
  ]

  return (
    <section id="why-partner" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Why Partner With Ayyapanthangal Marathon?</h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Join us in making a positive impact on community health and fitness
          </p>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {reasons.map((reason, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full bg-white">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-lg text-gray-700 pt-2">{reason}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyPartner
