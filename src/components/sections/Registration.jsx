import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn, slideUp } from '../../animations/variants'
import Card from '../common/Card'
import Button from '../common/Button'

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dateOfBirth: '',
    age: '',
    presentAddress: '',
    mobileNumber: '',
    medicalHistory: '',
    tshirtSize: '',
    raceCategory: '1.5 KM',
    emergencyContactName: '',
    emergencyContactMobile: '',
    waiver: false
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = ['1.5 KM', '3 KM', '5 KM']
  const tshirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const genders = ['Male', 'Female', 'Other']

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    // Auto-calculate age from date of birth
    if (name === 'dateOfBirth' && value) {
      const today = new Date()
      const birthDate = new Date(value)
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      setFormData(prev => ({ ...prev, age: age.toString() }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required'
    if (!formData.age || parseInt(formData.age) < 1) newErrors.age = 'Age is required'
    if (!formData.presentAddress.trim()) newErrors.presentAddress = 'Present Address is required'
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required'
    } else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits'
    }
    if (!formData.tshirtSize) newErrors.tshirtSize = 'T-shirt size is required'
    if (!formData.raceCategory) newErrors.raceCategory = 'Race category is required'
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required'
    if (!formData.emergencyContactMobile.trim()) {
      newErrors.emergencyContactMobile = 'Emergency contact mobile is required'
    } else if (!/^\d{10}$/.test(formData.emergencyContactMobile.replace(/\D/g, ''))) {
      newErrors.emergencyContactMobile = 'Emergency contact mobile must be 10 digits'
    }
    if (!formData.waiver) newErrors.waiver = 'You must accept the waiver and consent'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      alert('Registration form submitted successfully! (This is a demo - form handling will be implemented)')
      setIsSubmitting(false)
      setFormData({
        name: '',
        gender: '',
        dateOfBirth: '',
        age: '',
        presentAddress: '',
        mobileNumber: '',
        medicalHistory: '',
        tshirtSize: '',
        raceCategory: '1.5 KM',
        emergencyContactName: '',
        emergencyContactMobile: '',
        waiver: false
      })
    }, 1000)
  }

  return (
    <section id="registration" className="py-20 relative overflow-hidden">
      {/* Banner Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?q=80&w=2070&auto=format&fit=crop)',
            filter: 'brightness(0.3) blur(3px)',
            transform: 'scale(1.1)'
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(30, 94, 216, 0.8))'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <motion.h2
              variants={slideUp}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
            >
              Get ready to Celebrate!
            </motion.h2>
            <motion.p
              variants={slideUp}
              className="text-2xl md:text-3xl font-bold text-white mb-4"
              style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.5)' }}
            >
              Celebrate running. Celebrate{' '}
              <span style={{ color: '#FB8C00' }}>Ayyapanthangal</span>...
            </motion.p>
            <motion.div
              variants={slideUp}
              className="inline-block px-6 py-2 rounded-lg text-xl font-bold mb-4 text-white shadow-lg"
              style={{ backgroundColor: '#FB8C00' }}
            >
              REGISTRATION FEE: ₹300
            </motion.div>
            <motion.p
              variants={slideUp}
              className="text-xl text-gray-200 mt-4"
            >
              Join the Run for Fitness & Fun!
            </motion.p>
          </div>

          <motion.div variants={slideUp}>
            <Card className="bg-white shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-dark-text mb-2">
                    1. Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="block text-sm font-semibold text-dark-text mb-2">
                    2. Gender *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue ${
                      errors.gender ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    {genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-dark-text mb-2">
                    3. Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
                </div>

                {/* Age */}
                <div>
                  <label htmlFor="age" className="block text-sm font-semibold text-dark-text mb-2">
                    4. Age *
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="1"
                    max="120"
                    readOnly
                    className="w-full px-4 py-3 border-2 rounded-lg bg-gray-100 border-gray-300"
                  />
                  <p className="mt-1 text-xs text-gray-500">(Auto-calculated from Date of Birth)</p>
                  {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
                </div>

                {/* Present Address */}
                <div>
                  <label htmlFor="presentAddress" className="block text-sm font-semibold text-dark-text mb-2">
                    5. Present Address *
                  </label>
                  <textarea
                    id="presentAddress"
                    name="presentAddress"
                    value={formData.presentAddress}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue ${
                      errors.presentAddress ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your complete address"
                  />
                  {errors.presentAddress && <p className="mt-1 text-sm text-red-600">{errors.presentAddress}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-semibold text-dark-text mb-2">
                    6. Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    maxLength="10"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue ${
                      errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your 10-digit mobile number"
                  />
                  {errors.mobileNumber && <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>}
                </div>

                {/* Medical History */}
                <div>
                  <label htmlFor="medicalHistory" className="block text-sm font-semibold text-dark-text mb-2">
                    7. Any Medical History
                  </label>
                  <textarea
                    id="medicalHistory"
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
                    placeholder="Please mention any medical conditions or allergies (if any)"
                  />
                  <p className="mt-1 text-xs text-gray-500">(Optional but recommended for safety)</p>
                </div>

                {/* T-Shirt Size */}
                <div>
                  <label htmlFor="tshirtSize" className="block text-sm font-semibold text-dark-text mb-2">
                    8. T-Shirt Size *
                  </label>
                  <select
                    id="tshirtSize"
                    name="tshirtSize"
                    value={formData.tshirtSize}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue ${
                      errors.tshirtSize ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select T-Shirt Size</option>
                    {tshirtSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  {errors.tshirtSize && <p className="mt-1 text-sm text-red-600">{errors.tshirtSize}</p>}
                </div>

                {/* Race Category */}
                <div>
                  <label htmlFor="raceCategory" className="block text-sm font-semibold text-dark-text mb-2">
                    9. Race Category *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                      <label
                        key={cat}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.raceCategory === cat
                            ? 'border-primary-blue bg-blue-50'
                            : 'border-gray-300 hover:border-primary-blue-light'
                        } ${errors.raceCategory ? 'border-red-500' : ''}`}
                      >
                        <input
                          type="radio"
                          name="raceCategory"
                          value={cat}
                          checked={formData.raceCategory === cat}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <span className="font-semibold text-dark-text">{cat}</span>
                      </label>
                    ))}
                  </div>
                  {errors.raceCategory && <p className="mt-1 text-sm text-red-600">{errors.raceCategory}</p>}
                </div>

                {/* Emergency Contact Name */}
                <div>
                  <label htmlFor="emergencyContactName" className="block text-sm font-semibold text-dark-text mb-2">
                    10. Emergency Contact Name *
                  </label>
                  <input
                    type="text"
                    id="emergencyContactName"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue ${
                      errors.emergencyContactName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter emergency contact person's name"
                  />
                  {errors.emergencyContactName && <p className="mt-1 text-sm text-red-600">{errors.emergencyContactName}</p>}
                </div>

                {/* Emergency Contact Mobile */}
                <div>
                  <label htmlFor="emergencyContactMobile" className="block text-sm font-semibold text-dark-text mb-2">
                    11. Emergency Contact Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="emergencyContactMobile"
                    name="emergencyContactMobile"
                    value={formData.emergencyContactMobile}
                    onChange={handleChange}
                    maxLength="10"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue ${
                      errors.emergencyContactMobile ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter emergency contact's 10-digit mobile number"
                  />
                  {errors.emergencyContactMobile && <p className="mt-1 text-sm text-red-600">{errors.emergencyContactMobile}</p>}
                </div>

                {/* Waiver and Consent */}
                <div>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      name="waiver"
                      checked={formData.waiver}
                      onChange={handleChange}
                      className="mt-1 mr-3 w-5 h-5"
                    />
                    <span className="text-sm text-dark-text">
                      <strong>12. Waiver and Consent *</strong><br />
                      I understand, there is associated risk with a marathon and waive the organisers from any liabilities
                    </span>
                  </label>
                  {errors.waiver && <p className="mt-1 text-sm text-red-600">{errors.waiver}</p>}
                </div>

                {/* Info Box */}
                <div className="bg-light-bg p-4 rounded-lg border-2" style={{ borderColor: '#1E5ED8' }}>
                  <p className="text-sm text-dark-text mb-2">
                    <strong>Registration Fee:</strong> ₹300 per participant
                  </p>
                  <p className="text-sm text-dark-text">
                    <strong>All participants receive:</strong> T-Shirt • Medal • Certificate for all finishers
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="red"
                  className="w-full text-lg font-bold py-4 rounded-lg shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : '13. SUBMIT'}
                </Button>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Registration
