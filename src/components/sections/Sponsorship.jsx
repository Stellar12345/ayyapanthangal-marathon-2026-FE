import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, staggerItem } from '../../animations/variants'
import Card from '../common/Card'
import Button from '../common/Button'

const Sponsorship = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const titleSponsorBenefits = [
    'Event named as "[Brand Name] Ayyapanthangal Marathon 2026"',
    'Logo on Event T-shirts (front – prime visibility)',
    'Logo on Main stage backdrop',
    'Logo on Winner podium',
    'Logo on Certificates & posters',
    'Brand mentions during announcements',
    'Stall space at venue'
  ]

  const coSponsorBenefits = [
    'Logo on T-shirt (back/sleeve)',
    'Logo on Stage side banners',
    'Logo on Registration desk',
    'On-stage acknowledgement'
  ]

  const sponsors = [
    { name: 'INDUCE', subtitle: 'Fitness Studio', color: '#9c27b0' },
    { name: 'Woodside', subtitle: 'School District', color: '#E53935' },
    { name: 'Aventura', subtitle: 'Camp. Play. Bond', color: '#1E5ED8' },
    { name: 'MOUNT N MIST', subtitle: 'Adventure', color: '#2E7D32' },
    { name: 'Mount View', subtitle: 'Resort', color: '#FB8C00' }
  ]

  return (
    <section id="sponsorship" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#FB8C00' }}>Sponsors</h2>
            <p className="text-xl text-dark-text mb-8">
              We invite organizations, institutions, hospitals, corporates, and local businesses to partner with us
            </p>
            <Button
              onClick={scrollToContact}
              variant="orange"
              className="text-lg px-8 py-4 font-bold rounded-lg"
            >
              Become a Sponsor &gt;&gt;
            </Button>
          </div>

          {/* Sponsors Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16"
          >
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-light-bg rounded-lg p-6 text-center border-2 transition-all"
                style={{ 
                  borderColor: '#e0e0e0',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FB8C00'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: sponsor.color }}
                >
                  {sponsor.name.charAt(0)}
                </div>
                <h3 className="font-bold text-dark-text mb-1">{sponsor.name}</h3>
                <p className="text-sm text-dark-text">{sponsor.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {/* Title Sponsor */}
            <motion.div variants={staggerItem}>
              <Card className="h-full bg-light-bg border-2" style={{ borderColor: '#FB8C00' }}>
                <div className="mb-4">
                  <span className="inline-block text-white text-sm font-bold px-3 py-1 rounded-full mb-2" style={{ backgroundColor: '#FB8C00' }}>
                    EXCLUSIVE
                  </span>
                  <h3 className="text-3xl font-bold text-dark-text mb-2">Title Sponsor</h3>
                  <p className="text-2xl font-bold" style={{ color: '#FB8C00' }}>₹75,000 – ₹1,50,000</p>
                  <p className="text-sm text-dark-text mt-1">(Cash / Partial in-kind)</p>
                </div>

                <div>
                  <h4 className="font-bold text-dark-text mb-3">Branding Benefits:</h4>
                  <ul className="space-y-2">
                    {titleSponsorBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-dark-text">
                        <span className="mr-2 mt-1" style={{ color: '#2E7D32' }}>✓</span>
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Button
                    onClick={scrollToContact}
                    variant="orange"
                    className="w-full font-bold"
                  >
                    Contact for Title Sponsor
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Co-Sponsor */}
            <motion.div variants={staggerItem}>
              <Card className="h-full bg-light-bg border-2" style={{ borderColor: '#1E5ED8' }}>
                <div className="mb-4">
                  <h3 className="text-3xl font-bold text-dark-text mb-2">Co-Sponsor</h3>
                  <p className="text-xl text-dark-text mb-2">2–3 Partners Available</p>
                  <p className="text-2xl font-bold" style={{ color: '#1E5ED8' }}>₹30,000 – ₹50,000</p>
                  <p className="text-sm text-dark-text mt-1">per sponsor</p>
                </div>

                <div>
                  <h4 className="font-bold text-dark-text mb-3">Branding Benefits:</h4>
                  <ul className="space-y-2">
                    {coSponsorBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-dark-text">
                        <span className="mr-2 mt-1" style={{ color: '#2E7D32' }}>✓</span>
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Button
                    onClick={scrollToContact}
                    variant="blue"
                    className="w-full font-bold"
                  >
                    Contact for Co-Sponsor
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Sponsorship
