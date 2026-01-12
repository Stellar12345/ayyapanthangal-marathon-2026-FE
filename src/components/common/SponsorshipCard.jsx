import { motion } from 'framer-motion'
import Card from './Card'

const SponsorshipCard = ({ title, priceRange, benefits, idealFor, icon }) => {
  return (
    <Card className="h-full hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col h-full">
        {icon && (
          <div className="text-4xl mb-4">{icon}</div>
        )}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        {priceRange && (
          <p className="text-lg font-semibold text-blue-600 mb-4">{priceRange}</p>
        )}
        {idealFor && (
          <p className="text-sm text-gray-600 mb-4 italic">Ideal for: {idealFor}</p>
        )}
        {benefits && benefits.length > 0 && (
          <div className="flex-grow">
            <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  )
}

export default SponsorshipCard
