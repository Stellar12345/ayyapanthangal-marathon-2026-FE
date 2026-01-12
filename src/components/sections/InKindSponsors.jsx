import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, staggerItem } from '../../animations/variants'
import Card from '../common/Card'

const InKindSponsors = () => {
  const inKindOptions = [
    {
      title: 'Sound System & Stage Setup',
      description: 'Provide audio-visual equipment and stage infrastructure'
    },
    {
      title: 'Printing Services',
      description: 'Banners, posters, certificates, and promotional materials'
    },
    {
      title: 'Medical Support / Ambulance',
      description: 'On-site medical assistance and emergency services'
    },
    {
      title: 'Photography & Videography',
      description: 'Event coverage and promotional content creation'
    }
  ]

  return (
    <section id="inkind-sponsors" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">In-Kind Sponsorship Options</h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            We also welcome support in the form of services and equipment
          </p>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {inKindOptions.map((option, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{option.title}</h3>
                  <p className="text-gray-600">{option.description}</p>
                  <p className="text-sm text-blue-600 mt-4 font-semibold">
                    In-kind sponsors will receive branding and public recognition.
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default InKindSponsors
