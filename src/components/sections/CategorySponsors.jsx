import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, staggerItem } from '../../animations/variants'
import SponsorshipCard from '../common/SponsorshipCard'

const CategorySponsors = () => {
  const categories = [
    {
      title: 'T-Shirt Sponsor',
      icon: '👕',
      idealFor: 'Local Business conglomerate, Apparel brands, printing companies, sports stores',
      benefits: [
        'Sponsor provides event T-shirts',
        'Logo prominently displayed on all runner T-shirts'
      ]
    },
    {
      title: 'Water / Hydration Sponsor',
      icon: '🚰',
      idealFor: 'Drinking water brands, beverage companies, RO suppliers',
      benefits: [
        'Branding at water stations',
        'Logo on water bottles / cups',
        'Announcements during the event'
      ]
    },
    {
      title: 'Prize Money Sponsor',
      icon: '🏆',
      idealFor: 'Corporate sponsors, local businesses',
      benefits: [
        'Sponsor supports winner cash prizes',
        '"Prizes sponsored by…" recognition',
        'On-stage visibility during prize distribution'
      ]
    },
    {
      title: 'Stage Backdrop Sponsor',
      icon: '🎤',
      idealFor: 'Event management companies, branding agencies',
      benefits: [
        'Full logo display on main stage backdrop',
        'High visibility in photographs & videos'
      ]
    },
    {
      title: 'Start / Finish Line Sponsor',
      icon: '🏁',
      idealFor: 'Sports brands, fitness companies',
      benefits: [
        'Branding on start/finish arch banners',
        'Maximum photo & video exposure'
      ]
    }
  ]

  return (
    <section id="category-sponsors" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Category-Wise Sponsorship Options</h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Choose a sponsorship category that aligns with your brand
          </p>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div key={index} variants={staggerItem}>
                <SponsorshipCard {...category} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CategorySponsors
