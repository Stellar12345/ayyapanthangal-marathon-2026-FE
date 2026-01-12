import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <h3 className="text-xl font-bold mb-4">Ayyapanthangal Marathon 2026</h3>
            <p className="text-gray-400">
              A community-driven fitness initiative promoting health awareness, discipline, and an active lifestyle.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
            }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#event-details" className="hover:text-white transition-colors">Event Details</a></li>
              <li><a href="#registration" className="hover:text-white transition-colors">Registration</a></li>
              <li><a href="#sponsorship" className="hover:text-white transition-colors">Sponsorship</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
            }}
          >
            <h4 className="text-lg font-semibold mb-4">Event Info</h4>
            <p className="text-gray-400">
              <strong>Date:</strong> Sunday, 15 February 2026<br />
              <strong>Venue:</strong> Ayyapanthangal<br />
              <strong>Registration:</strong> ₹300 per participant
            </p>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Ayyapanthangal Marathon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
