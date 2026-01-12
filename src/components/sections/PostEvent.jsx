import { motion } from 'framer-motion'
import { fadeIn, slideUp } from '../../animations/variants'
import Card from '../common/Card'

const PostEvent = () => {
  const benefits = [
    'Event photographs with branding',
    'Thank-you posts on digital platforms',
    'Certificate of appreciation',
    'Event impact summary'
  ]

  return (
    <section id="post-event" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Post-Event Brand Value</h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            All sponsors will receive comprehensive post-event recognition and materials
          </p>

          <motion.div variants={slideUp}>
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Post-Event Benefits:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start bg-white p-4 rounded-lg">
                    <span className="text-indigo-500 mr-3 text-xl mt-1">✓</span>
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default PostEvent
