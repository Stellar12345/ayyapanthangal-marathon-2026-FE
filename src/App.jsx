import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import EventDetails from './components/sections/EventDetails'
import Objectives from './components/sections/Objectives'
import ParticipantProfile from './components/sections/ParticipantProfile'
import Registration from './components/sections/Registration'
import Sponsorship from './components/sections/Sponsorship'
import CategorySponsors from './components/sections/CategorySponsors'
import LocalPartners from './components/sections/LocalPartners'
import InKindSponsors from './components/sections/InKindSponsors'
import WhyPartner from './components/sections/WhyPartner'
import PostEvent from './components/sections/PostEvent'
import Contact from './components/sections/Contact'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <EventDetails />
        <Objectives />
        <ParticipantProfile />
        <Registration />
        <Sponsorship />
        <CategorySponsors />
        <LocalPartners />
        <InKindSponsors />
        <WhyPartner />
        <PostEvent />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
