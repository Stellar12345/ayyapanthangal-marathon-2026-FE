import { motion } from 'framer-motion'
import { fadeIn, slideUp } from '../../animations/variants'
import Card from '../common/Card'

const LocalPartners = () => {
  const benefits = [
    'Banner display at venue',
    'Name on sponsor thank-you board',
    'Public acknowledgement'
  ]

  return (
    <section id="local-partners" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Local Business Partners</h2>
          <p className="text-xl text-gray-600 mb-8 text-center">
            Support the event with smaller contributions and receive recognition
          </p>

          <motion.div variants={slideUp}>
            <Card className="bg-white">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-green-600 mb-2">₹5,000 – ₹10,000</p>
                <p className="text-gray-600">Suggested Contribution</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Benefits Include:</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-3 text-xl">✓</span>
                      <span className="text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default LocalPartners
