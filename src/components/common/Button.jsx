import { motion } from 'framer-motion'

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer'
  
  const variants = {
    primary: 'bg-accent-orange text-white hover:bg-accent-orange-dark focus:ring-accent-orange',
    secondary: 'bg-gray-200 text-dark-text hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white focus:ring-primary-blue',
    red: 'bg-cta-red text-white hover:bg-cta-red-dark focus:ring-cta-red',
    blue: 'bg-primary-blue text-white hover:bg-primary-blue-dark focus:ring-primary-blue',
    orange: 'bg-accent-orange text-white hover:bg-accent-orange-dark focus:ring-accent-orange'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button
