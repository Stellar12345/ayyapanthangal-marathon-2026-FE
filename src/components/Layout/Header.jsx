import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../common/Button'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Event Details', href: '#event-details' },
    { name: 'Registration', href: '#registration' },
    { name: 'Sponsorship', href: '#sponsorship' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const scrollToRegistration = (e) => {
    e.preventDefault()
    handleNavClick(e, '#registration')
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className={`text-lg md:text-xl font-bold transition-colors ${
              isScrolled ? 'text-primary-blue' : 'text-white'
            }`}
            style={!isScrolled ? { textShadow: '2px 2px 4px rgba(0,0,0,0.5)' } : {}}
            whileHover={{ scale: 1.05 }}
          >
            Ayyapanthangal Marathon 2026
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium transition-colors ${
                  isScrolled 
                    ? 'text-dark-text hover:text-primary-blue' 
                    : 'text-white hover:text-orange-300'
                }`}
                style={!isScrolled ? { textShadow: '1px 1px 3px rgba(0,0,0,0.5)' } : {}}
              >
                {item.name}
              </a>
            ))}
            <Button
              onClick={scrollToRegistration}
              className="text-sm px-4 py-2 font-bold"
              style={{ backgroundColor: '#E53935' }}
            >
              Register
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden focus:outline-none ${
              isScrolled ? 'text-dark-text' : 'text-white'
            }`}
            style={!isScrolled ? { filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))' } : {}}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 bg-white/95 backdrop-blur-md rounded-lg shadow-lg"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-4 py-2 text-dark-text hover:bg-primary-blue hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="px-4 py-2">
              <Button
                onClick={scrollToRegistration}
                className="w-full text-sm font-bold"
                style={{ backgroundColor: '#E53935' }}
              >
                Register Now
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}

export default Header
