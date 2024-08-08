import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Texts from '../components/Texts/Texts'
import Newsletter from '../components/Newsletter/Newsletter'
import FindMarket from '../components/FindMarket/FindMarket'
import Footer from '../components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Texts />
      <Newsletter />
      <FindMarket />
      <Footer />
    </div>
  )
}

export default Home
