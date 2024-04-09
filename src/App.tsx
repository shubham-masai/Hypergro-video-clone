import React from 'react'
import Navbar from './compoenents/Navbar'
import AllRoutes from './compoenents/AllRoutes'
import Footer from './compoenents/Footer'

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <AllRoutes />
      <Footer />
    </div>
  )
}

export default App