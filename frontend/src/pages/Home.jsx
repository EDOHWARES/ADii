import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Texts from '../components/Texts/Texts'
import Newsletter from '../components/Newsletter/Newsletter'
import FindMarket from '../components/FindMarket/FindMarket'
import Footer from '../components/Footer/Footer'
import Commodity from '../components/Commodity/Commodity'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Texts />
      <Newsletter />
      <FindMarket />
      <Commodity />
      <Footer />
    </div>
  )
}

export default Home
