import { motion } from 'framer-motion'

const Card = ({ children, className = '', ...props }) => {
  // Check if className includes bg- to avoid adding default bg-white
  const hasBgColor = className.includes('bg-')
  const baseClasses = hasBgColor 
    ? 'rounded-lg shadow-md p-6' 
    : 'bg-white rounded-lg shadow-md p-6'
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
