import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, staggerItem } from '../../animations/variants'
import Card from '../common/Card'
import Button from '../common/Button'

const EventDetails = () => {
  const scrollToRegistration = () => {
    const element = document.querySelector('#registration')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const schedule = [
    {
      distance: '1.5 KM',
      reportingTime: '5:45 AM',
      startTime: '6:00 AM',
      startPoint: 'Ayyapanthangal',
      eligibility: 'Min - 10 Years'
    },
    {
      distance: '3 KM',
      reportingTime: '5:30 AM',
      startTime: '5:45 AM',
      startPoint: 'Ayyapanthangal',
      eligibility: 'Min - 14 Years'
    },
    {
      distance: '5 KM',
      reportingTime: '5:00 AM',
      startTime: '5:15 AM',
      startPoint: 'Ayyapanthangal',
      eligibility: 'Min - 18 Years'
    }
  ]

  const details = [
    {
      title: 'Date',
      content: 'Sunday, 15 February 2026',
      bgColor: '#E53935'
    },
    {
      title: 'Venue',
      content: 'Ayyapanthangal',
      bgColor: '#1E5ED8'
    },
    {
      title: 'Race Categories',
      content: '1.5 KM | 3 KM | 5 KM',
      bgColor: '#FB8C00'
    },
    {
      title: 'Registration Fee',
      content: '₹300 per participant',
      bgColor: '#F9A825'
    }
  ]

  const benefits = [
    'Event T-shirt',
    'Finisher Medal',
    'Participation Certificate'
  ]

  return (
    <section id="event-details" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-12 text-center">Event Schedule</h2>

          {/* Event Overview */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {details.map((detail, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="text-center h-full text-white border-0 shadow-lg" style={{ backgroundColor: detail.bgColor }}>
                  <h3 className="text-xl font-bold mb-2">{detail.title}</h3>
                  <p className="text-lg">{detail.content}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Schedule Section - Orange Background Design */}
          <motion.div
            variants={staggerContainer}
            className="max-w-5xl mx-auto mb-12"
          >
            <div className="rounded-lg p-8 md:p-12 text-white" style={{ backgroundColor: '#FB8C00' }}>
              <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">Event Schedule</h3>
              
              <div className="space-y-6">
                {schedule.map((race, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="border-b pb-6 last:border-b-0"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl md:text-6xl font-bold">
                          {race.distance.split(' ')[0]}
                        </div>
                        <div className="text-2xl font-semibold">KM</div>
                      </div>
                      <div className="flex-1 space-y-2 text-lg">
                        <p><strong>Reporting Time:</strong> {race.reportingTime}</p>
                        <p><strong>Start Time:</strong> {race.startTime}</p>
                        <p><strong>Start Point:</strong> {race.startPoint}</p>
                        <p><strong>Eligibility:</strong> {race.eligibility}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-light-bg border-2" style={{ borderColor: '#1E5ED8' }}>
              <h3 className="text-2xl font-bold text-dark-text mb-4">All Participants Receive:</h3>
              <ul className="space-y-3 mb-6">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    variants={staggerItem}
                    className="flex items-center text-lg text-dark-text"
                  >
                    <span className="mr-3 text-2xl" style={{ color: '#2E7D32' }}>✓</span>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="text-white p-4 rounded-lg mb-6" style={{ backgroundColor: '#E53935' }}>
                <p className="text-xl font-bold text-center">
                  Winners across categories will receive cash prizes, with a total prize pool of up to ₹25,000.
                </p>
              </div>
              <div className="text-center">
                <Button
                  onClick={scrollToRegistration}
                  variant="orange"
                  className="text-lg px-8 py-4 font-bold rounded-lg"
                >
                  REGISTER NOW &gt;&gt;
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default EventDetails
